import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";

export function getAPIFormattedFilters(
  appliedFilters: AppliedFiltersModel,
  extraParams?: {
    page?: number;
    search?: string;
    datasource?: string;
  }
): string {
  const filterArray: string[] = [];

  if (extraParams) {
    if (extraParams.page) {
      filterArray.push(`page=${extraParams.page}`);
    }
    if (extraParams.search && extraParams.search.length > 0) {
      filterArray.push(`q=${extraParams.search}`);
    }
    if (extraParams.datasource) {
      filterArray.push(`datasource=${extraParams.datasource}`);
    }
  }

  if (appliedFilters.locations.length > 0) {
    filterArray.push(`locations=${appliedFilters.locations.join(",")}`);
  }
  if (appliedFilters.components.length > 0) {
    filterArray.push(`components=${appliedFilters.components.join(",")}`);
  }
  if (appliedFilters.status.length > 0) {
    filterArray.push(`status=${appliedFilters.status.join(",")}`);
  }
  if (appliedFilters.partnerTypes.length > 0) {
    filterArray.push(`partnerTypes=${appliedFilters.partnerTypes.join(",")}`);
  }
  if (appliedFilters.partnerSubTypes.length > 0) {
    filterArray.push(
      `partnerSubTypes=${appliedFilters.partnerSubTypes.join(",")}`
    );
  }
  if (appliedFilters.partners.length > 0) {
    filterArray.push(`partners=${appliedFilters.partners.join(",")}`);
  }
  if (
    appliedFilters.donors.length > 0 ||
    appliedFilters.donorSubCategories.length > 0
  ) {
    filterArray.push(
      `donors=${[
        ...appliedFilters.donors,
        ...appliedFilters.donorSubCategories,
      ].join(",")}`
    );
  }
  if (appliedFilters.donorSubCategories.length > 0) {
    filterArray.push(
      `donorSubCategories=${appliedFilters.donorSubCategories.join(",")}`
    );
  }
  if (appliedFilters.donorCategories.length > 0) {
    filterArray.push(
      `donorCategories=${appliedFilters.donorCategories.join(",")}`
    );
  }
  if (appliedFilters.replenishmentPeriods.length > 0) {
    filterArray.push(
      `periods=${appliedFilters.replenishmentPeriods.join(",")}`
    );
  }

  return filterArray.join("&");
}
