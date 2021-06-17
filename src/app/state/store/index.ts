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

const storeContent: StoreModel = {
  GrantsList: persist(GrantsList),
  DisbursementsGeomap: persist(DisbursementsGeomap),
  DisbursementsTreemap: persist(DisbursementsTreemap),
  DisbursementsTimeCycle: persist(DisbursementsTimeCycle),
  ToolBoxPanelDonorMapTypeState: persist(ToolBoxPanelDonorMapTypeState),
  ToolBoxPanelDonorMapViewState: persist(ToolBoxPanelDonorMapViewState),
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
};

export const store = createStore(storeContent);
