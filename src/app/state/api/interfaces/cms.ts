export interface CMSApiComponentsChartsEligibility {
  data: {
    statusEligible: string;
    statusNotEligible: string;
    statusTransitionFunding: string;
    eligibility: string;
    year: string;
    countryName: string;
    hiv: string;
    malaria: string;
    tuberculosis: string;
    diseaseBurdenExtreme: string;
    diseaseBurdenSevere: string;
    diseaseBurdenHigh: string;
    diseaseBurdenNotHigh: string;
    diseaseBurdenModerate: string;
    diseaseBurdenLow: string;
    diseaseBurdenNone: string;
    incomeLevelsNone: string;
    incomeLevelsLow: string;
    incomeLevelsLowerLower: string;
    incomeLevelsLowerMiddle: string;
    incomeLevelsUpperLower: string;
    incomeLevelsUpperMiddle: string;
    incomeLevelsHigh: string;
    scatterplotEligibility: string;
    scatterplotDiseaseBurden: string;
    scatterplotIncomeLevel: string;
    incomeLevel: string;
    diseaseBurden: string;
  };
}

export interface CMSApiComponentsSearch {
  data: {
    placeholder: string;
    loading: string;
    noResults: string;
  };
}

export interface CMSApiPagesDatasets {
  data: {};
}

export interface CMSApiPagesGeography {
  data: {};
}
export interface CMSApiPagesGrantDetail {
  data: {};
}

export interface CMSApiPagesGrants {
  data: {};
}

export interface CMSApiPagesHome {
  data: {};
}

export interface CMSApiPagesLocation {
  data: {};
}

export interface CMSApiGeneral {
  data: {
    million: string;
    billion: string;
  };
}

export interface CMSApiPagesDatatsetsAccessToFunding {
  data: {};
}

export interface CMSApiPagesDatatsetsGrantImplementation {
  data: {};
}

export interface CMSApiPagesDatatsetsAnnualResults {
  data: {};
}

export interface CMSApiPagesDatatsetsResourceMobilization {
  data: {};
}

export interface CMSApiPagesLocationAccessToFunding {
  data: {};
}

export interface CMSApiPagesLocationGrantImplementation {
  data: {};
}

export interface CMSApiPagesLocationOverview {
  data: {};
}

export interface CMSApiPagesLocationResourceMobilization {
  data: {};
}

export interface CMSApiPagesLocationResults {
  data: {};
}

export interface CMSApiPagesGrantDocuments {
  data: {};
}

export interface CMSApiPagesGrantGrantImplementation {
  data: {};
}

export interface CMSApiPagesGrantOverview {
  data: {};
}

export interface CMSApiPagesGrantTargetResults {
  data: {};
}

export interface CMSApiCountrySummary {
  data: {
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        totalPages: number;
        totalRecords: number;
      };
    };
    data: {
      id: string;
      type: string;
      attributes: {
        locale: string;
        title: string;
        description: string;
        content: string;
        image: string;
        url: string;
        createdAt: string;
        updatedAt: string;
      };
    }[];
  };
}
