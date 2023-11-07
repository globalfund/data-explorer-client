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
  grantCycles: [] as string[],
  modulesInterventionsLevel0: [] as string[],
  modulesInterventionsLevel1: [] as string[],
  investmentLandscapesLevel0: [] as string[],
  investmentLandscapesLevel1: [] as string[],
  investmentLandscapesLevel2: [] as string[],
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
  grantCycles: string[];
  modulesInterventionsLevel0: string[];
  modulesInterventionsLevel1: string[];
  investmentLandscapesLevel0: string[];
  investmentLandscapesLevel1: string[];
  investmentLandscapesLevel2: string[];
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
  setGrantCycles: Action<AppliedFiltersStateModel, string[]>;
  grantCycles: string[];
  setModulesInterventionsLevel0: Action<AppliedFiltersStateModel, string[]>;
  modulesInterventionsLevel0: string[];
  setModulesInterventionsLevel1: Action<AppliedFiltersStateModel, string[]>;
  modulesInterventionsLevel1: string[];
  setInvestmentLandscapesLevel0: Action<AppliedFiltersStateModel, string[]>;
  investmentLandscapesLevel0: string[];
  setInvestmentLandscapesLevel1: Action<AppliedFiltersStateModel, string[]>;
  investmentLandscapesLevel1: string[];
  setInvestmentLandscapesLevel2: Action<AppliedFiltersStateModel, string[]>;
  investmentLandscapesLevel2: string[];
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
  grantCycles: [],
  setGrantCycles: action((state, payload: string[]) => {
    state.grantCycles = payload;
    state.appliedFiltersCount += payload.length;
  }),
  modulesInterventionsLevel0: [],
  setModulesInterventionsLevel0: action((state, payload: string[]) => {
    state.modulesInterventionsLevel0 = payload;
    state.appliedFiltersCount += payload.length;
  }),
  modulesInterventionsLevel1: [],
  setModulesInterventionsLevel1: action((state, payload: string[]) => {
    state.modulesInterventionsLevel1 = payload;
    state.appliedFiltersCount += payload.length;
  }),
  investmentLandscapesLevel0: [],
  setInvestmentLandscapesLevel0: action((state, payload: string[]) => {
    state.investmentLandscapesLevel0 = payload;
    state.appliedFiltersCount += payload.length;
  }),
  investmentLandscapesLevel1: [],
  setInvestmentLandscapesLevel1: action((state, payload: string[]) => {
    state.investmentLandscapesLevel1 = payload;
    state.appliedFiltersCount += payload.length;
  }),
  investmentLandscapesLevel2: [],
  setInvestmentLandscapesLevel2: action((state, payload: string[]) => {
    state.investmentLandscapesLevel2 = payload;
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
    state.modulesInterventionsLevel0 = payload.modulesInterventionsLevel0;
    state.modulesInterventionsLevel1 = payload.modulesInterventionsLevel1;
    state.investmentLandscapesLevel0 = payload.investmentLandscapesLevel0;
    state.investmentLandscapesLevel1 = payload.investmentLandscapesLevel1;
    state.investmentLandscapesLevel2 = payload.investmentLandscapesLevel2;
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
      payload.grantCycles.length +
      payload.modulesInterventionsLevel0.length +
      payload.modulesInterventionsLevel1.length +
      payload.investmentLandscapesLevel0.length +
      payload.investmentLandscapesLevel1.length +
      payload.investmentLandscapesLevel2.length;
  }),
  actionDefaultNone: action((state, payload: string[]) => {
    console.log("Incorrect filter type");
  }),
  appliedFiltersCount: 0,
};
