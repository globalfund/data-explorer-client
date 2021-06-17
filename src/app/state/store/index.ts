import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";
import {
  ToolBoxPanelDonorMapTypeState,
  ToolBoxPanelDonorMapViewState,
  ToolBoxPanelEligibilityAdvancedCheckboxState,
} from "app/state/api/action-reducers/sync";
import GrantsList from "app/state/api/action-reducers/viz/grantsList";

const storeContent: StoreModel = {
  GrantsList: persist(GrantsList),
  ToolBoxPanelDonorMapTypeState: persist(ToolBoxPanelDonorMapTypeState),
  ToolBoxPanelDonorMapViewState: persist(ToolBoxPanelDonorMapViewState),
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
};

export const store = createStore(storeContent);
