/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface AppliedFiltersStateModel {
  locations: string[];
  setLocations: Action<AppliedFiltersStateModel, string[]>;
  components: string[];
  setComponents: Action<AppliedFiltersStateModel, string[]>;
  partnerTypes: string[];
  setPartnerTypes: Action<AppliedFiltersStateModel, string[]>;
  status: string[];
  setStatus: Action<AppliedFiltersStateModel, string[]>;
  replenishmentPeriods: string[];
  setReplenishmentPeriods: Action<AppliedFiltersStateModel, string[]>;
  donors: string[];
  setDonors: Action<AppliedFiltersStateModel, string[]>;
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
};
