import { action, Action } from "easy-peasy";

export const defaultAppliedFilters: AppliedFiltersModel = {
  locations: [] as string[],
  components: [] as string[],
  principalRecipientTypes: [] as string[],
  principalRecipientSubTypes: [] as string[],
  principalRecipients: [] as string[],
  status: [] as string[],
  documentTypes: [] as string[],
  replenishmentPeriods: [] as string[],
  donors: [] as string[],
  donorTypes: [] as string[],
  donorSubTypes: [] as string[],
  cycles: [] as string[],
  trpWindows: [] as string[],
  portfolioCategories: [] as string[],
};

export interface AppliedFiltersModel {
  locations: string[];
  components: string[];
  principalRecipientTypes: string[];
  principalRecipientSubTypes: string[];
  principalRecipients: string[];
  status: string[];
  documentTypes: string[];
  replenishmentPeriods: string[];
  donors: string[];
  donorTypes: string[];
  donorSubTypes: string[];
  cycles: string[];
  trpWindows: string[];
  portfolioCategories: string[];
}

export interface AppliedFiltersStateModel {
  locations: string[];
  setLocations: Action<AppliedFiltersStateModel, string[]>;
  components: string[];
  setComponents: Action<AppliedFiltersStateModel, string[]>;
  principalRecipientTypes: string[];
  setPrincipalRecipientTypes: Action<AppliedFiltersStateModel, string[]>;
  principalRecipientSubTypes: string[];
  setPrincipalRecipientSubTypes: Action<AppliedFiltersStateModel, string[]>;
  principalRecipients: string[];
  setPrincipalRecipients: Action<AppliedFiltersStateModel, string[]>;
  status: string[];
  setStatus: Action<AppliedFiltersStateModel, string[]>;
  documentTypes: string[];
  setDocumentTypes: Action<AppliedFiltersStateModel, string[]>;
  replenishmentPeriods: string[];
  setReplenishmentPeriods: Action<AppliedFiltersStateModel, string[]>;
  donors: string[];
  setDonors: Action<AppliedFiltersStateModel, string[]>;
  donorTypes: string[];
  setDonorTypes: Action<AppliedFiltersStateModel, string[]>;
  donorSubTypes: string[];
  setDonorSubTypes: Action<AppliedFiltersStateModel, string[]>;
  cycles: string[];
  setDonorCycles: Action<AppliedFiltersStateModel, string[]>;
  trpWindows: string[];
  setTrpWindows: Action<AppliedFiltersStateModel, string[]>;
  setPortfolioCategories: Action<AppliedFiltersStateModel, string[]>;
  portfolioCategories: string[];
  setAll: Action<AppliedFiltersStateModel, AppliedFiltersModel>;
  clearAll: Action<AppliedFiltersStateModel>;
  actionDefaultNone: Action<AppliedFiltersStateModel, string[]>;
  appliedFiltersCount: number;
  toggleFilter: Action<
    AppliedFiltersStateModel,
    {
      type: string;
      value: string;
      checked: boolean;
    }
  >;
  removeFilter: Action<
    AppliedFiltersStateModel,
    {
      value: string;
      types: string[];
    }
  >;
}
export interface AppliedFilterStringModel {
  state: string;
  setState: Action<AppliedFilterStringModel, string>;
}
export const AppliedFilterStringState: AppliedFilterStringModel = {
  state: "",
  setState: action((state, payload: string) => {
    state.state = payload;
  }),
};

export const TempAppliedFiltersState: AppliedFiltersStateModel = {
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
  principalRecipientTypes: [],
  setPrincipalRecipientTypes: action((state, payload: string[]) => {
    state.principalRecipientTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  principalRecipientSubTypes: [],
  setPrincipalRecipientSubTypes: action((state, payload: string[]) => {
    state.principalRecipientSubTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  principalRecipients: [],
  setPrincipalRecipients: action((state, payload: string[]) => {
    state.principalRecipients = payload;
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
  donorTypes: [],
  setDonorTypes: action((state, payload: string[]) => {
    state.donorTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  donorSubTypes: [],
  setDonorSubTypes: action((state, payload: string[]) => {
    state.donorSubTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  cycles: [],
  setDonorCycles: action((state, payload: string[]) => {
    state.cycles = payload;
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
  clearAll: action((state) => {
    state.locations = [];
    state.components = [];
    state.principalRecipientTypes = [];
    state.principalRecipientSubTypes = [];
    state.principalRecipients = [];
    state.status = [];
    state.documentTypes = [];
    state.replenishmentPeriods = [];
    state.donors = [];
    state.donorTypes = [];
    state.donorSubTypes = [];
    state.cycles = [];
    state.trpWindows = [];
    state.portfolioCategories = [];
    state.appliedFiltersCount = 0;
  }),
  setAll: action((state, payload: AppliedFiltersModel) => {
    state.locations = payload.locations;
    state.components = payload.components;
    state.principalRecipientTypes = payload.principalRecipientTypes;
    state.principalRecipientSubTypes = payload.principalRecipientSubTypes;
    state.principalRecipients = payload.principalRecipients;
    state.status = payload.status;
    state.replenishmentPeriods = payload.replenishmentPeriods;
    state.donors = payload.donors;
    state.donorTypes = payload.donorTypes;
    state.donorSubTypes = payload.donorSubTypes;
    state.cycles = payload.cycles;
    state.trpWindows = payload.trpWindows;
    state.portfolioCategories = payload.portfolioCategories;
    state.documentTypes = payload.documentTypes;
    state.appliedFiltersCount =
      payload.locations.length +
      payload.components.length +
      payload.principalRecipients.length +
      payload.principalRecipientSubTypes.length +
      payload.principalRecipientTypes.length +
      payload.status.length +
      payload.replenishmentPeriods.length +
      payload.donors.length +
      payload.donorTypes.length +
      payload.donorSubTypes.length +
      payload.trpWindows.length +
      payload.portfolioCategories.length +
      payload.documentTypes.length;
  }),
  actionDefaultNone: action(() => {
    console.log("Incorrect filter type");
  }),
  appliedFiltersCount: 0,
  toggleFilter: action((state, payload) => {
    switch (payload.type) {
      case "donor":
        if (payload.checked) {
          state.donors.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.donors = state.donors.filter((item) => item !== payload.value);
          state.appliedFiltersCount -= 1;
        }
        break;
      case "donorType":
        if (payload.checked) {
          state.donorTypes.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.donorTypes = state.donorTypes.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "replenishmentPeriod":
        if (payload.checked) {
          state.replenishmentPeriods.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.replenishmentPeriods = state.replenishmentPeriods.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "geography":
      case "geographyType":
      case "geographySubType":
        if (payload.checked) {
          state.locations.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.locations = state.locations.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "component":
        if (payload.checked) {
          state.components.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.components = state.components.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "principalRecipient":
        if (payload.checked) {
          state.principalRecipients.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.principalRecipients = state.principalRecipients.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "principalRecipientSubType":
        if (payload.checked) {
          state.principalRecipientSubTypes.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.principalRecipientSubTypes =
            state.principalRecipientSubTypes.filter(
              (item) => item !== payload.value,
            );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "principalRecipientType":
        if (payload.checked) {
          state.principalRecipientTypes.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.principalRecipientTypes = state.principalRecipientTypes.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "status":
        if (payload.checked) {
          state.status.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.status = state.status.filter((item) => item !== payload.value);
          state.appliedFiltersCount -= 1;
        }
        break;
      case "cycle":
        if (payload.checked) {
          state.cycles.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.cycles = state.cycles.filter((item) => item !== payload.value);
          state.appliedFiltersCount -= 1;
        }
        break;
      default:
        break;
    }
  }),
  removeFilter: action((state, payload) => {
    payload.types.forEach((type) => {
      switch (type) {
        case "donor":
          state.donors = state.donors.filter((item) => item !== payload.value);
          state.donorTypes = state.donorTypes.filter(
            (item) => item !== payload.value,
          );
          break;
        case "replenishmentPeriod":
          state.replenishmentPeriods = state.replenishmentPeriods.filter(
            (item) => item !== payload.value,
          );
          break;
        case "geography":
        case "geographyType":
        case "geographySubType":
          state.locations = state.locations.filter(
            (item) => item !== payload.value,
          );
          break;
        case "component":
          state.components = state.components.filter(
            (item) => item !== payload.value,
          );
          break;
        case "principalRecipient":
        case "principalRecipientSubType":
        case "principalRecipientType":
          state.principalRecipients = state.principalRecipients.filter(
            (item) => item !== payload.value,
          );
          state.principalRecipientSubTypes =
            state.principalRecipientSubTypes.filter(
              (item) => item !== payload.value,
            );
          state.principalRecipientTypes = state.principalRecipientTypes.filter(
            (item) => item !== payload.value,
          );
          break;
        case "status":
          state.status = state.status.filter((item) => item !== payload.value);
          break;
        case "cycle":
          state.cycles = state.cycles.filter((item) => item !== payload.value);
          break;
        default:
          break;
      }
      state.appliedFiltersCount -= 1;
    });
  }),
};

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
  principalRecipientTypes: [],
  setPrincipalRecipientTypes: action((state, payload: string[]) => {
    state.principalRecipientTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  principalRecipientSubTypes: [],
  setPrincipalRecipientSubTypes: action((state, payload: string[]) => {
    state.principalRecipientSubTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  principalRecipients: [],
  setPrincipalRecipients: action((state, payload: string[]) => {
    state.principalRecipients = payload;
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
  donorTypes: [],
  setDonorTypes: action((state, payload: string[]) => {
    state.donorTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  donorSubTypes: [],
  setDonorSubTypes: action((state, payload: string[]) => {
    state.donorSubTypes = payload;
    state.appliedFiltersCount += payload.length;
  }),
  cycles: [],
  setDonorCycles: action((state, payload: string[]) => {
    state.cycles = payload;
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
  clearAll: action((state) => {
    state.locations = [];
    state.components = [];
    state.principalRecipientTypes = [];
    state.principalRecipientSubTypes = [];
    state.principalRecipients = [];
    state.status = [];
    state.documentTypes = [];
    state.replenishmentPeriods = [];
    state.donors = [];
    state.donorTypes = [];
    state.donorSubTypes = [];
    state.cycles = [];
    state.trpWindows = [];
    state.portfolioCategories = [];
    state.appliedFiltersCount = 0;
  }),
  setAll: action((state, payload: AppliedFiltersModel) => {
    state.locations = payload.locations;
    state.components = payload.components;
    state.principalRecipientTypes = payload.principalRecipientTypes;
    state.principalRecipientSubTypes = payload.principalRecipientSubTypes;
    state.principalRecipients = payload.principalRecipients;
    state.status = payload.status;
    state.replenishmentPeriods = payload.replenishmentPeriods;
    state.donors = payload.donors;
    state.donorTypes = payload.donorTypes;
    state.donorSubTypes = payload.donorSubTypes;
    state.cycles = payload.cycles;
    state.trpWindows = payload.trpWindows;
    state.portfolioCategories = payload.portfolioCategories;
    state.documentTypes = payload.documentTypes;
    state.appliedFiltersCount =
      payload.locations.length +
      payload.components.length +
      payload.principalRecipients.length +
      payload.principalRecipientSubTypes.length +
      payload.principalRecipientTypes.length +
      payload.status.length +
      payload.replenishmentPeriods.length +
      payload.donors.length +
      payload.donorTypes.length +
      payload.donorSubTypes.length +
      payload.trpWindows.length +
      payload.portfolioCategories.length +
      payload.documentTypes.length;
  }),
  actionDefaultNone: action(() => {
    console.log("Incorrect filter type");
  }),
  appliedFiltersCount: 0,
  toggleFilter: action((state, payload) => {
    switch (payload.type) {
      case "donor":
        if (payload.checked) {
          state.donors.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.donors = state.donors.filter((item) => item !== payload.value);
          state.appliedFiltersCount -= 1;
        }
        break;
      case "donorType":
        if (payload.checked) {
          state.donorTypes.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.donorTypes = state.donorTypes.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "replenishmentPeriod":
        if (payload.checked) {
          state.replenishmentPeriods.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.replenishmentPeriods = state.replenishmentPeriods.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "geography":
      case "geographyType":
      case "geographySubType":
        if (payload.checked) {
          state.locations.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.locations = state.locations.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "component":
        if (payload.checked) {
          state.components.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.components = state.components.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "principalRecipient":
        if (payload.checked) {
          state.principalRecipients.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.principalRecipients = state.principalRecipients.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "principalRecipientSubType":
        if (payload.checked) {
          state.principalRecipientSubTypes.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.principalRecipientSubTypes =
            state.principalRecipientSubTypes.filter(
              (item) => item !== payload.value,
            );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "principalRecipientType":
        if (payload.checked) {
          state.principalRecipientTypes.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.principalRecipientTypes = state.principalRecipientTypes.filter(
            (item) => item !== payload.value,
          );
          state.appliedFiltersCount -= 1;
        }
        break;
      case "status":
        if (payload.checked) {
          state.status.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.status = state.status.filter((item) => item !== payload.value);
          state.appliedFiltersCount -= 1;
        }
        break;
      case "cycle":
        if (payload.checked) {
          state.cycles.push(payload.value);
          state.appliedFiltersCount += 1;
        } else {
          state.cycles = state.cycles.filter((item) => item !== payload.value);
          state.appliedFiltersCount -= 1;
        }
        break;
      default:
        break;
    }
  }),
  removeFilter: action((state, payload) => {
    payload.types.forEach((type) => {
      switch (type) {
        case "donor":
          state.donors = state.donors.filter((item) => item !== payload.value);
          state.donorTypes = state.donorTypes.filter(
            (item) => item !== payload.value,
          );
          break;
        case "replenishmentPeriod":
          state.replenishmentPeriods = state.replenishmentPeriods.filter(
            (item) => item !== payload.value,
          );
          break;
        case "geography":
        case "geographyType":
        case "geographySubType":
          state.locations = state.locations.filter(
            (item) => item !== payload.value,
          );
          break;
        case "component":
          state.components = state.components.filter(
            (item) => item !== payload.value,
          );
          break;
        case "principalRecipient":
        case "principalRecipientSubType":
        case "principalRecipientType":
          state.principalRecipients = state.principalRecipients.filter(
            (item) => item !== payload.value,
          );
          state.principalRecipientSubTypes =
            state.principalRecipientSubTypes.filter(
              (item) => item !== payload.value,
            );
          state.principalRecipientTypes = state.principalRecipientTypes.filter(
            (item) => item !== payload.value,
          );
          break;
        case "status":
          state.status = state.status.filter((item) => item !== payload.value);
          break;
        case "cycle":
          state.cycles = state.cycles.filter((item) => item !== payload.value);
          break;
        default:
          break;
      }
      state.appliedFiltersCount -= 1;
    });
  }),
};
