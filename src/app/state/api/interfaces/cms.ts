// COMPONENTS INTERFACES
export interface CMSApiComponentsAppBar {
  data: {
    about: string;
    datasets: string;
    logoAlt: string;
  };
}

export interface CMSApiComponentsChartsBudgets {
  data: {
    totalAmount: string;
    budget: string;
    flowLandscapeLevel1: string;
    flowLandscapeLevel2: string;
    flowCostCategory: string;
    flowTooltipComponent: string;
    flowTooltipDrilldown: string;
    timeCycleTooltipBudgets: string;
    treemapTooltipDefaultKeyLabel: string;
  };
}

export interface CMSApiComponentsChartsCommon {
  data: {
    noData: string;
    moreInfo: string;
    moreInfoLink: string;
    noMatchOops: string;
    noMatch404: string;
    noMatchSorry: string;
    noMatchBack: string;
  };
}

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

export interface CMSApiComponentsChartsGeomap {
  data: {
    goToDetail: string;
    locationDetail: string;
    tooltipTotal: string;
    tooltipComponent: string;
    tooltipSigned: string;
    tooltipDisbursed: string;
    tooltipCommitted: string;
    tooltipGrants: string;
    tooltipDefaultInvestment: string;
  };
}

export interface CMSApiComponentsChartsGrants {
  data: {
    grantsDetailPage: string;
    implementationPeriod: string;
    implementationEnd: string;
    implementationStart: string;
    note: string;
    circleSize: string;
    circleContent: string;
    circleMaxValue: string;
    latestRatingColor: string;
    grantStatus: string;
    active: string;
    closure: string;
    closed: string;
    tooltipNumber: string;
    tooltipPeriod: string;
    tooltipDisbursements: string;
    tooltipComponent: string;
    tooltipStatus: string;
    tooltipRating: string;
    tooltipRatingDefault: string;
  };
}

export interface CMSApiComponentsChartsInvestments {
  data: {
    drilldown: string;
    component: string;
    grants: string;
    disbursed: string;
    committed: string;
    signed: string;
    totalAmount: string;
  };
}

export interface CMSApiComponentsChartsNetwork {
  data: {
    achievementRate: string;
    notAvailable: string;
    notReported: string;
    performanceFramework: string;
  };
}

export interface CMSApiComponentsChartsPerformanceRating {
  data: {
    performanceRating: string;
  };
}

export interface CMSApiComponentsChartsPledges {
  data: {
    pledge: string;
    contribution: string;
    replenishmentPeriods: string;
    drilldown: string;
  };
}

export interface CMSApiComponentsCookieDialog {
  data: {
    title: string;
    message: string;
    accept: string;
    close: string;
  };
}

export interface CMSApiComponentsDatasetCarousel {
  data: {
    financePledgesContributions: string;
    financeSignedAmounts: string;
    financeCommitments: string;
    financeDisbursements: string;
    financeBudgets: string;
    accessEligibility: string;
    accessAllocations: string;
    grants: string;
    results: string;
    documents: string;
  };
}

export interface CMSApiComponentsInformationPanel {
  data: {
    defaultLabel: string;
  };
}

export interface CMSApiComponentsMobile {
  data: {
    appbarLabelHome: string;
    appbarLabelExplore: string;
    appbarLabelAbout: string;
  };
}

export interface CMSApiComponentsPageHeader {
  data: {
    filterBarGrantStatus: string;
    filterBarPartnerTypes: string;
    filterBarReplenishmentPeriods: string;
    filterBarLocations: string;
    filterBarComponents: string;
    fiilterBarGrantStatus: string;
    filterBarDonors: string;
    tabOverview: string;
    tabSigned: string;
    tabCommitment: string;
    tabDisbursement: string;
    tabBudgets: string;
    tabAllocation: string;
    tabEligibility: string;
    tabDocuments: string;
    tabGrants: string;
    tabResults: string;
    tabPerformanceRating: string;
    tabPerformanceFramework: string;
  };
}

export interface CMSApiComponentsPerformanceFrameworkComponents {
  data: {
    interventionTableInterventions: string;
    interventionTableAchievementRate: string;
    interventionTableValueText: string;
    resultsTableTooltip: string;
    resultsTableNotAvailable: string;
    resultsTableResultType: string;
    resultsTableBaseline: string;
    resultsTableTarget: string;
    resultsTableResult: string;
    resultsTableAchievementRate: string;
    resultsTableReportingPeriods: string;
    resultsTableEmpty: string;
    toolTipPeriod: string;
    toolTipIndicator: string;
    toolTipAggregationType: string;
    toolTipCoverage: string;
    toolTipBack: string;
    toolTipSeeDisaggregations: string;
    toolTipCategory: string;
    toolTipBaseline: string;
    toolTipReported: string;
  };
}

export interface CMSApiComponentsSearch {
  data: {
    placeholder: string;
    loading: string;
    noResults: string;
  };
}

export interface CMSApiComponentsSlideInPanel {
  data: {
    back: string;
  };
}

// MODULES INTERFACES
export interface CMSApiModulesLanding {
  data: {
    title: string;
    subTitle: string;
    datasetsTitle: string;
    datasetsLink: string;
  };
}

export interface CMSApiModulesAbout {
  data: {
    title: string;
    titleShort: string;
    breadCrumbHome: string;
    deTitle: string;
    deContent: string;
    gfTitle: string;
    gfContent: string;
    crTitle: string;
    crContent: string;
    diTitle: string;
    diContent: string;
    doTitle: string;
    doContent: string;
    linksResultMethodology: string;
    linksPrivacyStatements: string;
    linksLegalDisclaimers: string;
    linksFeedback: string;
    linksCovid: string;
    linksTitle: string;
  };
}

export interface CMSApiModulesCommon {
  data: {
    noMatchOops: string;
    noMatch404: string;
    noMatchSorry: string;
    noMatchBack: string;
  };
}

export interface CMSApiModulesCountryDetail {
  data: {
    seeResultsStart: string;
    seeResultsEnd: string;
    investments: string;
    disbursed: string;
    committed: string;
    signed: string;
    fundManager: string;
  };
}

export interface CMSApiModulesDatasets {
  data: {
    title: string;
    titleShort: string;
    home: string;
  };
}

export interface CMSApiModulesGrantDetail {
  data: {
    titleStart: string;
    titleEnd: string;
    titleShort: string;
    rating: string;
    disbursed: string;
    committed: string;
    signed: string;
    fundManager: string;
    latestRating: string;
    finance: string;
  };
}

export interface CMSApiModulesGrants {
  data: {
    titleStart: string;
    titleEnd: string;
    titleShort: string;
    home: string;
    datasets: string;
    grants: string;
    searchPlaceholder: string;
  };
}

// COUNTRY SUMMARY
export interface CMSApiCountrySummary {
  entries: {
    iso3: string;
    summary: string;
    summary_de: string | null;
    summary_fr: string | null;
  }[];
}

export interface CMSApiNotesAndDisclaimers {
  entries: {
    type: string;
    content: string;
    content_de: string | null;
    content_fr: string | null;
  }[];
}
