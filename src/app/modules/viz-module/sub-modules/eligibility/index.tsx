/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { DotChart } from "app/components/Charts/Eligibility/DotChart";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";

export function EligibilityModule() {
  useTitle("The Data Explorer - Eligibility");

  // aggregateBy control const
  const aggregateBy = useStoreState(
    (state) =>
      (state.ToolBoxPanelAggregateByState.value.length > 0
        ? state.ToolBoxPanelAggregateByState.value
        : "componentName") as "componentName" | "geographicAreaName"
  );

  // api call & data
  const fetchData = useStoreActions((store) => store.Eligibility.fetch);
  const data = useStoreState(
    (state) => get(state.Eligibility.data, "data", []) as DotChartModel[]
  );
  const isLoading = useStoreState((state) => state.Eligibility.loading);

  React.useEffect(
    () =>
      fetchData({
        filterString: `aggregateBy=${aggregateBy}`,
      }),
    [aggregateBy]
  );

  if (isLoading) {
    return <PageLoader />;
  }

  return <DotChart data={data} aggregateBy={aggregateBy} />;
}
