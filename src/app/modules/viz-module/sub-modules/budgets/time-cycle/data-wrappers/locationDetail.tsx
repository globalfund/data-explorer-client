/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { BudgetsTimeCycleModule } from "app/modules/viz-module/sub-modules/budgets/time-cycle";

interface Props {
  code: string;
  toolboxOpen?: boolean;
}

export function LocationDetailGenericBudgetsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Location Budgets Time cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<
    string | undefined
  >(undefined);

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.LocationDetailBudgetsTimeCycle.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.LocationDetailBudgetsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.LocationDetailBudgetsTimeCycle.loading
  );
  const fetchDrilldownLevel1Data = useStoreActions(
    (store) => store.LocationDetailBudgetsTimeCycleDrilldownLevel1.fetch
  );
  const clearDrilldownLevel1Data = useStoreActions(
    (store) => store.LocationDetailBudgetsTimeCycleDrilldownLevel1.clear
  );
  const dataDrilldownLevel1 = useStoreState(
    (state) =>
      get(
        state.LocationDetailBudgetsTimeCycleDrilldownLevel1.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.LocationDetailBudgetsTimeCycleDrilldownLevel1.loading
  );
  const fetchDrilldownLevel2Data = useStoreActions(
    (store) => store.LocationDetailBudgetsTimeCycleDrilldownLevel2.fetch
  );
  const clearDrilldownLevel2Data = useStoreActions(
    (store) => store.LocationDetailBudgetsTimeCycleDrilldownLevel2.clear
  );
  const dataDrilldownLevel2 = useStoreState(
    (state) =>
      get(
        state.LocationDetailBudgetsTimeCycleDrilldownLevel2.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldown2Loading = useStoreState(
    (state) => state.LocationDetailBudgetsTimeCycleDrilldownLevel2.loading
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
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters]);

  useUpdateEffect(() => {
    if (vizSelected !== undefined && props.code) {
      const filterString = getAPIFormattedFilters({
        ...appliedFilters,
        locations: [...appliedFilters.locations, props.code],
      });
      fetchDrilldownLevel1Data({
        filterString: `levelParam=budgetPeriodStartYear eq ${vizSelected}&${filterString}`,
      });
    } else {
      clearDrilldownLevel1Data();
    }
  }, [vizSelected]);

  useUpdateEffect(() => {
    if (
      drilldownVizSelected !== undefined &&
      vizSelected !== undefined &&
      props.code
    ) {
      const idSplits = drilldownVizSelected.split("-");
      const componentFilter = idSplits.length > 2 ? idSplits[2] : idSplits[1];
      const activityAreaNameFilter =
        idSplits.length > 2 ? `${idSplits[0]}-${idSplits[1]}` : idSplits[0];
      const filterString = getAPIFormattedFilters({
        ...appliedFilters,
        components: [...appliedFilters.components, componentFilter],
        locations: [...appliedFilters.locations, props.code],
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
      isLocationDetail
      isLoading={isLoading}
      isDrilldownLoading={isDrilldownLoading || isDrilldown2Loading}
      codeParam={props.code}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      setDrilldownVizSelected={setDrilldownVizSelected}
      dataDrilldownLevel1={dataDrilldownLevel1}
      dataDrilldownLevel2={dataDrilldownLevel2}
      drilldownVizSelected={drilldownVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
