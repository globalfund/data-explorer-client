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
  implementationPeriod: string;
}

export function GrantDetailGenericBudgetsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Grant Budgets Time cycle");
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
  const fetchData = useStoreActions(
    (store) => store.GrantDetailBudgetsTimeCycle.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.GrantDetailBudgetsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailBudgetsTimeCycle.loading
  );
  const fetchDrilldownLevel1Data = useStoreActions(
    (store) => store.GrantDetailBudgetsTimeCycleDrilldownLevel1.fetch
  );
  const clearDrilldownLevel1Data = useStoreActions(
    (store) => store.GrantDetailBudgetsTimeCycleDrilldownLevel1.clear
  );
  const dataDrilldownLevel1 = useStoreState(
    (state) =>
      get(
        state.GrantDetailBudgetsTimeCycleDrilldownLevel1.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const fetchDrilldownLevel2Data = useStoreActions(
    (store) => store.GrantDetailBudgetsTimeCycleDrilldownLevel2.fetch
  );
  const clearDrilldownLevel2Data = useStoreActions(
    (store) => store.GrantDetailBudgetsTimeCycleDrilldownLevel2.clear
  );
  const dataDrilldownLevel2 = useStoreState(
    (state) =>
      get(
        state.GrantDetailBudgetsTimeCycleDrilldownLevel2.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.GrantDetailBudgetsTimeCycleDrilldownLevel1.loading
  );
  const isDrilldown2Loading = useStoreState(
    (state) => state.GrantDetailBudgetsTimeCycleDrilldownLevel2.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const [drilldownPanelOptions, setDrilldownPanelOptions] = React.useState<
    string[]
  >(data.map((item: any) => item.year));

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod]);

  useUpdateEffect(() => {
    if (vizSelected !== undefined && props.code) {
      fetchDrilldownLevel1Data({
        filterString: `levelParam=budgetPeriodStartYear eq ${vizSelected}&grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
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
      });
      fetchDrilldownLevel2Data({
        filterString: `levelParam=budgetPeriodStartYear eq ${vizSelected}&grantId='${
          props.code
        }'&IPnumber=${
          props.implementationPeriod
        }&activityAreaName=${activityAreaNameFilter}${
          filterString.length > 0 ? `&${filterString}` : ""
        }`,
      });
    } else {
      clearDrilldownLevel2Data();
    }
  }, [drilldownVizSelected]);

  useUpdateEffect(() => {
    setDrilldownPanelOptions(data.map((item: any) => item.year.toString()));
  }, [data]);

  return (
    <BudgetsTimeCycleModule
      data={data}
      isLoading={isLoading}
      isDrilldownLoading={isDrilldownLoading || isDrilldown2Loading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      vizCompData={vizCompData}
      setVizCompData={setVizCompData}
      vizPrevSelected={vizPrevSelected}
      setVizPrevSelected={setVizPrevSelected}
      vizPrevTranslation={vizPrevTranslation}
      drilldownPanelOptions={drilldownPanelOptions}
      setDrilldownVizSelected={setDrilldownVizSelected}
      setVizPrevTranslation={setVizPrevTranslation}
      dataDrilldownLevel1={dataDrilldownLevel1}
      dataDrilldownLevel2={dataDrilldownLevel2}
      drilldownVizSelected={drilldownVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
