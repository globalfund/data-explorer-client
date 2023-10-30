/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export const defaultAppliedFilters: AppliedFiltersModel = {
  locations: [] as string[],
  components: [] as string[],
  partnerTypes: [] as string[],
  partnerSubTypes: [] as string[],
  partners: [] as string[],
  status: [] as string[],
  documentTypes: [] as string[],
  replenishmentPeriods: [] as string[],
  donors: [] as string[],
  donorCategories: [] as string[],
  donorSubCategories: [] as string[],
  trpWindows: [] as string[],
  portfolioCategories: [] as string[],
  periods: [] as string[],
  modulesInterventions: [] as string[],
  investmentLandscapes: [] as string[],
};

export interface AppliedFiltersModel {
  locations: string[];
  components: string[];
  partnerTypes: string[];
  partnerSubTypes: string[];
  partners: string[];
  status: string[];
  documentTypes: string[];
  replenishmentPeriods: string[];
  donors: string[];
  donorCategories: string[];
  donorSubCategories: string[];
  trpWindows: string[];
  portfolioCategories: string[];
  periods: string[];
  modulesInterventions: string[];
  investmentLandscapes: string[];
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
  documentTypes: string[];
  setDocumentTypes: Action<AppliedFiltersStateModel, string[]>;
  replenishmentPeriods: string[];
  setReplenishmentPeriods: Action<AppliedFiltersStateModel, string[]>;
  donors: string[];
  setDonors: Action<AppliedFiltersStateModel, string[]>;
  donorCategories: string[];
  setDonorCategories: Action<AppliedFiltersStateModel, string[]>;
  donorSubCategories: string[];
  setDonorSubCategories: Action<AppliedFiltersStateModel, string[]>;
  trpWindows: string[];
  setTrpWindows: Action<AppliedFiltersStateModel, string[]>;
  setPortfolioCategories: Action<AppliedFiltersStateModel, string[]>;
  portfolioCategories: string[];
  setPeriods: Action<AppliedFiltersStateModel, string[]>;
  periods: string[];
  setModulesInterventions: Action<AppliedFiltersStateModel, string[]>;
  modulesInterventions: string[];
  setInvestmentLandscapes: Action<AppliedFiltersStateModel, string[]>;
  investmentLandscapes: string[];
  setAll: Action<AppliedFiltersStateModel, AppliedFiltersModel>;
  actionDefaultNone: Action<AppliedFiltersStateModel, string[]>;
  appliedFiltersCount: number;
}

export const AppliedFiltersState: AppliedFiltersStateModel = {
  locations: [],
  setLocations: action((state, payload: string[]) => {
    state.locations = payload;
    state.appliedFiltersCount += payload.length;
  }),
  components: [],
  setComponents: action((state, payload: string[]) => {
    state.components = payload;
    state.appliedFiltersCount += payload.length;
  }),
  partnerTypes: [],
  setPartnerTypes: action((state, payload: string[]) => {
    state.partnerTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  partnerSubTypes: [],
  setPartnerSubTypes: action((state, payload: string[]) => {
    state.partnerSubTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  partners: [],
  setPartners: action((state, payload: string[]) => {
    state.partners = payload;
    state.appliedFiltersCount += payload.length;
  }),
  status: [],
  setStatus: action((state, payload: string[]) => {
    state.status = payload;
    state.appliedFiltersCount += payload.length;
  }),
  documentTypes: [],
  setDocumentTypes: action((state, payload: string[]) => {
    state.documentTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  replenishmentPeriods: [],
  setReplenishmentPeriods: action((state, payload: string[]) => {
    state.replenishmentPeriods = payload;
    state.appliedFiltersCount += payload.length;
  }),
  donors: [],
  setDonors: action((state, payload: string[]) => {
    state.donors = payload;
    state.appliedFiltersCount += payload.length;
  }),
  donorCategories: [],
  setDonorCategories: action((state, payload: string[]) => {
    state.donorCategories = payload;
    state.appliedFiltersCount += payload.length;
  }),
  donorSubCategories: [],
  setDonorSubCategories: action((state, payload: string[]) => {
    state.donorSubCategories = payload;
    state.appliedFiltersCount += payload.length;
  }),
  trpWindows: [],
  setTrpWindows: action((state, payload: string[]) => {
    state.trpWindows = payload;
    state.appliedFiltersCount += payload.length;
  }),
  portfolioCategories: [],
  setPortfolioCategories: action((state, payload: string[]) => {
    state.portfolioCategories = payload;
    state.appliedFiltersCount += payload.length;
  }),
  periods: [],
  setPeriods: action((state, payload: string[]) => {
    state.periods = payload;
    state.appliedFiltersCount += payload.length;
  }),
  modulesInterventions: [],
  setModulesInterventions: action((state, payload: string[]) => {
    state.modulesInterventions = payload;
    state.appliedFiltersCount += payload.length;
  }),
  investmentLandscapes: [],
  setInvestmentLandscapes: action((state, payload: string[]) => {
    state.investmentLandscapes = payload;
    state.appliedFiltersCount += payload.length;
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
    state.donorSubCategories = payload.donorSubCategories;
    state.trpWindows = payload.trpWindows;
    state.portfolioCategories = payload.portfolioCategories;
    state.documentTypes = payload.documentTypes;
    state.periods = payload.periods;
    state.modulesInterventions = payload.modulesInterventions;
    state.investmentLandscapes = payload.investmentLandscapes;
    state.appliedFiltersCount =
      payload.locations.length +
      payload.components.length +
      payload.partnerTypes.length +
      payload.partnerSubTypes.length +
      payload.partners.length +
      payload.status.length +
      payload.replenishmentPeriods.length +
      payload.donors.length +
      payload.donorCategories.length +
      payload.donorSubCategories.length +
      payload.trpWindows.length +
      payload.portfolioCategories.length +
      payload.documentTypes.length +
      payload.periods.length +
      payload.modulesInterventions.length +
      payload.investmentLandscapes.length;
  }),
  actionDefaultNone: action((state, payload: string[]) => {
    console.log("Incorrect filter type");
  }),
  appliedFiltersCount: 0,
};
