/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import { useTitle, useUnmount, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { Dropdown } from "app/components/Dropdown";
import { PageLoader } from "app/modules/common/page-loader";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { PledgesContributionsTimeCycle } from "app/components/Charts/PledgesContributions/TimeCycle";
import { PledgesContributionsTreemapDataItem } from "app/components/Charts/PledgesContributions/TimeCycle/data";

export function PledgesContributionsTimeCycleModule() {
  useTitle("The Data Explorer - Pledges & Contributions/Time cycle");
  const cmsData = useCMSData({ returnData: true });
  const history = useHistory();

  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [vizCompData, setVizCompData] = React.useState([]);

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.PledgesContributionsTimeCycle.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.PledgesContributionsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.PledgesContributionsTimeCycle.loading
  );
  const fetchDrilldownLevelData = useStoreActions(
    (store) => store.PledgesContributionsTimeCycleDrilldown.fetch
  );
  const clearDrilldownLevelData = useStoreActions(
    (store) => store.PledgesContributionsTimeCycleDrilldown.clear
  );
  const dataDrilldownLevel = useStoreState(
    (state) =>
      get(
        state.PledgesContributionsTimeCycleDrilldown.data,
        "data",
        []
      ) as PledgesContributionsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.PledgesContributionsTimeCycleDrilldown.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const setVizDrilldowns = useStoreActions(
    (actions) => actions.PageHeaderVizDrilldownsState.setValue
  );

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, {
        name: "Resource Mobilization: Pledges & Contributions",
      })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Resource Mobilization: Pledges & Contributions",
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

  React.useEffect(() => {
    if (vizLevel === 0) {
      setVizDrilldowns([]);
    }
    if (vizLevel > 0 && vizSelected) {
      const splits = vizSelected.split("-");
      if (splits.length > 1) {
        setVizDrilldowns([
          { name: "Pledges & Contributions-treemap" },
          { name: `${splits[0]}-${splits[1]}` },
        ]);
      }
    }
  }, [vizLevel, vizSelected]);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters);
    fetchData({ filterString });
  }, [appliedFilters]);

  useUpdateEffect(() => {
    if (vizSelected) {
      const splits = vizSelected.split("-");
      const param = `'${splits[0]}-${splits[1]}'-${splits[2]}`;
      const filterString = getAPIFormattedFilters(appliedFilters);
      fetchDrilldownLevelData({
        filterString: `levelParam=replenishmentPeriod/replenishmentPeriodName eq ${param}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      clearDrilldownLevelData();
    }
  }, [vizSelected]);

  useUnmount(() => setVizDrilldowns([]));

  let vizComponent = <React.Fragment />;

  if (isLoading || isDrilldownLoading) {
    vizComponent = <PageLoader />;
  } else {
    if (vizLevel === 0) {
      vizComponent = (
        <PledgesContributionsTimeCycle
          data={data}
          vizCompData={vizCompData}
          setVizCompData={setVizCompData}
          onNodeClick={(node: string) => {
            setVizLevel(1);
            setVizSelected(node);
          }}
        />
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
              selected={`${(vizSelected || "").split("-")[0]}-${
                (vizSelected || "").split("-")[1]
              }`}
              options={vizCompData.map((item: any) => item.data.indexValue)}
              onChange={(value: string) => {
                const splits = (vizSelected as string).split("-");
                if (splits.length > 2) {
                  const newSelected = `${value}-${splits[2]}`;
                  setVizSelected(newSelected);
                }
              }}
            />
            <Dropdown
              options={["pledge", "contribution"]}
              value={(vizSelected || "").split("-")[2]}
              handleChange={(value: string) => {
                const splits = (vizSelected as string).split("-");
                if (splits.length > 2) {
                  const newSelected = `${splits[0]}-${splits[1]}-${value}`;
                  setVizSelected(newSelected);
                }
              }}
            />
          </span>
          <BudgetsTreemap
            data={dataDrilldownLevel}
            tooltipValueLabel={get(
              cmsData,
              "componentsChartsBudgets.amount",
              ""
            )}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        </React.Fragment>
      );
    }
  }

  return (
    <div
      id="pledges-contributions-time-cycle"
      css={`
        width: 100%;

        * {
          overflow: visible !important;
        }
      `}
    >
      {vizComponent}
    </div>
  );
}
