/* third-party */
import React from "react";
import get from "lodash/get";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code: string;
}

export function GrantDetailInvestmentsDisbursedWrapper(props: Props) {
  // api call & data
  const fetchData = useStoreActions(
    (store) => store.GrantDetailDisbursementsTreemap.fetch
  );
  const data = useStoreState(
    (state) =>
      get(
        state.GrantDetailDisbursementsTreemap.data,
        "data",
        []
      ) as DisbursementsTreemapDataItem[]
  );
  const isLoading = useStoreState(
    (state) => state.GrantDetailDisbursementsTreemap.loading
  );

  React.useEffect(() => {
    if (props.code) {
      fetchData({ filterString: `grantId='${props.code}'` });
    }
  }, [props.code]);

  if (isLoading) {
    return <PageLoader />;
  }
  return <InvestmentsDisbursedModule data={data} />;
}
