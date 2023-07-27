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
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod]);

  React.useEffect(() => {
    setTimeout(() => {
      addDataPathSteps([
        {
          id: "grant",
          name: "Performance Rating",
          path: location.pathname,
        },
      ]);
    }, 500);
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <PerformanceRating data={data} />;
}
