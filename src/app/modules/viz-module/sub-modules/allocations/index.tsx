/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useTitle } from "react-use";
import { appColors } from "app/theme";
import uniqueId from "lodash/uniqueId";
import findIndex from "lodash/findIndex";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
/* project */
import { isTouchDevice } from "app/utils/isTouchDevice";
import { getIso3FromName } from "app/utils/getIso3FromName";
import { PageLoader } from "app/modules/common/page-loader";
import { XsContainer } from "app/components/Charts/common/styles";
import ReRouteDialogBox from "app/components/Charts/common/dialogBox";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { EchartBaseChart } from "app/components/Charts/common/echartBaseChart";
import { AllocationsTreemapDataItem } from "app/modules/viz-module/sub-modules/allocations/data";
import { AllocationsRadialMobileTooltip } from "app/modules/viz-module/sub-modules/allocations/components/mobiletooltip";

interface AllocationsModuleProps {
  code?: string;
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function AllocationsModule(props: AllocationsModuleProps) {
  useTitle(`The Data Explorer -${props.code ? " Location" : ""} Allocations`);

  const history = useHistory();

  const selectedPeriod = useStoreState(
    (state) => state.ToolBoxPanelAllocationsPeriodState.value
  );
  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );
  const setDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.setSteps
  );
  const dataPathActiveStep = useStoreState(
    (state) => state.DataPathActiveStep.step
  );
  const clearDataPathActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.clear
  );

  // api call & data
  const fetchData = useStoreActions((store) => store.Allocations.fetch);
  const total = useStoreState(
    (state) => get(state.Allocations.data, "total", []) as number
  );
  const keys = useStoreState(
    (state) => get(state.Allocations.data, "keys", []) as string[]
  );
  const values = useStoreState(
    (state) => get(state.Allocations.data, "values", []) as number[]
  );
  const isLoading = useStoreState((state) => state.Allocations.loading);

  const fetchDrilldownLevelData = useStoreActions(
    (store) => store.AllocationsDrilldown.fetch
  );
  const clearDrilldownLevelData = useStoreActions(
    (store) => store.AllocationsDrilldown.clear
  );
  const dataDrilldownLevel = useStoreState(
    (state) =>
      get(
        state.AllocationsDrilldown.data,
        "data",
        []
      ) as AllocationsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.AllocationsDrilldown.loading
  );
  const fetchPeriodOptionsData = useStoreActions(
    (store) => store.AllocationsPeriods.fetch
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const isMobile = useMediaQuery("(max-width: 767px)");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [xsTooltipData, setXsTooltipData] = React.useState<any | null>(null);
  const [reRouteDialog, setReRouteDialog] = React.useState({
    display: false,
    code: "",
  });

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({
      filterString: `periods=${selectedPeriod}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [props.code, appliedFilters, selectedPeriod]);

  React.useEffect(() => {
    if (vizSelected) {
      const filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      fetchDrilldownLevelData({
        filterString: `levelParam=component/componentName in (${(vizSelected ===
        "Total"
          ? keys.join(",")
          : vizSelected
        )
          .split(",")
          .map((s: string) => `'${s}'`)
          .join(",")})&periods=${selectedPeriod}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      clearDrilldownLevelData();
    }
  }, [vizSelected, selectedPeriod]);

  React.useEffect(() => {
    if (vizLevel === 0) {
      if (
        dataPathSteps.length === 0 ||
        !find(dataPathSteps, { name: "Access to Funding: Allocations" })
      ) {
        addDataPathSteps([
          {
            id: uniqueId(),
            name: "Access to Funding: Allocations",
            path: `${history.location.pathname}${history.location.search}`,
          },
        ]);
      }
    }
  }, [vizSelected]);

  React.useEffect(() => {
    fetchPeriodOptionsData({});
  }, []);

  React.useEffect(() => {
    if (dataPathActiveStep) {
      if (dataPathActiveStep.vizSelected) {
        setVizLevel(1);
        setVizSelected(dataPathActiveStep.vizSelected.id);
        clearDataPathActiveStep();
        addDataPathSteps([dataPathActiveStep]);
      } else if (!dataPathActiveStep.vizSelected && vizSelected) {
        setVizLevel(0);
        setVizSelected(undefined);
        clearDataPathActiveStep();
      }
    }
  }, [dataPathActiveStep]);

  let vizComponent = <React.Fragment />;

  if (isLoading || isDrilldownLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (vizLevel === 0) {
      vizComponent = (
        <div
          css={`
            @media (max-width: 767px) {
              z-index: 2;
              width: 100%;
              position: relative;
              padding-bottom: 100px;

              #mobile-tooltip-container {
                top: 30vh;
                left: 16px;
                width: calc(100% - 32px);
              }
            }
          `}
        >
          <EchartBaseChart
            type="polarbar"
            data={{
              keys: [...keys].reverse(),
              values: [...values].reverse(),
            }}
            onNodeClick={(key: string) => {
              setVizLevel(1);
              setVizSelected(key);
              addDataPathSteps([
                {
                  id: uniqueId(),
                  name: key,
                  path: `${history.location.pathname}${history.location.search}`,
                  vizSelected: {
                    id: key,
                    filterStr: key,
                  },
                },
              ]);
            }}
          />
          {(isMobile || isTouchDevice()) && xsTooltipData && (
            <XsContainer id="mobile-tooltip-container">
              <div
                css={`
                  width: 95%;
                `}
              >
                <AllocationsRadialMobileTooltip
                  {...xsTooltipData}
                  close={() => setXsTooltipData(null)}
                  drilldown={() => {
                    setVizLevel(1);
                    setVizSelected(xsTooltipData.label);
                  }}
                />
              </div>
            </XsContainer>
          )}
        </div>
      );
    } else if (vizLevel === 1) {
      vizComponent = (
        <React.Fragment>
          <span
            css={`
              gap: 40px;
              width: 100%;
              display: flex;
              margin-bottom: 20px;
              flex-direction: row;

              > * {
                @supports (-webkit-touch-callout: none) and
                  (not (translate: none)) {
                  &:not(:last-child) {
                    margin-right: 40px;
                  }
                }
              }
            `}
          >
            <DrillDownArrowSelector
              options={[...keys, "Total"]}
              selected={vizSelected || ""}
              onChange={(value: string) => {
                const prevValue = vizSelected || "";
                const fItemIndex = findIndex(dataPathSteps, {
                  vizSelected: { id: prevValue, filterStr: prevValue },
                });
                setVizSelected(value);
                let newDataPathSteps = [...dataPathSteps];
                if (fItemIndex > -1) {
                  newDataPathSteps = dataPathSteps.slice(0, fItemIndex);
                }
                newDataPathSteps.push({
                  id: uniqueId(),
                  name: value,
                  path: `${history.location.pathname}${history.location.search}`,
                  vizSelected: {
                    id: value,
                    filterStr: value,
                  },
                });
                setDataPathSteps(newDataPathSteps);
              }}
            />
          </span>
          <EchartBaseChart
            type="treemap"
            data={dataDrilldownLevel}
            onNodeClick={(node: string) => {
              const name = node.split("-")[0];
              const code = getIso3FromName(name);
              setReRouteDialog({
                display: true,
                code,
              });
            }}
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div
      id="allocations-radial-bar"
      css={`
        width: 100%;

        .apexcharts-radialbar-hollow {
          r: 75;
          z-index: 1;
          cursor: pointer;
          transition: fill 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          fill: ${vizSelected === "Total"
            ? appColors.ALLOCATIONS.RADIAL_CENTER_LABEL_HOVER_COLOR
            : "transparent"};

          &:hover {
            fill: ${appColors.ALLOCATIONS.RADIAL_CENTER_LABEL_HOVER_COLOR};
          }
        }
      `}
    >
      {reRouteDialog.display && (
        <ReRouteDialogBox
          display={{ ...reRouteDialog, pageType: "location" }}
          setDisplay={setReRouteDialog}
          handleClick={() =>
            history.push(`/location/${reRouteDialog.code}/overview`)
          }
        />
      )}
      <div
        css={`
          display: flex;
          color: ${appColors.ALLOCATIONS.TEXT_COLOR};
          font-size: 14px;
          font-weight: bold;
          align-items: center;
          font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;

          > svg {
            margin-left: 10px;
          }
        `}
      >
        Allocations | {selectedPeriod}
      </div>
      <div css="font-weight: normal;">{formatFinancialValue(total)}</div>
      {vizComponent}
    </div>
  );
}
