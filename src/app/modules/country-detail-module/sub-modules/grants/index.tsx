/* third-party */
import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import Grid from "@material-ui/core/Grid";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { GrantsViz, RadialChartLegend } from "app/components/Charts/Grants";

interface Props {
  code: string;
  detailFilterType: string;
}

export function LocationGrants(props: Props) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const fetchData = useStoreActions((store) => store.LocationGrants.fetch);
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);
  const data = useStoreState((state) =>
    get(state.LocationGrants.data, "data", [])
  );
  const periodsData: any[] = [];
  data.forEach((item: any) => {
    item.implementationPeriods.forEach((period: any) => {
      periodsData.push(period);
    });
  });
  const isLoading = useStoreState((state) => state.LocationGrants.loading);
  const datasource = useStoreState((state) => state.DataSourceState.value);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code && props.detailFilterType
        ? {
            ...appliedFilters,
            [props.detailFilterType]: [
              ...get(appliedFilters, props.detailFilterType, []),
              props.code,
            ],
          }
        : appliedFilters,
      { datasource }
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Grid container>
      {!isMobile && (
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <RadialChartLegend
            maxValue={get(maxBy(periodsData, "value"), "value", 0)}
          />
        </Grid>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={9}
        css={`
          @media (max-width: 767px) {
            height: 650px;
            overflow-x: auto;
            overflow-y: hidden;
          }
        `}
      >
        <div
          css={`
            width: 100%;

            @media (max-width: 767px) {
              width: 1000px;
              min-width: 1000px;
              max-width: 1000px;
            }
          `}
        >
          <GrantsViz data={data} />
        </div>
      </Grid>
      {isMobile && (
        <React.Fragment>
          <div
            css={`
              width: 100%;
              height: 40px;
            `}
          />
          <Grid item xs={12} sm={12} md={12} lg={3}>
            <RadialChartLegend
              maxValue={get(maxBy(periodsData, "value"), "value", 0)}
            />
          </Grid>
        </React.Fragment>
      )}
    </Grid>
  );
}
