import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";

export function getAPIFormattedFilters(
  appliedFilters: AppliedFiltersModel,
  extraParams?: {
    page?: number;
    search?: string;
  }
): string {
  const filterArray: string[] = [];

  if (extraParams) {
    if (extraParams.page) {
      filterArray.push(`page=${extraParams.page}`);
    }
    if (extraParams.search) {
      filterArray.push(`q=${extraParams.search}`);
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

  return filterArray.join("&");
}
