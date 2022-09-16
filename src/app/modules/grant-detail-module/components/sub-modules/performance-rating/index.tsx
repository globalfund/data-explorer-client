/* third-party */
import React from "react";
import get from "lodash/get";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { PerformanceRating } from "app/components/Charts/PerformanceRating";

interface PerformanceRatingModuleProps {
  code: string;
  implementationPeriod: string;
}

export function PerformanceRatingModule(props: PerformanceRatingModuleProps) {
  // api call & data
  const datasource = useStoreState((state) => state.DataSourceState.value);
  const fetchData = useStoreActions(
    (store) => store.GrantDetailPerformanceRating.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.GrantDetailPerformanceRating.data, "data", []) as Record<
        string,
        unknown
      >[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailPerformanceRating.loading
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}&datasource=${datasource}`,
      });
    }
  }, [props.code, props.implementationPeriod]);

  if (isLoading) {
    return <PageLoader />;
  }

  return <PerformanceRating data={data} />;
}
