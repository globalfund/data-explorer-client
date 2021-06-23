import { Action, Thunk } from "easy-peasy";
import {
  ToolBoxPanelAggregateByStateModel,
  ToolBoxPanelDonorMapTypeStateModel,
  ToolBoxPanelDonorMapViewStateModel,
  ToolBoxPanelEligibilityAdvancedCheckboxStateModel,
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
  GrantsList: ApiCallModel;
  Allocations: ApiCallModel;
  Eligibility: ApiCallModel;
  BudgetsFlow: ApiCallModel;
  BudgetsTimeCycle: ApiCallModel;
  DisbursementsGeomap: ApiCallModel;
  DisbursementsTreemap: ApiCallModel;
  DisbursementsTimeCycle: ApiCallModel;
  PledgesContributionsGeomap: ApiCallModel;
  PledgesContributionsTimeCycle: ApiCallModel;
  // global search
  GlobalSearch: ApiCallModel;
  // filter options api
  LocationFilterOptions: ApiCallModel;
  ComponentFilterOptions: ApiCallModel;
  PartnerTypeFilterOptions: ApiCallModel;
  StatusFilterOptions: ApiCallModel;
  ReplenishmentPeriodFilterOptions: ApiCallModel;
  DonorFilterOptions: ApiCallModel;
  // sync state variables
  AppliedFiltersState: AppliedFiltersStateModel;
  ToolBoxPanelAggregateByState: ToolBoxPanelAggregateByStateModel;
  ToolBoxPanelDonorMapTypeState: ToolBoxPanelDonorMapTypeStateModel;
  ToolBoxPanelDonorMapViewState: ToolBoxPanelDonorMapViewStateModel;
  ToolBoxPanelEligibilityAdvancedCheckboxState: ToolBoxPanelEligibilityAdvancedCheckboxStateModel;
}
