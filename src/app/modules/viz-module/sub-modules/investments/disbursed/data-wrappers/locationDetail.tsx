/* third-party */
import React from "react";
import get from "lodash/get";
import isEqual from "lodash/isEqual";
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

export function LocationDetailInvestmentsDisbursedWrapper(props: Props) {
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
        return store.LocationDetailDisbursementsTreemap.fetch;
      case "Signed":
        return store.LocationDetailSignedTreemap.fetch;
      case "Commitment":
        return store.LocationDetailCommitmentTreemap.fetch;
      default:
        return store.LocationDetailDisbursementsTreemap.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.LocationDetailDisbursementsTreemap.data;
    switch (props.type) {
      case "Signed":
        compData = state.LocationDetailSignedTreemap.data;
        break;
      case "Commitment":
        compData = state.LocationDetailCommitmentTreemap.data;
        break;
      default:
        compData = state.LocationDetailDisbursementsTreemap.data;
    }

    return get(compData, "data", []) as DisbursementsTreemapDataItem[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.LocationDetailDisbursementsTreemap.loading;
      case "Signed":
        return state.LocationDetailSignedTreemap.loading;
      case "Commitment":
        return state.LocationDetailCommitmentTreemap.loading;
      default:
        return state.LocationDetailDisbursementsTreemap.loading;
    }
  });

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters
    );
    fetchData({ filterString });
  }, [props.code, appliedFilters, props.type]);

  return (
    <InvestmentsDisbursedModule
      data={data}
      allowDrilldown
      isLocationDetail
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
