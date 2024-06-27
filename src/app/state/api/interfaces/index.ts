import { Action, Thunk } from "easy-peasy";
import { CMSDataModel } from "app/state/api/action-reducers/sync";
import { AppliedFiltersStateModel } from "app/state/api/action-reducers/sync/filters";
import {
  CMSApiComponentsAppBar,
  CMSApiComponentsChartsBudgets,
  CMSApiComponentsChartsCommon,
  CMSApiComponentsChartsEligibility,
  CMSApiComponentsChartsGeomap,
  CMSApiComponentsChartsGrants,
  CMSApiComponentsChartsInvestments,
  CMSApiComponentsChartsNetwork,
  CMSApiComponentsChartsPerformanceRating,
  CMSApiComponentsChartsPledges,
  CMSApiComponentsCookieDialog,
  CMSApiComponentsDatasetCarousel,
  CMSApiComponentsInformationPanel,
  CMSApiComponentsMobile,
  CMSApiComponentsPageHeader,
  CMSApiComponentsPerformanceFrameworkComponents,
  CMSApiComponentsSearch,
  CMSApiComponentsSlideInPanel,
  CMSApiModulesLanding,
  CMSApiModulesAbout,
  CMSApiModulesCommon,
  CMSApiModulesCountryDetail,
  CMSApiModulesDatasets,
  CMSApiModulesGrantDetail,
  CMSApiModulesGrants,
  CMSApiCountrySummary,
  CMSApiNotesAndDisclaimers,
  CMSApiModulesFundingRequests,
  CMSApiPagesDatasets,
  CMSApiPagesGeography,
  CMSApiPagesGrantDetail,
  CMSApiPagesGrants,
  CMSApiPagesHome,
  CMSApiPagesLocation,
  CMSApiGeneral,
  CMSApiPagesDatatsetsAccessToFunding,
  CMSApiPagesDatatsetsAnnualResults,
  CMSApiPagesDatatsetsGrantImplementation,
  CMSApiPagesDatatsetsResourceMobilization,
  CMSApiPagesLocationAccessToFunding,
  CMSApiPagesLocationGrantImplementation,
  CMSApiPagesLocationOverview,
  CMSApiPagesLocationResults,
  CMSApiPagesLocationResourceMobilization,
  CMSApiPagesGrantDocuments,
  CMSApiPagesGrantGrantImplementation,
  CMSApiPagesGrantOverview,
  CMSApiPagesGrantTargetResults,
} from "app/state/api/interfaces/cms";

export interface RequestValues<T> {
  values?: T;
  addOnData?: boolean;
  isCMSfetch?: boolean;
  filterString?: string;
  routeParams?: {
    [key: string]: string;
  };
}

export interface ResponseData<T> {
  data: any[];
  count: number;
  addOnData?: boolean;
}

export interface Errors {
  status: number | null;
  statusText: string | null;
  result: object | null;
}

export interface ApiModel<QueryModel, ResponseModel> {
  loading: boolean;
  success: boolean;
  data: ResponseData<ResponseModel> | null | ResponseData<ResponseModel>[];
  setData: Action<ApiModel<QueryModel, ResponseModel>, any>;
  errorData: Errors | null;
  onError: Action<ApiModel<QueryModel, ResponseModel>, Errors>;
  setSuccess: Action<ApiModel<QueryModel, ResponseModel>>;
  onSuccess: Action<
    ApiModel<QueryModel, ResponseModel>,
    ResponseData<ResponseModel> | ResponseData<ResponseModel>[]
  >;
  onRequest: Action<ApiModel<QueryModel, ResponseModel>>;
  fetch: Thunk<ApiModel<QueryModel, ResponseModel>, RequestValues<QueryModel>>;
  clear: Action<ApiModel<QueryModel, ResponseModel>>;
  post: Thunk<ApiModel<QueryModel, ResponseModel>, RequestValues<QueryModel>>;
}

export interface ApiCallParams {}

export interface ApiResponseModel {
  data: any[];
  count: number;
}

export type ApiCallModel = ApiModel<
  ApiCallParams | ApiCallParams[] | string,
  ApiResponseModel
>;

// CMS API Call model for
export type CMSApiCallModel = ApiModel<
  CMSApiCallParams,
  | CMSApiComponentsAppBar
  | CMSApiComponentsChartsBudgets
  | CMSApiComponentsChartsCommon
  | CMSApiComponentsChartsEligibility
  | CMSApiComponentsChartsGeomap
  | CMSApiComponentsChartsGrants
  | CMSApiComponentsChartsInvestments
  | CMSApiComponentsChartsNetwork
  | CMSApiComponentsChartsPerformanceRating
  | CMSApiComponentsChartsPledges
  | CMSApiComponentsCookieDialog
  | CMSApiComponentsDatasetCarousel
  | CMSApiComponentsInformationPanel
  | CMSApiComponentsMobile
  | CMSApiComponentsPageHeader
  | CMSApiComponentsPerformanceFrameworkComponents
  | CMSApiComponentsSearch
  | CMSApiComponentsSlideInPanel
  | CMSApiModulesLanding
  | CMSApiModulesAbout
  | CMSApiModulesCommon
  | CMSApiModulesCountryDetail
  | CMSApiModulesDatasets
  | CMSApiModulesGrantDetail
  | CMSApiModulesGrants
  | CMSApiCountrySummary
  | CMSApiNotesAndDisclaimers
  | CMSApiModulesFundingRequests
  | CMSApiPagesDatasets
  | CMSApiPagesGeography
  | CMSApiPagesGrantDetail
  | CMSApiPagesGrants
  | CMSApiPagesHome
  | CMSApiPagesLocation
  | CMSApiGeneral
  | CMSApiPagesDatatsetsAccessToFunding
  | CMSApiPagesDatatsetsAnnualResults
  | CMSApiPagesDatatsetsGrantImplementation
  | CMSApiPagesDatatsetsResourceMobilization
  | CMSApiPagesLocationAccessToFunding
  | CMSApiPagesLocationGrantImplementation
  | CMSApiPagesLocationOverview
  | CMSApiPagesLocationResults
  | CMSApiPagesLocationResourceMobilization
  | CMSApiPagesGrantDocuments
  | CMSApiPagesGrantGrantImplementation
  | CMSApiPagesGrantOverview
  | CMSApiPagesGrantTargetResults
>;

export interface CMSApiCallParams {}

export interface StoreModel {
  // homepage
  HomeResultsStats: ApiCallModel;
  HomePledgesContributionsBarChart: ApiCallModel;
  HomeAllocationsRadialChart: ApiCallModel;
  HomeBudgetsTreemap: ApiCallModel;
  HomeDisbursementsLineChart: ApiCallModel;
  HomeExpendituresHeatmap: ApiCallModel;
  // resource mobilization
  ResourceMobilizationStats: ApiCallModel;
  ResourceMobilizationExpandableBarChart: ApiCallModel;
  ResourceMobilizationSunburst: ApiCallModel;
  ResourceMobilizationTable: ApiCallModel;
  // geographies
  GeographyList: ApiCallModel;
  // access to funding
  AccessToFundingStats: ApiCallModel;
  AccessToFundingEligibilityTable: ApiCallModel;
  AccessToFundingAllocationBarSeries: ApiCallModel;
  AccessToFundingAllocationSunburst: ApiCallModel;
  AccessToFundingAllocationTreemap: ApiCallModel;
  AccessToFundingAllocationTable: ApiCallModel;
  AccessToFundingFundingRequestsTable: ApiCallModel;
  // financial insights
  FinancialInsightsStats: ApiCallModel;
  FinancialInsightsDisbursementsBarChart: ApiCallModel;
  FinancialInsightsDisbursementsLineChart: ApiCallModel;
  FinancialInsightsDisbursementsTable: ApiCallModel;
  FinancialInsightsBudgetBreakdown: ApiCallModel;
  FinancialInsightsBudgetUtilisation: ApiCallModel;
  FinancialInsightsCountryAbsorption: ApiCallModel;
  FinancialInsightsDisbursementUtilisation: ApiCallModel;
  FinancialInsightsBudgetSankey: ApiCallModel;
  FinancialInsightsBudgetTreemap: ApiCallModel;
  FinancialInsightsBudgetTable: ApiCallModel;
  FinancialInsightsExpendituresHeatmap: ApiCallModel;
  FinancialInsightsExpendituresBarChart: ApiCallModel;
  FinancialInsightsExpendituresTable: ApiCallModel;
  // annual results
  AnnualResultsStats: ApiCallModel;
  AnnualResultsPolyline: ApiCallModel;
  AnnualResultsTable: ApiCallModel;
  // grants
  GrantList: ApiCallModel;
  // location
  GeographyOverview: ApiCallModel;
  GeographyOverviewCoordinatingMechanismsContacts: ApiCallModel;
  GeographyResourceMobilizationBarChart: ApiCallModel;
  GeographyAllocationsRadialChart: ApiCallModel;
  GeographyFundingRequestsTable: ApiCallModel;
  GeographyEligibilityHeatmap: ApiCallModel;
  GeographyEligibilityTable: ApiCallModel;
  GeographyDocumentsTable: ApiCallModel;
  GeographyDisbursementsLineChart: ApiCallModel;
  GeographyBudgetSankeyChart: ApiCallModel;
  GeographyExpendituresHeatmap: ApiCallModel;
  GeographyGrantsPieCharts: ApiCallModel;
  GeographyGrantsTable: ApiCallModel;
  GeographyResultStats: ApiCallModel;
  GeographyResultsTable: ApiCallModel;
  GeographyResultsDocumentsTable: ApiCallModel;
  GeographyAllocationsCycles: ApiCallModel;
  GeographyFundingRequestsCycles: ApiCallModel;
  GeographyAnnualResultsCycles: ApiCallModel;
  GeographyBudgetsCycles: ApiCallModel;
  GeographyPledgesContributionsCycles: ApiCallModel;
  GeographyDisbursementsCycles: ApiCallModel;
  GeographyExpendituresCycles: ApiCallModel;
  GeographyEligibilityCycles: ApiCallModel;
  // grant
  GrantInfo: ApiCallModel;
  GrantOverview: ApiCallModel;
  GrantDisbursementsBarChart: ApiCallModel;
  GrantBudgetSankeyChart: ApiCallModel;
  GrantExpendituresHeatmap: ApiCallModel;
  GrantTargetsResultsTable: ApiCallModel;
  // search
  GlobalSearch: ApiCallModel;
  // filter options api
  LocationFilterOptions: ApiCallModel;
  ComponentFilterOptions: ApiCallModel;
  PartnerTypeFilterOptions: ApiCallModel;
  StatusFilterOptions: ApiCallModel;
  ReplenishmentPeriodFilterOptions: ApiCallModel;
  DonorFilterOptions: ApiCallModel;
  EligibilityStatusCodelist: ApiCallModel;
  EligibilityDiseaseBurdenCodelist: ApiCallModel;
  EligibilityYearsCodelist: ApiCallModel;
  EligibilityYears: ApiCallModel;
  FundingRequestsTRPWindowCodelist: ApiCallModel;
  FundingRequestsPortfolioCategoryCodelist: ApiCallModel;
  LocationAccessToFunding: {
    GrantCycles: ApiCallModel;
  };
  AllocationsCycles: ApiCallModel;
  FundingRequestsCycles: ApiCallModel;
  AnnualResultsCycles: ApiCallModel;
  BudgetsCycles: ApiCallModel;
  PledgesContributionsCycles: ApiCallModel;
  DisbursementsCycles: ApiCallModel;
  ExpendituresCycles: ApiCallModel;
  EligibilityCycles: ApiCallModel;
  ResultsComponentFilterOptions: ApiCallModel;
  // sync state variables
  AppliedFiltersState: AppliedFiltersStateModel;
  // CMS
  CMSData: CMSDataModel;
  cms: {
    componentsAppBar: CMSApiCallModel;
    componentsTable: CMSApiCallModel;
    componentsDialogBox: CMSApiCallModel;
    componentsChartsBudgets: CMSApiCallModel;
    componentsChartsCommon: CMSApiCallModel;
    componentsChartsEligibility: CMSApiCallModel;
    componentsChartsGeomap: CMSApiCallModel;
    componentsChartsGrants: CMSApiCallModel;
    componentsChartsInvestments: CMSApiCallModel;
    componentsChartsNetwork: CMSApiCallModel;
    componentsChartsPerformanceRating: CMSApiCallModel;
    componentsChartsPledges: CMSApiCallModel;
    componentsCookieDialog: CMSApiCallModel;
    componentsDatasetCarousel: CMSApiCallModel;
    componentsInformationPanel: CMSApiCallModel;
    componentsMobile: CMSApiCallModel;
    componentsPageHeader: CMSApiCallModel;
    componentsPerformanceFrameworkComponents: CMSApiCallModel;
    componentsSearch: CMSApiCallModel;
    componentsSlideInPanel: CMSApiCallModel;
    componentsSidebar: CMSApiCallModel;
    modulesLanding: CMSApiCallModel;
    modulesAbout: CMSApiCallModel;
    modulesCommon: CMSApiCallModel;
    modulesCountryDetail: CMSApiCallModel;
    modulesDatasets: CMSApiCallModel;
    modulesGrantDetail: CMSApiCallModel;
    modulesGrants: CMSApiCallModel;
    modulesFundingRequests: CMSApiCallModel;
    countrySummary: CMSApiCallModel;
    notesAndDisclaimers: CMSApiCallModel;
    pagesDatasets: CMSApiCallModel;
    pagesGeography: CMSApiCallModel;
    pagesGrantDetail: CMSApiCallModel;
    pagesGrants: CMSApiCallModel;
    pagesHome: CMSApiCallModel;
    pagesLocation: CMSApiCallModel;
    general: CMSApiCallModel;
    pagesDatasetsAccessToFunding: CMSApiCallModel;
    pagesDatasetsGrantImplementation: CMSApiCallModel;
    pagesDatasetsAnnualResults: CMSApiCallModel;
    pagesDatasetsResourceMobilization: CMSApiCallModel;
    pagesLocationAccessToFunding: CMSApiCallModel;
    pagesLocationGrantImplementation: CMSApiCallModel;
    pagesLocationOverview: CMSApiCallModel;
    pagesLocationResourceMobilization: CMSApiCallModel;
    pagesLocationResults: CMSApiCallModel;
    pagesGrantDocuments: CMSApiCallModel;
    pagesGrantGrantImplementation: CMSApiCallModel;
    pagesGrantOverview: CMSApiCallModel;
    pagesGrantTargetResults: CMSApiCallModel;
  };
}
