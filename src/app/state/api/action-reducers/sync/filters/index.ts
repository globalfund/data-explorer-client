/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export const defaultAppliedFilters: AppliedFiltersModel = {
  locations: [] as string[],
  components: [] as string[],
  partnerTypes: [] as string[],
  partnerSubTypes: [] as string[],
  partners: [] as string[],
  status: [] as string[],
  replenishmentPeriods: [] as string[],
  donors: [] as string[],
  donorCategories: [] as string[],
};

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

export interface AppliedFiltersStateModel {
  locations: string[];
  setLocations: Action<AppliedFiltersStateModel, string[]>;
  components: string[];
  setComponents: Action<AppliedFiltersStateModel, string[]>;
  partnerTypes: string[];
  setPartnerTypes: Action<AppliedFiltersStateModel, string[]>;
  partnerSubTypes: string[];
  setPartnerSubTypes: Action<AppliedFiltersStateModel, string[]>;
  partners: string[];
  setPartners: Action<AppliedFiltersStateModel, string[]>;
  status: string[];
  setStatus: Action<AppliedFiltersStateModel, string[]>;
  replenishmentPeriods: string[];
  setReplenishmentPeriods: Action<AppliedFiltersStateModel, string[]>;
  donors: string[];
  setDonors: Action<AppliedFiltersStateModel, string[]>;
  donorCategories: string[];
  setDonorCategories: Action<AppliedFiltersStateModel, string[]>;
  setAll: Action<AppliedFiltersStateModel, AppliedFiltersModel>;
  actionDefaultNone: Action<AppliedFiltersStateModel, string[]>;
}

export const AppliedFiltersState: AppliedFiltersStateModel = {
  locations: [],
  setLocations: action((state, payload: string[]) => {
    state.locations = payload;
  }),
  components: [],
  setComponents: action((state, payload: string[]) => {
    state.components = payload;
  }),
  partnerTypes: [],
  setPartnerTypes: action((state, payload: string[]) => {
    state.partnerTypes = payload;
  }),
  partnerSubTypes: [],
  setPartnerSubTypes: action((state, payload: string[]) => {
    state.partnerSubTypes = payload;
  }),
  partners: [],
  setPartners: action((state, payload: string[]) => {
    state.partners = payload;
  }),
  status: [],
  setStatus: action((state, payload: string[]) => {
    state.status = payload;
  }),
  replenishmentPeriods: [],
  setReplenishmentPeriods: action((state, payload: string[]) => {
    state.replenishmentPeriods = payload;
  }),
  donors: [],
  setDonors: action((state, payload: string[]) => {
    state.donors = payload;
  }),
  donorCategories: [],
  setDonorCategories: action((state, payload: string[]) => {
    state.donorCategories = payload;
  }),
  setAll: action((state, payload: AppliedFiltersModel) => {
    state.locations = payload.locations;
    state.components = payload.components;
    state.partnerTypes = payload.partnerTypes;
    state.partnerSubTypes = payload.partnerSubTypes;
    state.partners = payload.partners;
    state.status = payload.status;
    state.replenishmentPeriods = payload.replenishmentPeriods;
    state.donors = payload.donors;
    state.donorCategories = payload.donorCategories;
  }),
  actionDefaultNone: action((state, payload: string[]) => {
    console.log("Incorrect filter type");
  }),
};
