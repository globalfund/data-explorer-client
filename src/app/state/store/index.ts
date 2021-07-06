import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";

import { AppliedFiltersState } from "app/state/api/action-reducers/sync/filters";
import {
  ToolBoxPanelAggregateByState,
  ToolBoxPanelDonorMapTypeState,
  ToolBoxPanelDonorMapViewState,
  ToolBoxPanelEligibilityAdvancedCheckboxState,
  ToolBoxPanelPFPeriodState,
} from "app/state/api/action-reducers/sync";

import GrantsList from "app/state/api/action-reducers/viz/grantsList";
import Allocations, {
  AllocationsDrilldown,
} from "app/state/api/action-reducers/viz/allocations";
import BudgetsFlow, {
  BudgetsFlowDrilldownLevel1,
} from "app/state/api/action-reducers/viz/budgetsFlow";
import Eligibility from "app/state/api/action-reducers/viz/eligibility";
import BudgetsTimeCycle, {
  BudgetsTimeCycleDrilldownLevel1,
} from "app/state/api/action-reducers/viz/budgetsTimeCycle";
import DisbursementsGeomap from "app/state/api/action-reducers/viz/disbursementsGeomap";
import DisbursementsTreemap, {
  DisbursementsTreemapDrilldown,
} from "app/state/api/action-reducers/viz/disbursementsTreemap";
import DisbursementsTimeCycle, {
  DisbursementsTimeCycleDrilldown,
} from "app/state/api/action-reducers/viz/disbursementsTimeCycle";
import PledgesContributionsGeomap from "app/state/api/action-reducers/viz/pledgesContributionsGeomap";
import PledgesContributionsTimeCycle, {
  PledgesContributionsTimeCycleDrilldown,
} from "app/state/api/action-reducers/viz/pledgesContributionsTimeCycle";

import GlobalSearch from "app/state/api/action-reducers/search";

import DonorFilterOptions from "app/state/api/action-reducers/filters/donors";
import StatusFilterOptions from "app/state/api/action-reducers/filters/status";
import LocationFilterOptions from "app/state/api/action-reducers/filters/locations";
import ComponentFilterOptions from "app/state/api/action-reducers/filters/components";
import PartnerTypeFilterOptions from "app/state/api/action-reducers/filters/partnerTypes";
import ReplenishmentPeriodFilterOptions from "app/state/api/action-reducers/filters/replenishmentPeriods";
import GrantDetailInfo from "app/state/api/action-reducers/grantDetail/infoPanel";
import GrantDetailDisbursementsTreemap from "app/state/api/action-reducers/grantDetail/disbursementsTreemap";
import GrantDetailDisbursementsTimeCycle from "app/state/api/action-reducers/grantDetail/disbursementsTimeCycle";
import GrantDetailPerformanceRating from "app/state/api/action-reducers/grantDetail/performanceRating";
import GrantDetailPerformanceFramework, {
  GrantDetailPerformanceFrameworkExpand,
} from "app/state/api/action-reducers/grantDetail/performanceFramework";
import Documents from "app/state/api/action-reducers/viz/documents";
import GrantDetailDocuments from "app/state/api/action-reducers/grantDetail/documents";
import GrantDetailPeriods from "app/state/api/action-reducers/grantDetail/periods";
import GrantDetailPeriodInfo from "app/state/api/action-reducers/grantDetail/periodInfo";
import LocationDetailInfo from "app/state/api/action-reducers/locationDetail/info";
import EligibilityCountry from "app/state/api/action-reducers/locationDetail/eligibility";
import LocationDetailDocuments from "app/state/api/action-reducers/locationDetail/documents";
import GrantDetailBudgetsFlow, {
  GrantDetailBudgetsFlowDrilldownLevel1,
} from "app/state/api/action-reducers/grantDetail/budgetsFlow";
import LocationDetailBudgetsFlow, {
  LocationDetailBudgetsFlowDrilldownLevel1,
} from "app/state/api/action-reducers/locationDetail/budgetsFlow";
import GrantDetailBudgetsTimeCycle, {
  GrantDetailBudgetsTimeCycleDrilldownLevel1,
} from "app/state/api/action-reducers/grantDetail/budgetsTimeCycle";
import LocationDetailBudgetsTimeCycle, {
  LocationDetailBudgetsTimeCycleDrilldownLevel1,
} from "app/state/api/action-reducers/locationDetail/budgetsTimeCycle";
import ResultsList from "app/state/api/action-reducers/viz/resultsList";

const storeContent: StoreModel = {
  // data viz api
  Documents: persist(Documents),
  GrantsList: persist(GrantsList),
  BudgetsFlow: persist(BudgetsFlow),
  BudgetsFlowDrilldownLevel1: persist(BudgetsFlowDrilldownLevel1),
  Allocations: persist(Allocations),
  AllocationsDrilldown: persist(AllocationsDrilldown),
  Eligibility: persist(Eligibility),
  BudgetsTimeCycle: persist(BudgetsTimeCycle),
  BudgetsTimeCycleDrilldownLevel1: persist(BudgetsTimeCycleDrilldownLevel1),
  DisbursementsGeomap: persist(DisbursementsGeomap),
  DisbursementsTreemap: persist(DisbursementsTreemap),
  DisbursementsTreemapDrilldown: persist(DisbursementsTreemapDrilldown),
  DisbursementsTimeCycle: persist(DisbursementsTimeCycle),
  DisbursementsTimeCycleDrilldown: persist(DisbursementsTimeCycleDrilldown),
  PledgesContributionsGeomap: persist(PledgesContributionsGeomap),
  PledgesContributionsTimeCycle: persist(PledgesContributionsTimeCycle),
  PledgesContributionsTimeCycleDrilldown: persist(
    PledgesContributionsTimeCycleDrilldown
  ),
  ResultsList: persist(ResultsList),
  // global search
  GlobalSearch: persist(GlobalSearch),
  // grant detail api
  GrantDetailInfo: persist(GrantDetailInfo),
  GrantDetailPeriods: persist(GrantDetailPeriods),
  GrantDetailPeriodInfo: persist(GrantDetailPeriodInfo),
  GrantDetailBudgetsFlow: persist(GrantDetailBudgetsFlow),
  GrantDetailBudgetsFlowDrilldownLevel1: persist(
    GrantDetailBudgetsFlowDrilldownLevel1
  ),
  GrantDetailBudgetsTimeCycle: persist(GrantDetailBudgetsTimeCycle),
  GrantDetailBudgetsTimeCycleDrilldownLevel1: persist(
    GrantDetailBudgetsTimeCycleDrilldownLevel1
  ),
  GrantDetailDisbursementsTreemap: persist(GrantDetailDisbursementsTreemap),
  GrantDetailDisbursementsTimeCycle: persist(GrantDetailDisbursementsTimeCycle),
  GrantDetailPerformanceRating: persist(GrantDetailPerformanceRating),
  GrantDetailPerformanceFramework: persist(GrantDetailPerformanceFramework),
  GrantDetailPerformanceFrameworkExpand: persist(
    GrantDetailPerformanceFrameworkExpand
  ),
  GrantDetailDocuments: persist(GrantDetailDocuments),
  // location detail api
  LocationDetailInfo: persist(LocationDetailInfo),
  EligibilityCountry: persist(EligibilityCountry),
  LocationDetailDocuments: persist(LocationDetailDocuments),
  LocationDetailBudgetsFlow: persist(LocationDetailBudgetsFlow),
  LocationDetailBudgetsFlowDrilldownLevel1: persist(
    LocationDetailBudgetsFlowDrilldownLevel1
  ),
  LocationDetailBudgetsTimeCycle: persist(LocationDetailBudgetsTimeCycle),
  LocationDetailBudgetsTimeCycleDrilldownLevel1: persist(
    LocationDetailBudgetsTimeCycleDrilldownLevel1
  ),
  // filter options api
  LocationFilterOptions: persist(LocationFilterOptions),
  ComponentFilterOptions: persist(ComponentFilterOptions),
  PartnerTypeFilterOptions: persist(PartnerTypeFilterOptions),
  StatusFilterOptions: persist(StatusFilterOptions),
  ReplenishmentPeriodFilterOptions: persist(ReplenishmentPeriodFilterOptions),
  DonorFilterOptions: persist(DonorFilterOptions),
  // sync state variables
  AppliedFiltersState: persist(AppliedFiltersState),
  ToolBoxPanelPFPeriodState: persist(ToolBoxPanelPFPeriodState),
  ToolBoxPanelAggregateByState: persist(ToolBoxPanelAggregateByState),
  ToolBoxPanelDonorMapTypeState: persist(ToolBoxPanelDonorMapTypeState),
  ToolBoxPanelDonorMapViewState: persist(ToolBoxPanelDonorMapViewState),
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
};

export const store = createStore(storeContent);
