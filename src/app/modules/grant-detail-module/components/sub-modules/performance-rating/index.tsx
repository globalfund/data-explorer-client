/* third-party */
import React from "react";
import get from "lodash/get";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { PerformanceRating } from "app/components/Charts/PerformanceRating";

interface PerformanceRatingModuleProps {
  code: string;
}

export function PerformanceRatingModule(props: PerformanceRatingModuleProps) {
  // api call & data
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
      fetchData({ filterString: `grantId='${props.code}'` });
    }
  }, [props.code]);

  if (isLoading) {
    return <PageLoader />;
  }

  return <PerformanceRating data={data} />;
}
