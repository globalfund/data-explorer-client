/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { Dropdown } from "app/components/Dropdown";
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsFlow } from "app/components/Charts/Budgets/Flow";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { TransitionContainer } from "app/components/TransitionContainer";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";
import { getDrilldownPanelOptions } from "app/modules/viz-module/sub-modules/budgets/flow/utils";

export function BudgetsFlowModule() {
  useTitle("The Data Explorer - Budgets Flow");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizPrevTranslation, setVizPrevTranslation] = React.useState({
    x: 0,
    y: 0,
  });
  const [vizSelected, setVizSelected] = React.useState<{
    id: string | undefined;
    filterStr: string | undefined;
  }>({ id: undefined, filterStr: undefined });
  const [vizPrevSelected, setVizPrevSelected] = React.useState<
    string | undefined
  >(undefined);
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<{
    id: string | undefined;
    filterStr: string | undefined;
  }>({ id: undefined, filterStr: undefined });
  const [vizCompData, setVizCompData] = React.useState([]);

  // api call & data
  const fetchData = useStoreActions((store) => store.BudgetsFlow.fetch);
  const nodes = useStoreState(
    (state) =>
      get(state.BudgetsFlow.data, "nodes", []) as {
        id: string;
        filterStr: string;
      }[]
  );
  const links = useStoreState(
    (state) =>
      get(state.BudgetsFlow.data, "links", []) as {
        value: number;
        source: string;
        target: string;
      }[]
  );
  const fetchDrilldownLevel1Data = useStoreActions(
    (store) => store.BudgetsFlowDrilldownLevel1.fetch
  );
  const clearDrilldownLevel1Data = useStoreActions(
    (store) => store.BudgetsFlowDrilldownLevel1.clear
  );
  const dataDrilldownLevel1 = useStoreState(
    (state) =>
      get(
        state.BudgetsFlowDrilldownLevel1.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isLoading = useStoreState((state) => state.BudgetsFlow.loading);
  const isDrilldownLoading = useStoreState(
    (state) => state.BudgetsFlowDrilldownLevel1.loading
  );

  const [drilldownPanelOptions, setDrilldownPanelOptions] = React.useState<
    {
      name: string;
      items: string[];
    }[]
  >(getDrilldownPanelOptions(links));

  React.useEffect(() => {
    if (nodes.length === 0 || links.length === 0) {
      fetchData({});
    }
  }, []);

  useUpdateEffect(() => {
    if (vizSelected.filterStr !== undefined) {
      fetchDrilldownLevel1Data({
        filterString: `levelParam=${vizSelected.filterStr}`,
      });
    } else {
      clearDrilldownLevel1Data();
    }
  }, [vizSelected.filterStr]);

  useUpdateEffect(() => {
    setDrilldownPanelOptions(getDrilldownPanelOptions(links));
  }, [links]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      css={`
        width: 100%;

        ${!vizSelected
          ? `* {
        overflow: visible !important;
      }`
          : ""}
      `}
    >
      <TransitionContainer vizScale={1} vizTranslation={vizTranslation}>
        {(vizLevel === 0 || vizLevel === 1) && (
          <BudgetsFlow
            data={{
              nodes,
              links,
            }}
            selectedNodeId={vizSelected.id}
            onNodeClick={(
              node: { id: string; filterStr: string },
              x: number,
              y: number
            ) => {
              setVizLevel(1);
              setVizSelected(node);
              setVizTranslation({ x: x * -1, y: 0 });
            }}
            vizCompData={vizCompData}
            setVizCompData={setVizCompData}
          />
        )}
        {vizLevel === 2 && (
          <DisbursementsTreemap
            data={mockdata2}
            selectedNodeId={vizSelected.id}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={vizLevel}
        selected={vizSelected.id}
        loading={isDrilldownLoading}
        close={() => {
          setVizLevel(vizLevel - 1);
          setVizTranslation({ x: 0, y: 0 });
          if (vizLevel - 1 === 0) {
            setVizSelected({ id: undefined, filterStr: undefined });
          }
          if (vizLevel - 1 === 0) {
            setDrilldownVizSelected({ id: undefined, filterStr: undefined });
          }
          setVizTranslation(
            vizLevel === 1 ? { x: 0, y: 0 } : vizPrevTranslation
          );
        }}
      >
        <span
          css={`
            gap: 40px;
            width: 100%;
            display: flex;
            margin-bottom: 20px;
            flex-direction: row;
          `}
        >
          <DrillDownArrowSelector
            options={drilldownPanelOptions.map(
              (option: { name: string; items: string[] }) => option.name
            )}
            selected={get(
              find(
                drilldownPanelOptions,
                (option: { name: string; items: string[] }) =>
                  option.items.indexOf(vizSelected.id as string) > -1
              ),
              "name",
              ""
            )}
            onChange={(value: string) => {
              const firstOfLevel = get(
                find(drilldownPanelOptions, { name: value }),
                "items[0]",
                null
              );
              if (firstOfLevel) {
                const fNode = find(nodes, { id: firstOfLevel }) as {
                  id: string;
                  filterStr: string;
                };
                if (fNode) {
                  setVizSelected(fNode);
                  const fVizNodeComp = find(vizCompData, {
                    id: firstOfLevel,
                  }) as any;
                  if (fVizNodeComp) {
                    setVizTranslation({
                      x: (fVizNodeComp.x - 200) * -1,
                      y: 0,
                    });
                  }
                }
              }
            }}
          />
          <Dropdown
            options={get(
              find(
                drilldownPanelOptions,
                (option: { name: string; items: string[] }) =>
                  option.items.indexOf(vizSelected.id as string) > -1
              ),
              "items",
              []
            )}
            value={vizSelected.id as string}
            handleChange={(value: string) => {
              const fNode = find(nodes, { id: value }) as {
                id: string;
                filterStr: string;
              };
              if (fNode) {
                setVizSelected(fNode);
                const fVizNodeComp = find(vizCompData, {
                  id: value,
                }) as any;
                if (fVizNodeComp) {
                  setVizTranslation({
                    x: (fVizNodeComp.x - 200) * -1,
                    y: 0,
                  });
                }
              }
            }}
          />
        </span>
        <BudgetsTreemap
          data={dataDrilldownLevel1}
          onNodeClick={(node: string, x: number, y: number) => {
            // setVizLevel(2);
            // setVizPrevSelected(vizSelected.id);
            // setDrilldownVizSelected({ id: node, filterStr: undefined });
            // setVizPrevTranslation(vizTranslation);
            // setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      </SlideInContainer>
    </div>
  );
}
