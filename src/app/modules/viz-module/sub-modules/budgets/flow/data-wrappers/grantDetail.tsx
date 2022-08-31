/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { BudgetsFlowModule } from "app/modules/viz-module/sub-modules/budgets/flow";
import { getDrilldownPanelOptions } from "app/modules/viz-module/sub-modules/budgets/flow/utils";

interface Props {
  code: string;
  toolboxOpen?: boolean;
  implementationPeriod: string;
}

export function GrantDetailBudgetsFlowWrapper(props: Props) {
  useTitle("The Data Explorer - Grant Budgets Flow");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<{
    id: string | undefined;
    filterStr: string | undefined;
  }>({ id: undefined, filterStr: undefined });

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.GrantDetailBudgetsFlow.fetch
  );
  const nodes = useStoreState(
    (state) =>
      get(state.GrantDetailBudgetsFlow.data, "nodes", []) as {
        id: string;
        filterStr: string;
      }[]
  );
  const links = useStoreState(
    (state) =>
      get(state.GrantDetailBudgetsFlow.data, "links", []) as {
        value: number;
        source: string;
        target: string;
      }[]
  );
  const fetchDrilldownLevel1Data = useStoreActions(
    (store) => store.GrantDetailBudgetsFlowDrilldownLevel1.fetch
  );
  const clearDrilldownLevel1Data = useStoreActions(
    (store) => store.GrantDetailBudgetsFlowDrilldownLevel1.clear
  );
  const dataDrilldownLevel1 = useStoreState(
    (state) =>
      get(
        state.GrantDetailBudgetsFlowDrilldownLevel1.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const fetchDrilldownLevel2Data = useStoreActions(
    (store) => store.GrantDetailBudgetsFlowDrilldownLevel2.fetch
  );
  const clearDrilldownLevel2Data = useStoreActions(
    (store) => store.GrantDetailBudgetsFlowDrilldownLevel2.clear
  );
  const dataDrilldownLevel2 = useStoreState(
    (state) =>
      get(
        state.GrantDetailBudgetsFlowDrilldownLevel2.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailBudgetsFlow.loading
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.GrantDetailBudgetsFlowDrilldownLevel1.loading
  );
  const isDrilldown2Loading = useStoreState(
    (state) => state.GrantDetailBudgetsFlowDrilldownLevel2.loading
  );
  const setDrilldownLevelSelectors = useStoreActions(
    (store) => store.ToolBoxPanelBudgetFlowDrilldownSelectors.setLevels
  );
  const vizSelected = useStoreState(
    (state) => state.ToolBoxPanelBudgetFlowDrilldownSelectors.selectedLevelValue
  );
  const setVizSelected = useStoreActions(
    (actions) =>
      actions.ToolBoxPanelBudgetFlowDrilldownSelectors.setSelectedLevelValue
  );
  const dataPathActiveStep = useStoreState(
    (state) => state.DataPathActiveStep.step
  );
  const clearDataPathActiveStep = useStoreActions(
    (actions) => actions.DataPathActiveStep.clear
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod]);

  useUpdateEffect(() => {
    if (vizSelected.filterStr !== undefined && props.code) {
      fetchDrilldownLevel1Data({
        filterString: `levelParam=${vizSelected.filterStr}&grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    } else {
      clearDrilldownLevel1Data();
    }
  }, [vizSelected.filterStr]);

  useUpdateEffect(() => {
    if (
      drilldownVizSelected.id !== undefined &&
      vizSelected.filterStr !== undefined
    ) {
      const idSplits = drilldownVizSelected.id.split("-");
      const componentFilter = idSplits.length > 2 ? idSplits[2] : idSplits[1];
      const activityAreaNameFilter =
        idSplits.length > 2 ? `${idSplits[0]}-${idSplits[1]}` : idSplits[0];
      fetchDrilldownLevel2Data({
        filterString: `levelParam=${vizSelected.filterStr}&activityAreaName=${activityAreaNameFilter}&grantId='${props.code}'&IPnumber=${props.implementationPeriod}&components=${componentFilter}`,
      });
    } else {
      clearDrilldownLevel2Data();
    }
  }, [drilldownVizSelected.id]);

  useUpdateEffect(() => {
    setDrilldownLevelSelectors(getDrilldownPanelOptions(links));
  }, [links]);

  React.useEffect(() => {
    if (dataPathActiveStep) {
      if (
        dataPathActiveStep.vizSelected &&
        !dataPathActiveStep.drilldownVizSelected
      ) {
        setVizLevel(1);
        setVizSelected(dataPathActiveStep.vizSelected);
        clearDataPathActiveStep();
      } else if (
        dataPathActiveStep.vizSelected &&
        dataPathActiveStep.drilldownVizSelected
      ) {
        setVizLevel(2);
        setVizSelected(dataPathActiveStep.vizSelected);
        setDrilldownVizSelected(dataPathActiveStep.drilldownVizSelected);
        clearDataPathActiveStep();
      } else if (
        !dataPathActiveStep.vizSelected &&
        !dataPathActiveStep.drilldownVizSelected &&
        vizSelected &&
        drilldownVizSelected
      ) {
        setVizLevel(0);
        setVizSelected({ id: undefined, filterStr: undefined });
        setDrilldownVizSelected({ id: undefined, filterStr: undefined });
        clearDataPathActiveStep();
      }
    }
  }, [dataPathActiveStep]);

  return (
    <BudgetsFlowModule
      nodes={nodes}
      links={links}
      isGrantDetail
      isLoading={isLoading}
      isDrilldownLoading={isDrilldownLoading || isDrilldown2Loading}
      codeParam={props.code}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      dataDrilldownLevel1={dataDrilldownLevel1}
      setDrilldownVizSelected={setDrilldownVizSelected}
      dataDrilldownLevel2={dataDrilldownLevel2}
      drilldownVizSelected={drilldownVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
