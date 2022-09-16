/* third-party */
import React from "react";
import get from "lodash/get";
import { useTitle } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { ScatterPlot } from "app/components/Charts/Eligibility/Scatterplot";
import { EligibilityScatterplotDataModel } from "app/components/Charts/Eligibility/Scatterplot/data";

interface Props {
  code: string;
}

export function LocationDetailEligibilityWrapper(props: Props) {
  useTitle("Dataxplorer - Location Eligibility");

  // api call & data
  const fetchData = useStoreActions((store) => store.EligibilityCountry.fetch);
  const data = useStoreState(
    (state) =>
      get(
        state.EligibilityCountry.data,
        "data",
        []
      ) as EligibilityScatterplotDataModel[]
  );
  const isLoading = useStoreState((state) => state.EligibilityCountry.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const datasource = useStoreState((state) => state.DataSourceState.value);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters,
      { datasource }
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters]);

  if (isLoading) {
    return <PageLoader />;
  }

  return <ScatterPlot data={data} />;
}
