import React from "react";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface UseAppliedFiltersProps {
  type: string;
}

export function useAppliedFilters(props: UseAppliedFiltersProps) {
  const actions = useStoreActions((store) => store.AppliedFiltersState);
  const data = useStoreState((state) => state.AppliedFiltersState);

  switch (props.type) {
    case "Locations":
      return {
        setAppliedFilters: actions.setLocations,
        appliedFilters: data.locations,
      };
    case "Components":
      return {
        setAppliedFilters: actions.setComponents,
        appliedFilters: data.components,
      };
    case "Partners":
      return {
        setAppliedFilters: actions.setPartnerTypes,
        appliedFilters: data.partnerTypes,
      };
    case "Grant Status":
      return {
        setAppliedFilters: actions.setStatus,
        appliedFilters: data.status,
      };
    case "Replenishment Periods":
      return {
        setAppliedFilters: actions.setReplenishmentPeriods,
        appliedFilters: data.replenishmentPeriods,
      };
    case "Donors":
      return {
        setAppliedFilters: actions.setDonors,
        appliedFilters: data.donors,
      };
    default:
      return {
        setAppliedFilters: () => console.log("Incorrect filter type"),
        appliedFilters: [],
      };
  }
}
