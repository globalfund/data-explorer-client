/* third-party */
import React from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsFlowModule } from "app/modules/viz-module/sub-modules/budgets/flow";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { getDrilldownPanelOptions } from "app/modules/viz-module/sub-modules/budgets/flow/utils";

interface Props {
  toolboxOpen: boolean;
  setOpenToolboxPanel: (value: boolean) => void;
}

export function GenericBudgetsFlowWrapper(props: Props) {
  useTitle("The Data Explorer - Budgets Flow");

  const history = useHistory();

  const [vizLevel, setVizLevel] = React.useState(0);
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<{
    id: string | undefined;
    filterStr: string | undefined;
  }>({ id: undefined, filterStr: undefined });

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
  const fetchDrilldownLevel2Data = useStoreActions(
    (store) => store.BudgetsFlowDrilldownLevel2.fetch
  );
  const clearDrilldownLevel2Data = useStoreActions(
    (store) => store.BudgetsFlowDrilldownLevel2.clear
  );
  const dataDrilldownLevel2 = useStoreState(
    (state) =>
      get(
        state.BudgetsFlowDrilldownLevel2.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isLoading = useStoreState((state) => state.BudgetsFlow.loading);
  const isDrilldownLoading = useStoreState(
    (state) => state.BudgetsFlowDrilldownLevel1.loading
  );
  const isDrilldown2Loading = useStoreState(
    (state) => state.BudgetsFlowDrilldownLevel2.loading
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

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    if (
      (history.location.search.length > 0 &&
        appliedFilters.appliedFiltersCount > 0) ||
      (history.location.search.length === 0 &&
        appliedFilters.appliedFiltersCount === 0)
    ) {
      const filterString = getAPIFormattedFilters(appliedFilters);
      fetchData({ filterString });
    }
  }, [appliedFilters, history.location.search]);

  useUpdateEffect(() => {
    if (vizSelected.filterStr !== undefined) {
      const filterString = getAPIFormattedFilters(appliedFilters);
      fetchDrilldownLevel1Data({
        filterString: `levelParam=${vizSelected.filterStr}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
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
      const filterString = getAPIFormattedFilters({
        ...appliedFilters,
        components: [...appliedFilters.components, componentFilter],
      });
      fetchDrilldownLevel2Data({
        filterString: `levelParam=${
          vizSelected.filterStr
        }&activityAreaName=${activityAreaNameFilter}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
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
      isLoading={isLoading}
      isDrilldownLoading={isDrilldownLoading || isDrilldown2Loading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      dataDrilldownLevel1={dataDrilldownLevel1}
      setDrilldownVizSelected={setDrilldownVizSelected}
      dataDrilldownLevel2={dataDrilldownLevel2}
      drilldownVizSelected={drilldownVizSelected}
      toolboxOpen={props.toolboxOpen}
      setOpenToolboxPanel={props.setOpenToolboxPanel}
    />
  );
}
