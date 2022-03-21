import get from "lodash/get";
import find from "lodash/find";
import { UseFilterOptionsReturn } from "app/hooks/useFilterOptions";
import {
  ChipModel,
  AppliedFiltersModel,
  FILTER_TYPES,
} from "app/components/PageHeader/components/filterbar/data";
import { FilterGroupOptionModel } from "app/components/ToolBoxPanel/components/filters/data";

export function getFilterGroupsChips(
  appliedFilters: AppliedFiltersModel,
  filterOptions: UseFilterOptionsReturn,
  cmsData: any
): ChipModel[] {
  const chips: ChipModel[] = [];

  const locationChip = getFilterGroupChip(
    appliedFilters.locations,
    filterOptions.Locations,
    FILTER_TYPES.LOCATIONS,
    get(cmsData, "componentsPageHeader.filterBarLocations", "")
  );
  if (locationChip.values.length > 0) {
    chips.push(locationChip);
  }

  const componentChip = getFilterGroupChip(
    appliedFilters.components,
    filterOptions.Components,
    FILTER_TYPES.COMPONENTS,
    get(cmsData, "componentsPageHeader.filterBarComponents", "")
  );
  if (componentChip.values.length > 0) {
    chips.push(componentChip);
  }

  const partnerChip = getFilterGroupChip(
    [
      ...appliedFilters.partners,
      ...appliedFilters.partnerTypes,
      ...appliedFilters.partnerSubTypes,
    ],
    filterOptions["Partner Types"],
    FILTER_TYPES.PARTNER_TYPES,
    get(cmsData, "componentsPageHeader.filterBarPartnerTypes", "")
  );
  if (partnerChip.values.length > 0) {
    chips.push(partnerChip);
  }

  const statusChip = getFilterGroupChip(
    appliedFilters.status,
    filterOptions["Grant Status"],
    FILTER_TYPES.GRANT_STATUS,
    get(cmsData, "componentsPageHeader.filterBarGrantStatus", "")
  );
  if (statusChip.values.length > 0) {
    chips.push(statusChip);
  }

  const replenishmentPeriodChip = getFilterGroupChip(
    appliedFilters.replenishmentPeriods,
    filterOptions["Replenishment Periods"],
    FILTER_TYPES.REPLENISHMENT_PERIODS,
    get(cmsData, "componentsPageHeader.filterBarReplenishmentPeriods", "")
  );
  if (replenishmentPeriodChip.values.length > 0) {
    chips.push(replenishmentPeriodChip);
  }

  const donorChip = getFilterGroupChip(
    [...appliedFilters.donors, ...appliedFilters.donorCategories],
    filterOptions.Donors,
    FILTER_TYPES.DONORS,
    "Donors"
  );
  if (donorChip.values.length > 0) {
    chips.push(donorChip);
  }

  return chips;
}

function getFilterGroupChip(
  filters: string[],
  options: FilterGroupOptionModel[],
  type: number,
  label: string
): ChipModel {
  const innerChips: { label: string; value: string }[] = [];
  const allOptions: { label: string; value: string }[] = [];
  options.forEach((option: FilterGroupOptionModel) => {
    allOptions.push({
      label: option.label,
      value: option.value,
    });
    if (option.subOptions) {
      option.subOptions.forEach((subOption: FilterGroupOptionModel) => {
        allOptions.push({
          label: subOption.label,
          value: subOption.value,
        });
        if (subOption.subOptions) {
          subOption.subOptions.forEach(
            (subSubOption: FilterGroupOptionModel) => {
              allOptions.push({
                label: subSubOption.label,
                value: subSubOption.value,
              });
            }
          );
        }
      });
    }
  });
  filters.forEach((location: string) => {
    innerChips.push({
      label: get(find(allOptions, { value: location }), "label", ""),
      value: location,
    });
  });
  return {
    label,
    type,
    values: innerChips,
  };
}
