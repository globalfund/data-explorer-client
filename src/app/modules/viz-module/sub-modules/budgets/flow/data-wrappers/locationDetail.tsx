/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsFlowModule } from "app/modules/viz-module/sub-modules/budgets/flow";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { getDrilldownPanelOptions } from "app/modules/viz-module/sub-modules/budgets/flow/utils";

interface Props {
  code: string;
}

export function LocationDetailBudgetsFlowWrapper(props: Props) {
  useTitle("The Data Explorer - Location Budgets Flow");
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
  const fetchData = useStoreActions(
    (store) => store.LocationDetailBudgetsFlow.fetch
  );
  const nodes = useStoreState(
    (state) =>
      get(state.LocationDetailBudgetsFlow.data, "nodes", []) as {
        id: string;
        filterStr: string;
      }[]
  );
  const links = useStoreState(
    (state) =>
      get(state.LocationDetailBudgetsFlow.data, "links", []) as {
        value: number;
        source: string;
        target: string;
      }[]
  );
  const fetchDrilldownLevel1Data = useStoreActions(
    (store) => store.LocationDetailBudgetsFlowDrilldownLevel1.fetch
  );
  const clearDrilldownLevel1Data = useStoreActions(
    (store) => store.LocationDetailBudgetsFlowDrilldownLevel1.clear
  );
  const dataDrilldownLevel1 = useStoreState(
    (state) =>
      get(
        state.LocationDetailBudgetsFlowDrilldownLevel1.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.LocationDetailBudgetsFlow.loading
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.LocationDetailBudgetsFlowDrilldownLevel1.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const [drilldownPanelOptions, setDrilldownPanelOptions] = React.useState<
    {
      name: string;
      items: string[];
    }[]
  >(getDrilldownPanelOptions(links));

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
    if (vizSelected.filterStr !== undefined && props.code) {
      const filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      fetchDrilldownLevel1Data({
        filterString: `levelParam=${vizSelected.filterStr}&${filterString}`,
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
