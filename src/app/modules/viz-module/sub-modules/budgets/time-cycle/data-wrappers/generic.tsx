/* third-party */
import React from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { BudgetsTimeCycleModule } from "app/modules/viz-module/sub-modules/budgets/time-cycle";

interface Props {
  toolboxOpen?: boolean;
  setOpenToolboxPanel?: (value: boolean) => void;
}

export function GenericBudgetsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Budgets Time cycle");

  const history = useHistory();

  const [vizLevel, setVizLevel] = React.useState(0);
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<
    string | undefined
  >(undefined);

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
  const fetchDrilldownLevel2Data = useStoreActions(
    (store) => store.BudgetsTimeCycleDrilldownLevel2.fetch
  );
  const clearDrilldownLevel2Data = useStoreActions(
    (store) => store.BudgetsTimeCycleDrilldownLevel2.clear
  );
  const dataDrilldownLevel2 = useStoreState(
    (state) =>
      get(
        state.BudgetsTimeCycleDrilldownLevel2.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.BudgetsTimeCycleDrilldownLevel1.loading
  );
  const isDrilldown2Loading = useStoreState(
    (state) => state.BudgetsTimeCycleDrilldownLevel2.loading
  );
  const setDrilldownLevelSelectors = useStoreActions(
    (store) => store.ToolBoxPanelBudgetTimeCycleDrilldownYearSelector.setOptions
  );
  const vizSelected = useStoreState(
    (state) =>
      state.ToolBoxPanelBudgetTimeCycleDrilldownYearSelector.selectedOption
  );
  const setVizSelected = useStoreActions(
    (actions) =>
      actions.ToolBoxPanelBudgetTimeCycleDrilldownYearSelector.setSelectedOption
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
    if (vizSelected !== undefined) {
      const filterString = getAPIFormattedFilters(appliedFilters);
      fetchDrilldownLevel1Data({
        filterString: `levelParam=budgetPeriodStartYear eq ${vizSelected}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      clearDrilldownLevel1Data();
    }
  }, [vizSelected]);

  useUpdateEffect(() => {
    if (drilldownVizSelected !== undefined && vizSelected !== undefined) {
      const idSplits = drilldownVizSelected.split("-");
      const componentFilter = idSplits.length > 2 ? idSplits[2] : idSplits[1];
      const activityAreaNameFilter =
        idSplits.length > 2 ? `${idSplits[0]}-${idSplits[1]}` : idSplits[0];
      const filterString = getAPIFormattedFilters({
        ...appliedFilters,
        components: [...appliedFilters.components, componentFilter],
      });
      fetchDrilldownLevel2Data({
        filterString: `levelParam=budgetPeriodStartYear eq ${vizSelected}&activityAreaName=${activityAreaNameFilter}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      clearDrilldownLevel2Data();
    }
  }, [drilldownVizSelected]);

  useUpdateEffect(() => {
    setDrilldownLevelSelectors(data.map((item: any) => item.year.toString()));
  }, [data]);

  React.useEffect(() => {
    if (dataPathActiveStep) {
      if (
        dataPathActiveStep.vizSelected &&
        !dataPathActiveStep.drilldownVizSelected
      ) {
        setVizLevel(1);
        setVizSelected(dataPathActiveStep.vizSelected.id);
        clearDataPathActiveStep();
      } else if (
        dataPathActiveStep.vizSelected &&
        dataPathActiveStep.drilldownVizSelected
      ) {
        setVizLevel(2);
        setVizSelected(dataPathActiveStep.vizSelected.id);
        setDrilldownVizSelected(dataPathActiveStep.drilldownVizSelected.id);
        clearDataPathActiveStep();
      } else if (
        !dataPathActiveStep.vizSelected &&
        !dataPathActiveStep.drilldownVizSelected &&
        vizSelected &&
        drilldownVizSelected
      ) {
        setVizLevel(0);
        setVizSelected(undefined);
        setDrilldownVizSelected(undefined);
        clearDataPathActiveStep();
      }
    }
  }, [dataPathActiveStep]);

  return (
    <BudgetsTimeCycleModule
      data={data}
      isLoading={isLoading}
      isDrilldownLoading={isDrilldownLoading || isDrilldown2Loading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      setDrilldownVizSelected={setDrilldownVizSelected}
      dataDrilldownLevel1={dataDrilldownLevel1}
      dataDrilldownLevel2={dataDrilldownLevel2}
      drilldownVizSelected={drilldownVizSelected}
      toolboxOpen={props.toolboxOpen}
      setOpenToolboxPanel={props.setOpenToolboxPanel}
    />
  );
}
