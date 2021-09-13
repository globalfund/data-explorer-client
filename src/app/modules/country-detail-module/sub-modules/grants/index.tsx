/* third-party */
import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import Grid from "@material-ui/core/Grid";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { GrantsViz, RadialChartLegend } from "app/components/Charts/Grants";

interface Props {
  code: string;
}

export function LocationGrants(props: Props) {
  const fetchData = useStoreActions((store) => store.LocationGrants.fetch);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const data = useStoreState((state) =>
    get(state.LocationGrants.data, "data", [])
  );
  const isLoading = useStoreState((state) => state.LocationGrants.loading);

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

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <RadialChartLegend maxValue={get(maxBy(data, "value"), "value", 0)} />
      </Grid>

      <Grid item xs={9}>
        <GrantsViz data={data} />
      </Grid>
    </Grid>
  );
}
