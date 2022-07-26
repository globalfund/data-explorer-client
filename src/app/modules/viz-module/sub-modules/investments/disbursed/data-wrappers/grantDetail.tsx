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
  toolboxOpen?: boolean;
  implementationPeriod: string;
  type: "Disbursed" | "Signed" | "Commitment";
}

export function GrantDetailInvestmentsDisbursedWrapper(props: Props) {
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.GrantDetailDisbursementsTreemap.fetch;
      case "Signed":
        return store.GrantDetailSignedTreemap.fetch;
      case "Commitment":
        return store.GrantDetailCommitmentTreemap.fetch;
      default:
        return store.GrantDetailDisbursementsTreemap.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.GrantDetailDisbursementsTreemap.data;
    switch (props.type) {
      case "Signed":
        compData = state.GrantDetailSignedTreemap.data;
        break;
      case "Commitment":
        compData = state.GrantDetailCommitmentTreemap.data;
        break;
      default:
        compData = state.GrantDetailDisbursementsTreemap.data;
    }
    return get(compData, "data", []) as DisbursementsTreemapDataItem[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.GrantDetailDisbursementsTreemap.loading;
      case "Signed":
        return state.GrantDetailSignedTreemap.loading;
      case "Commitment":
        return state.GrantDetailCommitmentTreemap.loading;
      default:
        return state.GrantDetailDisbursementsTreemap.loading;
    }
  });

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod, props.type]);

  if (isLoading) {
    return <PageLoader />;
  }
  return (
    <InvestmentsDisbursedModule
      data={data}
      vizLevel={0}
      isGrantDetail
      type={props.type}
      drilldownData={[]}
      isLoading={isLoading}
      allowDrilldown={false}
      vizSelected={undefined}
      setVizLevel={setVizLevel}
      isDrilldownLoading={false}
      setVizSelected={setVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
