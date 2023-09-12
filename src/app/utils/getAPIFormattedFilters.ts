import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";

export function getAPIFormattedFilters(
  appliedFilters: AppliedFiltersModel,
  extraParams?: {
    page?: number;
    search?: string;
    sortBy?: string;
    orderBy?: string;
    rowsPerPage?: number;
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
    if (extraParams.sortBy && extraParams.sortBy.length > 0) {
      filterArray.push(`sortBy=${extraParams.sortBy}`);
    }
    if (extraParams.orderBy && extraParams.orderBy.length > 0) {
      filterArray.push(`orderBy=${extraParams.orderBy}`);
    }
    if (extraParams.rowsPerPage && extraParams.rowsPerPage > 0) {
      filterArray.push(`pageSize=${extraParams.rowsPerPage}`);
    }
  }

  if (appliedFilters.periods.length > 0) {
    filterArray.push(`periods=${appliedFilters.periods.join(",")}`);
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
  if (appliedFilters.documentTypes.length > 0) {
    filterArray.push(`documentTypes=${appliedFilters.documentTypes.join(",")}`);
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
  if (appliedFilters.trpWindows.length > 0) {
    filterArray.push(`trpWindows=${appliedFilters.trpWindows.join(",")}`);
  }
  if (appliedFilters.portfolioCategories.length > 0) {
    filterArray.push(
      `portfolioCategories=${appliedFilters.portfolioCategories.join(",")}`
    );
  }

  return filterArray.join("&");
}
