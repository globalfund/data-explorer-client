/* third-party */
import React from "react";
import get from "lodash/get";
import { useUpdateEffect } from "react-use";
import useTitle from "react-use/lib/useTitle";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { BudgetsTreemapDataItem } from "app/components/Charts/Budgets/Treemap/data";
import { InvestmentsTimeCycleModule } from "app/modules/viz-module/sub-modules/investments/time-cycle";

interface Props {
  code?: string;
  toolboxOpen?: boolean;
  type: "Disbursed" | "Signed" | "Commitment";
}

export function PartnerDetailInvestmentsTimeCycleWrapper(props: Props) {
  useTitle("The Data Explorer - Investments/Time cycle");
  const [vizLevel, setVizLevel] = React.useState(0);
  const [vizSelected, setVizSelected] = React.useState<string | undefined>(
    undefined
  );

  // api call & data
  const fetchData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTimeCycle.fetch;
      case "Signed":
        return store.SignedTimeCycle.fetch;
      case "Commitment":
        return store.CommitmentTimeCycle.fetch;
      default:
        return store.DisbursementsTimeCycle.fetch;
    }
  });
  const data = useStoreState((state) => {
    let compData = state.DisbursementsTimeCycle.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTimeCycle.data;
        break;
      case "Commitment":
        compData = state.CommitmentTimeCycle.data;
        break;
      default:
        compData = state.DisbursementsTimeCycle.data;
    }
    return get(compData, "data", []) as Record<string, unknown>[];
  });
  const isLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTimeCycle.loading;
      case "Signed":
        return state.SignedTimeCycle.loading;
      case "Commitment":
        return state.CommitmentTimeCycle.loading;
      default:
        return state.DisbursementsTimeCycle.loading;
    }
  });
  const fetchDrilldownData = useStoreActions((store) => {
    switch (props.type) {
      case "Disbursed":
        return store.DisbursementsTimeCycleDrilldown.fetch;
      case "Signed":
        return store.SignedTimeCycleDrilldown.fetch;
      case "Commitment":
        return store.CommitmentTimeCycleDrilldown.fetch;
      default:
        return store.DisbursementsTimeCycleDrilldown.fetch;
    }
  });
  const drilldownData = useStoreState((state) => {
    let compData = state.DisbursementsTimeCycleDrilldown.data;
    switch (props.type) {
      case "Signed":
        compData = state.SignedTimeCycleDrilldown.data;
        break;
      case "Commitment":
        compData = state.CommitmentTimeCycleDrilldown.data;
        break;
      default:
        compData = state.DisbursementsTimeCycleDrilldown.data;
    }
    return get(compData, "data", []) as BudgetsTreemapDataItem[];
  });
  const isDrilldownLoading = useStoreState((state) => {
    switch (props.type) {
      case "Disbursed":
        return state.DisbursementsTimeCycleDrilldown.loading;
      case "Signed":
        return state.SignedTimeCycleDrilldown.loading;
      case "Commitment":
        return state.CommitmentTimeCycleDrilldown.loading;
      default:
        return state.DisbursementsTimeCycleDrilldown.loading;
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

  useUpdateEffect(() => {
    if (vizSelected) {
      let filterString = getAPIFormattedFilters(
        props.code
          ? {
              ...appliedFilters,
              partners: [...appliedFilters.partners, props.code],
            }
          : appliedFilters
      );
      if (filterString) {
        filterString += `&barPeriod=${vizSelected}`;
      } else {
        filterString = `barPeriod=${vizSelected}`;
      }
      fetchDrilldownData({ filterString });
    }
  }, [vizSelected]);

  return (
    <InvestmentsTimeCycleModule
      data={data}
      isPartnerDetail
      type={props.type}
      isDrilldownLoading={isDrilldownLoading}
      codeParam={props.code}
      drilldownData={drilldownData}
      isLoading={isLoading}
      vizLevel={vizLevel}
      setVizLevel={setVizLevel}
      vizSelected={vizSelected}
      setVizSelected={setVizSelected}
      toolboxOpen={props.toolboxOpen}
    />
  );
}
