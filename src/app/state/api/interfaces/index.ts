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
} from "app/state/api/interfaces/cms";

export interface RequestValues<T> {
  values?: T;
  addOnData?: boolean;
  isCMSfetch?: boolean;
  filterString?: string;
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
>;

export interface CMSApiCallParams {}

export interface StoreModel {
  // homepage
  HomeResultsStats: ApiCallModel;
  HomePledgesContributionsBarChart: ApiCallModel;
  HomeAllocationsRadialChart: ApiCallModel;
  HomeBudgetsTreemap: ApiCallModel;
  HomeDisbursementsLineChart: ApiCallModel;
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
  };
}
