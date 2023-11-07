import React from "react";
import { ActionCreator } from "easy-peasy";
import { useLocation } from "react-router-dom";
import { useStoreActions, useStoreState } from "app/state/store/hooks";

interface UseAppliedFiltersProps {
  type: string;
}

export function useAppliedFilters(props: UseAppliedFiltersProps): {
  setAppliedFilters: ActionCreator<string[]>;
  appliedFilters: string[];
  setAppliedFiltersChildren?: ActionCreator<string[]>;
  appliedFiltersChildren?: string[];
  setAppliedFiltersGrandChildren?: ActionCreator<string[]>;
  appliedFiltersGrandChildren?: string[];
} {
  const location = useLocation();
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
    case "Partner Types":
      return {
        setAppliedFilters: actions.setPartnerTypes,
        appliedFilters: data.partnerTypes,
        setAppliedFiltersChildren: actions.setPartnerSubTypes,
        appliedFiltersChildren: data.partnerSubTypes,
        setAppliedFiltersGrandChildren: actions.setPartners,
        appliedFiltersGrandChildren: data.partners,
      };
    case "Grant Status":
      return {
        setAppliedFilters: actions.setStatus,
        appliedFilters: data.status,
      };
    case "Document Types":
      return {
        setAppliedFilters: actions.setDocumentTypes,
        appliedFilters: data.documentTypes,
      };
    case "Replenishment Periods":
      return {
        setAppliedFilters: actions.setReplenishmentPeriods,
        appliedFilters: data.replenishmentPeriods,
      };
    case "Donors":
      if (
        location.pathname === "/viz/pledges-contributions/time-cycle" ||
        location.pathname === "/viz/pledges-contributions/treemap"
      ) {
        return {
          setAppliedFilters: actions.setDonorCategories,
          appliedFilters: data.donorCategories,
          setAppliedFiltersChildren: actions.setDonorSubCategories,
          appliedFiltersChildren: data.donorSubCategories,
          setAppliedFiltersGrandChildren: actions.setDonors,
          appliedFiltersGrandChildren: data.donors,
        };
      }
      return {
        setAppliedFilters: actions.setDonors,
        appliedFilters: data.donors,
      };
    case "TRP Window":
      return {
        setAppliedFilters: actions.setTrpWindows,
        appliedFilters: data.trpWindows,
      };
    case "Portfolio Categorization":
      return {
        setAppliedFilters: actions.setPortfolioCategories,
        appliedFilters: data.portfolioCategories,
      };
    case "Years":
      return {
        setAppliedFilters: actions.setPeriods,
        appliedFilters: data.periods,
      };
    case "Grant Cycle":
      return {
        setAppliedFilters: actions.setGrantCycles,
        appliedFilters: data.grantCycles,
      };
    case "Investment Landscapes":
      return {
        setAppliedFilters: actions.setInvestmentLandscapesLevel0,
        appliedFilters: data.investmentLandscapesLevel0,
        setAppliedFiltersChildren: actions.setInvestmentLandscapesLevel1,
        appliedFiltersChildren: data.investmentLandscapesLevel1,
        setAppliedFiltersGrandChildren: actions.setInvestmentLandscapesLevel2,
        appliedFiltersGrandChildren: data.investmentLandscapesLevel2,
      };
    case "Modules & Interventions":
      return {
        setAppliedFilters: actions.setModulesInterventionsLevel0,
        appliedFilters: data.modulesInterventionsLevel0,
        setAppliedFiltersChildren: actions.setModulesInterventionsLevel1,
        appliedFiltersChildren: data.modulesInterventionsLevel1,
      };
    case "All":
      return {
        setAppliedFilters: actions.setLocations,
        appliedFilters: [
          ...data.locations,
          ...data.components,
          ...data.partnerTypes,
          ...data.partnerSubTypes,
          ...data.partners,
          ...data.status,
          ...data.donors,
          ...data.replenishmentPeriods,
          ...data.trpWindows,
          ...data.portfolioCategories,
          ...data.periods,
        ],
      };
    default:
      return {
        setAppliedFilters: actions.actionDefaultNone,
        appliedFilters: [],
      };
  }
}
