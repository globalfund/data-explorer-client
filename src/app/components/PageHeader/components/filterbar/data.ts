export enum FILTER_TYPES {
  LOCATIONS,
  COMPONENTS,
  PARTNER_TYPES,
  GRANT_STATUS,
  REPLENISHMENT_PERIODS,
  DONORS,
}

export interface ChipModel {
  label: string;
  values: { label: string; value: string }[];
  type: FILTER_TYPES;
}

export interface AppliedFiltersModel {
  locations: string[];
  components: string[];
  partnerTypes: string[];
  partnerSubTypes: string[];
  partners: string[];
  status: string[];
  replenishmentPeriods: string[];
  donors: string[];
  donorCategories: string[];
}
