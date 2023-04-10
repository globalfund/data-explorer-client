/* third-party */
import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
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
  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    dataPathSteps[dataPathSteps.length - 1]?.vizSelected?.filterStr
  );
  const [drilldownVizSelected, setDrilldownVizSelected] = React.useState<
    string | undefined
  >(dataPathSteps[dataPathSteps.length - 1]?.drilldownVizSelected?.filterStr);
  const [vizLevel, setVizLevel] = React.useState(0);

  React.useEffect(() => {
    const newVizSelected =
      dataPathSteps[dataPathSteps.length - 1]?.vizSelected?.filterStr;
    const newDrilldownVizSelected =
      dataPathSteps[dataPathSteps.length - 1]?.drilldownVizSelected?.filterStr;
    if (!isEqual(newVizSelected, vizSelected)) {
      setVizSelected(newVizSelected);
    }
    if (!isEqual(newDrilldownVizSelected, drilldownVizSelected)) {
      setDrilldownVizSelected(newDrilldownVizSelected);
    }
    if (newDrilldownVizSelected) {
      setVizLevel(2);
    } else if (newVizSelected) {
      setVizLevel(1);
    } else {
      setVizLevel(0);
    }
  }, [dataPathSteps]);

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
      allowDrilldown
      isPartnerDetail
      type={props.type}
      drilldownData={[]}
      vizLevel={vizLevel}
      isLoading={isLoading}
      codeParam={props.code}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      isDrilldownLoading={false}
      setVizSelected={setVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
