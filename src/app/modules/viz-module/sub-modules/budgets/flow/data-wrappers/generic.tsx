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
import { BudgetsFlowModule } from "..";

export function GenericBudgetsFlowWrapper() {
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

  return (
    <BudgetsFlowModule
      nodes={nodes}
      links={links}
      isLoading={isLoading}
      isDrilldownLoading={isDrilldownLoading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      vizCompData={vizCompData}
      setVizCompData={setVizCompData}
      vizPrevTranslation={vizPrevTranslation}
      dataDrilldownLevel1={dataDrilldownLevel1}
      setDrilldownVizSelected={setDrilldownVizSelected}
      drilldownPanelOptions={drilldownPanelOptions}
    />
  );
}
