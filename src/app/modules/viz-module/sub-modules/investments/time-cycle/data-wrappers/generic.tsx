/* third-party */
import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

interface Props {
  code?: string;
}

export function GenericInvestmentsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Investments/Time cycle");
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

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.DisbursementsTimeCycle.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.DisbursementsTimeCycle.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.DisbursementsTimeCycle.loading
  );
  const fetchDrilldownData = useStoreActions(
    (store) => store.DisbursementsTimeCycleDrilldown.fetch
  );
  const drilldownData = useStoreState(
    (state) =>
      get(
        state.DisbursementsTimeCycleDrilldown.data,
        "data",
        []
      ) as BudgetsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.DisbursementsTimeCycleDrilldown.loading
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
    if (vizSelected) {
      let filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              locations: [...appliedFilters.locations, props.code],
            }
          : appliedFilters
      );
      if (filterString) {
        filterString += `&barPeriod=${vizSelected}`;
      } else {
        filterString = `barPeriod=${vizSelected}`;
      }
      fetchDrilldownData({ filterString });
    }
  }, [vizSelected]);

  return (
    <InvestmentsTimeCycleModule
      data={data}
      isDrilldownLoading={isDrilldownLoading}
      drilldownData={drilldownData}
      isLoading={isLoading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      vizPrevSelected={vizPrevSelected}
      setVizPrevSelected={setVizPrevSelected}
      vizPrevTranslation={vizPrevTranslation}
      setVizPrevTranslation={setVizPrevTranslation}
    />
  );
}
