import React from "react";
import get from "lodash/get";
import { PageLoader } from "app/modules/common/page-loader";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

export function GenericInvestmentsDisbursedWrapper() {
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

  React.useEffect(() => fetchData({}), []);

  if (isLoading) {
    return <PageLoader />;
  }
  return <InvestmentsDisbursedModule data={data} />;
}
