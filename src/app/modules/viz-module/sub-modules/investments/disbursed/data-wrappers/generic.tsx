import React from "react";
import get from "lodash/get";
import { PageLoader } from "app/modules/common/page-loader";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code?: string;
}

export function GenericInvestmentsDisbursedWrapper(props: Props) {
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

  React.useEffect(() => {
    const params = props.code
      ? {
          filterString: `locations=${props.code}`,
        }
      : {};
    fetchData(params);
  }, [props.code]);

  if (isLoading) {
    return <PageLoader />;
  }
  return <InvestmentsDisbursedModule data={data} />;
}
