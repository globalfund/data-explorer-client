/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useTitle, useUnmount, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { Dropdown } from "app/components/Dropdown";
import { PageLoader } from "app/modules/common/page-loader";
import { VizBackBtn } from "app/components/Charts/common/backbtn";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { PledgesContributionsTimeCycle } from "app/components/Charts/PledgesContributions/TimeCycle";
import { PledgesContributionsTreemapDataItem } from "app/components/Charts/PledgesContributions/TimeCycle/data";

interface Props {
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function PledgesContributionsTimeCycleModule(props: Props) {
  useTitle("The Data Explorer - Pledges & Contributions/Time cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  // const [vizScale, setVizScale] = React.useState(1);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
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

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     const viz = document.getElementById("pledges-contributions-time-cycle");
  //     if (viz) {
  //       const svgs = viz.getElementsByTagName("svg");
  //       if (svgs.length > 1) {
  //         const pathElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "path"
  //         );
  //         pathElement.setAttribute("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2");
  //         pathElement.setAttribute("stroke", "#13183F");
  //         pathElement.setAttribute("strokeWidth", "1");

  //         const patternElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "pattern"
  //         );
  //         patternElement.setAttribute("id", "diagonalHatch");
  //         patternElement.setAttribute("patternUnits", "userSpaceOnUse");
  //         patternElement.setAttribute("width", "4");
  //         patternElement.setAttribute("height", "4");
  //         patternElement.appendChild(pathElement);

  //         const defsElement = document.createElementNS(
  //           "http://www.w3.org/2000/svg",
  //           "defs"
  //         );
  //         defsElement.appendChild(patternElement);

  //         svgs[1].appendChild(defsElement);
  //       }
  //     }
  //   }, 1000);
  // }, []);

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
          // selectedNodeId={vizSelected}
          setVizCompData={setVizCompData}
          onNodeClick={(node: string, x: number, y: number) => {
            setVizLevel(1);
            setVizSelected(node);
            setVizTranslation({ x: x * -1, y: 0 });
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
                  const fVizNodeComp = find(
                    vizCompData,
                    (item: any) =>
                      `${item.data.indexValue}-${item.data.id}` === newSelected
                  ) as any;
                  if (fVizNodeComp) {
                    setVizTranslation({
                      x: (fVizNodeComp.x - 100) * -1,
                      y: 0,
                    });
                  }
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
                  const fVizNodeComp = find(
                    vizCompData,
                    (item: any) =>
                      `${item.data.indexValue}-${item.data.id}` === newSelected
                  ) as any;
                  if (fVizNodeComp) {
                    setVizTranslation({
                      x: (fVizNodeComp.x - 100) * -1,
                      y: 0,
                    });
                  }
                }
              }}
            />
          </span>
          <BudgetsTreemap
            data={dataDrilldownLevel}
            tooltipValueLabel="Amount"
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
      {vizLevel > 0 && (
        <VizBackBtn
          vizLevel={vizLevel}
          setVizLevel={(value: number) => {
            if (value === 0) {
              setVizSelected(undefined);
            }
            setVizLevel(value);
          }}
          setOpenToolboxPanel={props.setOpenToolboxPanel}
        />
      )}
      {vizComponent}
    </div>
  );
}
