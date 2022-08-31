/* third-party */
import React from "react";
import get from "lodash/get";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

interface Props {
  code: string;
  toolboxOpen?: boolean;
  implementationPeriod: string;
  type: "Disbursed" | "Signed" | "Commitment";
}

export function GrantDetailInvestmentsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Grant Investments/Time cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.GrantDetailDisbursementsTimeCycle.fetch;
      case "Signed":
        return store.GrantDetailSignedTimeCycle.fetch;
      case "Commitment":
        return store.GrantDetailCommitmentTimeCycle.fetch;
      default:
        return store.GrantDetailDisbursementsTimeCycle.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.GrantDetailDisbursementsTimeCycle.data;
    switch (props.type) {
      case "Signed":
        compData = state.GrantDetailSignedTimeCycle.data;
        break;
      case "Commitment":
        compData = state.GrantDetailCommitmentTimeCycle.data;
        break;
      default:
        compData = state.GrantDetailDisbursementsTimeCycle.data;
    }
    return get(compData, "data", []) as Record<string, unknown>[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.GrantDetailDisbursementsTimeCycle.loading;
      case "Signed":
        return state.GrantDetailSignedTimeCycle.loading;
      case "Commitment":
        return state.GrantDetailCommitmentTimeCycle.loading;
      default:
        return state.GrantDetailDisbursementsTimeCycle.loading;
    }
  });

  React.useEffect(() => {
    if (props.code) {
      fetchData({
        filterString: `grantId='${props.code}'&IPnumber=${props.implementationPeriod}`,
      });
    }
  }, [props.code, props.implementationPeriod, props.type]);

  return (
    <InvestmentsTimeCycleModule
      data={data}
      isGrantDetail
      type={props.type}
      isDrilldownLoading={false}
      codeParam={props.code}
      drilldownData={[]}
      isLoading={isLoading}
      vizLevel={0}
      setVizLevel={setVizLevel}
      vizSelected={undefined}
      setVizSelected={setVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
