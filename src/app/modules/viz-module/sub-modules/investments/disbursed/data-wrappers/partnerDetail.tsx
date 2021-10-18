/* third-party */
import React from "react";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DisbursementsTreemapDataItem } from "app/components/Charts/Investments/Disbursements/data";
import { InvestmentsDisbursedModule } from "app/modules/viz-module/sub-modules/investments/disbursed";

interface Props {
  code: string;
  toolboxOpen?: boolean;
  type: "Disbursed" | "Signed" | "Commitment";
}

export function PartnerDetailInvestmentsDisbursedWrapper(props: Props) {
  const history = useHistory();
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizTranslation, setVizTranslation] = React.useState({ x: 0, y: 0 });
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.PartnerDetailDisbursementsTreemap.fetch;
      case "Signed":
        return store.PartnerDetailSignedTreemap.fetch;
      case "Commitment":
        return store.PartnerDetailCommitmentTreemap.fetch;
      default:
        return store.PartnerDetailDisbursementsTreemap.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.PartnerDetailDisbursementsTreemap.data;
    switch (props.type) {
      case "Signed":
        compData = state.PartnerDetailSignedTreemap.data;
        break;
      case "Commitment":
        compData = state.PartnerDetailCommitmentTreemap.data;
        break;
      default:
        compData = state.PartnerDetailDisbursementsTreemap.data;
    }
    return get(compData, "data", []) as DisbursementsTreemapDataItem[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.PartnerDetailDisbursementsTreemap.loading;
      case "Signed":
        return state.PartnerDetailSignedTreemap.loading;
      case "Commitment":
        return state.PartnerDetailCommitmentTreemap.loading;
      default:
        return state.PartnerDetailDisbursementsTreemap.loading;
    }
  });

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  function goToGrantDetail(code: string) {
    history.push(`/grant/${code}/1/overview`);
  }

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            partners: [...appliedFilters.partners, props.code],
          }
        : appliedFilters
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters, props.type]);

  return (
    <InvestmentsDisbursedModule
      data={data}
      type={props.type}
      drilldownData={[]}
      vizLevel={vizLevel}
      isLoading={isLoading}
      allowDrilldown={false}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      isDrilldownLoading={false}
      onNodeClick={goToGrantDetail}
      setVizSelected={setVizSelected}
      vizTranslation={vizTranslation}
      setVizTranslation={setVizTranslation}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
