/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SlideInContainer } from "app/components/SlideInPanel";
import { BudgetsTreemap } from "app/components/Charts/Budgets/Treemap";
import { TransitionContainer } from "app/components/TransitionContainer";
import { BudgetsTimeCycle } from "app/components/Charts/Budgets/TimeCycle";
import { DrillDownArrowSelector } from "app/components/DrilldownArrowSelector";
import { mockdata2 } from "app/components/Charts/Investments/Disbursements/data";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { DisbursementsTreemap } from "app/components/Charts/Investments/Disbursements";

export function BudgetsTimeCycleModule() {
  useTitle("The Data Explorer - Budgets Time/Cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizPrevTranslation, setVizPrevTranslation] = React.useState({
    x: 0,
    y: 0,
  });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );
  const [vizPrevSelected, setVizPrevSelected] = React.useState<
    string | undefined
  >(undefined);
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<
    string | undefined
  >(undefined);
  const [vizCompData, setVizCompData] = React.useState([]);

  // api call & data
  const fetchData = useStoreActions((store) => store.BudgetsTimeCycle.fetch);
  const data = useStoreState(
    (state) =>
      get(state.BudgetsTimeCycle.data, "data", []) as Record<string, unknown>[]
  );
  const isLoading = useStoreState((state) => state.BudgetsTimeCycle.loading);
  const fetchDrilldownLevel1Data = useStoreActions(
    (store) => store.BudgetsTimeCycleDrilldownLevel1.fetch
  );
  const clearDrilldownLevel1Data = useStoreActions(
    (store) => store.BudgetsTimeCycleDrilldownLevel1.clear
  );
  const dataDrilldownLevel1 = useStoreState(
    (state) =>
      get(
        state.BudgetsTimeCycleDrilldownLevel1.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.BudgetsTimeCycleDrilldownLevel1.loading
  );

  const [drilldownPanelOptions, setDrilldownPanelOptions] = React.useState<
    string[]
  >(data.map((item: any) => item.year));

  React.useEffect(() => {
    if (data.length === 0) {
      fetchData({});
    }
  }, []);

  useUpdateEffect(() => {
    if (vizSelected !== undefined) {
      fetchDrilldownLevel1Data({
        filterString: `levelParam=budgetPeriodStartYear eq ${vizSelected}`,
      });
    } else {
      clearDrilldownLevel1Data();
    }
  }, [vizSelected]);

  useUpdateEffect(() => {
    setDrilldownPanelOptions(data.map((item: any) => item.year.toString()));
  }, [data]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div
      id="budgets-time-cycle"
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
          <BudgetsTimeCycle
            data={data}
            vizCompData={vizCompData}
            selectedNodeId={vizSelected}
            setVizCompData={setVizCompData}
            onNodeClick={(node: string, x: number, y: number) => {
              setVizLevel(1);
              setVizSelected(node);
              setVizTranslation({ x: x * -1, y: 0 });
            }}
          />
        )}
        {vizLevel === 2 && (
          <DisbursementsTreemap
            data={mockdata2}
            selectedNodeId={vizSelected}
            onNodeClick={(node: string, x: number, y: number) => {}}
          />
        )}
      </TransitionContainer>
      <SlideInContainer
        vizLevel={vizLevel}
        selected={vizSelected}
        loading={isDrilldownLoading}
        close={() => {
          setVizLevel(vizLevel - 1);
          setVizSelected(undefined);
          setVizSelected(vizLevel === 1 ? undefined : vizPrevSelected);
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
            options={drilldownPanelOptions}
            selected={vizSelected as string}
            onChange={(value: string) => {
              setVizSelected(value);
              const fVizNodeComp = find(
                vizCompData,
                (item: any) => item.data.indexValue === value
              ) as any;
              if (fVizNodeComp) {
                setVizTranslation({
                  x: (fVizNodeComp.x - 100) * -1,
                  y: 0,
                });
              }
            }}
          />
        </span>
        <BudgetsTreemap
          data={dataDrilldownLevel1}
          onNodeClick={(node: string, x: number, y: number) => {
            // setVizLevel(2);
            // setVizPrevSelected(vizSelected);
            // setVizSelected(node);
            // setVizPrevTranslation(vizTranslation);
            // setVizTranslation({ x: x * -1, y: 0 });
          }}
        />
      </SlideInContainer>
    </div>
  );
}
