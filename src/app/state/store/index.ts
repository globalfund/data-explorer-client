import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";

import { AppliedFiltersState } from "app/state/api/action-reducers/sync/filters";
import {
  ToolBoxPanelAggregateByState,
  ToolBoxPanelDonorMapTypeState,
  ToolBoxPanelDonorMapViewState,
  ToolBoxPanelEligibilityAdvancedCheckboxState,
} from "app/state/api/action-reducers/sync";

import GrantsList from "app/state/api/action-reducers/viz/grantsList";
import Allocations from "app/state/api/action-reducers/viz/allocations";
import BudgetsFlow, {
  BudgetsFlowDrilldownLevel1,
} from "app/state/api/action-reducers/viz/budgetsFlow";
import Eligibility from "app/state/api/action-reducers/viz/eligibility";
import BudgetsTimeCycle, {
  BudgetsTimeCycleDrilldownLevel1,
} from "app/state/api/action-reducers/viz/budgetsTimeCycle";
import DisbursementsGeomap from "app/state/api/action-reducers/viz/disbursementsGeomap";
import DisbursementsTreemap from "app/state/api/action-reducers/viz/disbursementsTreemap";
import DisbursementsTimeCycle from "app/state/api/action-reducers/viz/disbursementsTimeCycle";
import PledgesContributionsGeomap from "app/state/api/action-reducers/viz/pledgesContributionsGeomap";
import PledgesContributionsTimeCycle from "app/state/api/action-reducers/viz/pledgesContributionsTimeCycle";

import GlobalSearch from "app/state/api/action-reducers/search";

import DonorFilterOptions from "app/state/api/action-reducers/filters/donors";
import StatusFilterOptions from "app/state/api/action-reducers/filters/status";
import LocationFilterOptions from "app/state/api/action-reducers/filters/locations";
import ComponentFilterOptions from "app/state/api/action-reducers/filters/components";
import PartnerTypeFilterOptions from "app/state/api/action-reducers/filters/partnerTypes";
import ReplenishmentPeriodFilterOptions from "app/state/api/action-reducers/filters/replenishmentPeriods";

const storeContent: StoreModel = {
  // data viz api
  GrantsList: persist(GrantsList),
  BudgetsFlow: persist(BudgetsFlow),
  BudgetsFlowDrilldownLevel1: persist(BudgetsFlowDrilldownLevel1),
  Allocations: persist(Allocations),
  Eligibility: persist(Eligibility),
  BudgetsTimeCycle: persist(BudgetsTimeCycle),
  BudgetsTimeCycleDrilldownLevel1: persist(BudgetsTimeCycleDrilldownLevel1),
  DisbursementsGeomap: persist(DisbursementsGeomap),
  DisbursementsTreemap: persist(DisbursementsTreemap),
  DisbursementsTimeCycle: persist(DisbursementsTimeCycle),
  PledgesContributionsGeomap: persist(PledgesContributionsGeomap),
  PledgesContributionsTimeCycle: persist(PledgesContributionsTimeCycle),
  // global search
  GlobalSearch: persist(GlobalSearch),
  // filter options api
  LocationFilterOptions: persist(LocationFilterOptions),
  ComponentFilterOptions: persist(ComponentFilterOptions),
  PartnerTypeFilterOptions: persist(PartnerTypeFilterOptions),
  StatusFilterOptions: persist(StatusFilterOptions),
  ReplenishmentPeriodFilterOptions: persist(ReplenishmentPeriodFilterOptions),
  DonorFilterOptions: persist(DonorFilterOptions),
  // sync state variables
  AppliedFiltersState: persist(AppliedFiltersState),
  ToolBoxPanelAggregateByState: persist(ToolBoxPanelAggregateByState),
  ToolBoxPanelDonorMapTypeState: persist(ToolBoxPanelDonorMapTypeState),
  ToolBoxPanelDonorMapViewState: persist(ToolBoxPanelDonorMapViewState),
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
};

export const store = createStore(storeContent);
