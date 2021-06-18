import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";

import {
  ToolBoxPanelDonorMapTypeState,
  ToolBoxPanelDonorMapViewState,
  ToolBoxPanelEligibilityAdvancedCheckboxState,
} from "app/state/api/action-reducers/sync";

import GrantsList from "app/state/api/action-reducers/viz/grantsList";
import DisbursementsGeomap from "app/state/api/action-reducers/viz/disbursementsGeomap";
import DisbursementsTreemap from "app/state/api/action-reducers/viz/disbursementsTreemap";
import DisbursementsTimeCycle from "app/state/api/action-reducers/viz/disbursementsTimeCycle";

import LocationFilterOptions from "app/state/api/action-reducers/filters/locations";
import ComponentFilterOptions from "app/state/api/action-reducers/filters/components";
import PartnerTypeFilterOptions from "app/state/api/action-reducers/filters/partnerTypes";
import StatusFilterOptions from "app/state/api/action-reducers/filters/status";
import ReplenishmentPeriodFilterOptions from "app/state/api/action-reducers/filters/replenishmentPeriods";
import DonorFilterOptions from "app/state/api/action-reducers/filters/donors";

const storeContent: StoreModel = {
  // data viz api
  GrantsList: persist(GrantsList),
  DisbursementsGeomap: persist(DisbursementsGeomap),
  DisbursementsTreemap: persist(DisbursementsTreemap),
  DisbursementsTimeCycle: persist(DisbursementsTimeCycle),
  // filter options api
  LocationFilterOptions: persist(LocationFilterOptions),
  ComponentFilterOptions: persist(ComponentFilterOptions),
  PartnerTypeFilterOptions: persist(PartnerTypeFilterOptions),
  StatusFilterOptions: persist(StatusFilterOptions),
  ReplenishmentPeriodFilterOptions: persist(ReplenishmentPeriodFilterOptions),
  DonorFilterOptions: persist(DonorFilterOptions),
  // sync state variables
  ToolBoxPanelDonorMapTypeState: persist(ToolBoxPanelDonorMapTypeState),
  ToolBoxPanelDonorMapViewState: persist(ToolBoxPanelDonorMapViewState),
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
};

export const store = createStore(storeContent);
