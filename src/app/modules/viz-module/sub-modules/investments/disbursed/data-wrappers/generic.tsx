/* third-party */
import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code?: string;
}

export function GenericInvestmentsDisbursedWrapper(props: Props) {
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions(
    (store) => store.DisbursementsTreemap.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.DisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.DisbursementsTreemap.loading
  );
  const fetchDrilldownData = useStoreActions(
    (store) => store.DisbursementsTreemapDrilldown.fetch
  );
  const drilldownData = useStoreState(
    (state) =>
      get(
        state.DisbursementsTreemapDrilldown.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const isDrilldownLoading = useStoreState(
    (state) => state.DisbursementsTreemapDrilldown.loading
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
      const splits = vizSelected.split("-");
      if (splits.length > 0) {
        const locations = [...appliedFilters.locations];
        if (props.code) {
          locations.push(props.code);
        }
        locations.push(splits[0]);
        const filterString = getAPIFormattedFilters({
          ...appliedFilters,
          locations,
        });
        fetchDrilldownData({ filterString });
      }
    }
  }, [vizSelected]);

  return (
    <InvestmentsDisbursedModule
      data={data}
      allowDrilldown
      vizLevel={vizLevel}
      isLoading={isLoading}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      drilldownData={drilldownData}
      setVizSelected={setVizSelected}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      isDrilldownLoading={isDrilldownLoading}
    />
  );
}
