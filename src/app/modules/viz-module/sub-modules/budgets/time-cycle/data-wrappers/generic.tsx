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
  toolboxOpen?: boolean;
}

export function GenericBudgetsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Budgets Time cycle");
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

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const [drilldownPanelOptions, setDrilldownPanelOptions] = React.useState<
    string[]
  >(data.map((item: any) => item.year));

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(appliedFilters);
    fetchData({ filterString });
  }, [appliedFilters]);

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
    setDrilldownPanelOptions(data.map((item: any) => item.year.toString()));
  }, [data]);

  return (
    <BudgetsTimeCycleModule
      data={data}
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
      vizPrevSelected={vizPrevSelected}
      drilldownPanelOptions={drilldownPanelOptions}
      dataDrilldownLevel1={dataDrilldownLevel1}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
