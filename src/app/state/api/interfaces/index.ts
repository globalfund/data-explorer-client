import { Action, Thunk } from "easy-peasy";
import {
  PageHeaderVizDrilldownsStateModel,
  ToolBoxPanelAggregateByStateModel,
  ToolBoxPanelAllocationsPeriodStateModel,
  ToolBoxPanelDisbursementsSliderValuesModel,
  ToolBoxPanelDonorMapTypeStateModel,
  ToolBoxPanelDonorMapViewStateModel,
  ToolBoxPanelEligibilityAdvancedCheckboxStateModel,
  ToolBoxPanelEligibilityYearStateModel,
  ToolBoxPanelInvestmentsMapViewStateModel,
  ToolBoxPanelPFPeriodStateModel,
  ToolBoxPanelResultsYearStateModel,
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
  AllocationsPeriods: ApiCallModel;
  AllocationsDrilldown: ApiCallModel;
  AllocationsGeomap: ApiCallModel;
  AllocationsMCGeomap: ApiCallModel;
  Eligibility: ApiCallModel;
  EligibilityYears: ApiCallModel;
  BudgetsFlow: ApiCallModel;
  BudgetsFlowDrilldownLevel1: ApiCallModel;
  BudgetsFlowDrilldownLevel2: ApiCallModel;
  BudgetsGeomap: ApiCallModel;
  BudgetsMCGeomap: ApiCallModel;
  BudgetsTimeCycle: ApiCallModel;
  BudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  BudgetsTimeCycleDrilldownLevel2: ApiCallModel;
  DisbursementsGeomap: ApiCallModel;
  DisbursementsGeomapMulticountries: ApiCallModel;
  DisbursementsTreemap: ApiCallModel;
  DisbursementsTreemapDrilldown: ApiCallModel;
  DisbursementsTimeCycle: ApiCallModel;
  DisbursementsTimeCycleDrilldown: ApiCallModel;
  SignedTreemap: ApiCallModel;
  SignedTreemapDrilldown: ApiCallModel;
  SignedTimeCycle: ApiCallModel;
  SignedTimeCycleDrilldown: ApiCallModel;
  CommitmentTreemap: ApiCallModel;
  CommitmentTreemapDrilldown: ApiCallModel;
  CommitmentTimeCycle: ApiCallModel;
  CommitmentTimeCycleDrilldown: ApiCallModel;
  PledgesContributionsGeomap: ApiCallModel;
  PledgesContributionsTimeCycle: ApiCallModel;
  PledgesContributionsTimeCycleDrilldown: ApiCallModel;
  PledgesContributionsTreemap: ApiCallModel;
  ResultsList: ApiCallModel;
  ResultsStats: ApiCallModel;
  ResultsYears: ApiCallModel;
  // global search
  GlobalSearch: ApiCallModel;
  // grant detail api
  GrantDetailInfo: ApiCallModel;
  GrantDetailPeriods: ApiCallModel;
  GrantDetailPeriodInfo: ApiCallModel;
  GrantDetailBudgetsFlow: ApiCallModel;
  GrantDetailBudgetsFlowDrilldownLevel1: ApiCallModel;
  GrantDetailBudgetsFlowDrilldownLevel2: ApiCallModel;
  GrantDetailBudgetsTimeCycle: ApiCallModel;
  GrantDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  GrantDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel;
  GrantDetailDisbursementsTreemap: ApiCallModel;
  GrantDetailSignedTreemap: ApiCallModel;
  GrantDetailCommitmentTreemap: ApiCallModel;
  GrantDetailDisbursementsTimeCycle: ApiCallModel;
  GrantDetailSignedTimeCycle: ApiCallModel;
  GrantDetailCommitmentTimeCycle: ApiCallModel;
  GrantDetailPerformanceRating: ApiCallModel;
  GrantDetailPerformanceFramework: ApiCallModel;
  GrantDetailPerformanceFrameworkExpand: ApiCallModel;
  GrantDetailDocuments: ApiCallModel;
  // location detail api
  LocationDetailInfo: ApiCallModel;
  EligibilityCountry: ApiCallModel;
  LocationDetailDisbursementsTreemap: ApiCallModel;
  LocationDetailSignedTreemap: ApiCallModel;
  LocationDetailCommitmentTreemap: ApiCallModel;
  LocationDetailDocuments: ApiCallModel;
  LocationDetailBudgetsFlow: ApiCallModel;
  LocationDetailBudgetsFlowDrilldownLevel1: ApiCallModel;
  LocationDetailBudgetsFlowDrilldownLevel2: ApiCallModel;
  LocationDetailBudgetsTimeCycle: ApiCallModel;
  LocationDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  LocationDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel;
  LocationGrants: ApiCallModel;
  // partner detail api
  PartnerDetailInfo: ApiCallModel;
  PartnerDetailDisbursementsTreemap: ApiCallModel;
  PartnerDetailDisbursementsTreemapDrilldown: ApiCallModel;
  PartnerDetailSignedTreemap: ApiCallModel;
  PartnerDetailSignedTreemapDrilldown: ApiCallModel;
  PartnerDetailCommitmentTreemap: ApiCallModel;
  PartnerDetailCommitmentTreemapDrilldown: ApiCallModel;
  PartnerDetailBudgetsFlow: ApiCallModel;
  PartnerDetailBudgetsFlowDrilldownLevel1: ApiCallModel;
  PartnerDetailBudgetsFlowDrilldownLevel2: ApiCallModel;
  PartnerDetailBudgetsTimeCycle: ApiCallModel;
  PartnerDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel;
  PartnerDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel;
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
  PageHeaderVizDrilldownsState: PageHeaderVizDrilldownsStateModel;
  ToolBoxPanelAggregateByState: ToolBoxPanelAggregateByStateModel;
  ToolBoxPanelResultsYearState: ToolBoxPanelResultsYearStateModel;
  ToolBoxPanelDonorMapTypeState: ToolBoxPanelDonorMapTypeStateModel;
  ToolBoxPanelDonorMapViewState: ToolBoxPanelDonorMapViewStateModel;
  ToolBoxPanelEligibilityYearState: ToolBoxPanelEligibilityYearStateModel;
  ToolBoxPanelAllocationsPeriodState: ToolBoxPanelAllocationsPeriodStateModel;
  ToolBoxPanelInvestmentsMapViewState: ToolBoxPanelInvestmentsMapViewStateModel;
  ToolBoxPanelDisbursementsSliderValues: ToolBoxPanelDisbursementsSliderValuesModel;
  ToolBoxPanelEligibilityAdvancedCheckboxState: ToolBoxPanelEligibilityAdvancedCheckboxStateModel;
}
