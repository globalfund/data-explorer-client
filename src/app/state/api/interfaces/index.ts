import { Action, Thunk } from "easy-peasy";
import {
  ToolBoxPanelAggregateByStateModel,
  ToolBoxPanelDonorMapTypeStateModel,
  ToolBoxPanelDonorMapViewStateModel,
  ToolBoxPanelEligibilityAdvancedCheckboxStateModel,
  ToolBoxPanelPFPeriodStateModel,
} from "app/state/api/action-reducers/sync";
import { AppliedFiltersStateModel } from "../action-reducers/sync/filters";

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
}

// todo: add all available filters
interface ApiCallParamsFilters {}

export interface ApiCallParams {}

export interface ApiResponseModel {
  data: any[];
  count: number;
}

export type ApiCallModel = ApiModel<
  ApiCallParams | ApiCallParams[] | string,
  ApiResponseModel
>;

export interface StoreModel {
  // data viz api
  Documents: ApiCallModel;
  GrantsList: ApiCallModel;
  Allocations: ApiCallModel;
  AllocationsDrilldown: ApiCallModel;
  Eligibility: ApiCallModel;
  BudgetsFlow: ApiCallModel;
  BudgetsFlowDrilldownLevel1: ApiCallModel;
  BudgetsTimeCycle: ApiCallModel;
  BudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  DisbursementsGeomap: ApiCallModel;
  DisbursementsTreemap: ApiCallModel;
  DisbursementsTreemapDrilldown: ApiCallModel;
  DisbursementsTimeCycle: ApiCallModel;
  DisbursementsTimeCycleDrilldown: ApiCallModel;
  PledgesContributionsGeomap: ApiCallModel;
  PledgesContributionsTimeCycle: ApiCallModel;
  PledgesContributionsTimeCycleDrilldown: ApiCallModel;
  ResultsList: ApiCallModel;
  // global search
  GlobalSearch: ApiCallModel;
  // grant detail api
  GrantDetailInfo: ApiCallModel;
  GrantDetailPeriods: ApiCallModel;
  GrantDetailPeriodInfo: ApiCallModel;
  GrantDetailBudgetsFlow: ApiCallModel;
  GrantDetailBudgetsFlowDrilldownLevel1: ApiCallModel;
  GrantDetailBudgetsTimeCycle: ApiCallModel;
  GrantDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  GrantDetailDisbursementsTreemap: ApiCallModel;
  GrantDetailDisbursementsTimeCycle: ApiCallModel;
  GrantDetailPerformanceRating: ApiCallModel;
  GrantDetailPerformanceFramework: ApiCallModel;
  GrantDetailPerformanceFrameworkExpand: ApiCallModel;
  GrantDetailDocuments: ApiCallModel;
  // location detail api
  LocationDetailInfo: ApiCallModel;
  EligibilityCountry: ApiCallModel;
  LocationDetailDocuments: ApiCallModel;
  LocationDetailBudgetsFlow: ApiCallModel;
  LocationDetailBudgetsFlowDrilldownLevel1: ApiCallModel;
  LocationDetailBudgetsTimeCycle: ApiCallModel;
  LocationDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  // filter options api
  LocationFilterOptions: ApiCallModel;
  ComponentFilterOptions: ApiCallModel;
  PartnerTypeFilterOptions: ApiCallModel;
  StatusFilterOptions: ApiCallModel;
  ReplenishmentPeriodFilterOptions: ApiCallModel;
  DonorFilterOptions: ApiCallModel;
  // sync state variables
  AppliedFiltersState: AppliedFiltersStateModel;
  ToolBoxPanelPFPeriodState: ToolBoxPanelPFPeriodStateModel;
  ToolBoxPanelAggregateByState: ToolBoxPanelAggregateByStateModel;
  ToolBoxPanelDonorMapTypeState: ToolBoxPanelDonorMapTypeStateModel;
  ToolBoxPanelDonorMapViewState: ToolBoxPanelDonorMapViewStateModel;
  ToolBoxPanelEligibilityAdvancedCheckboxState: ToolBoxPanelEligibilityAdvancedCheckboxStateModel;
}
