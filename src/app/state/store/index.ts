import { createStore, persist } from "easy-peasy";
import { StoreModel } from "app/state/api/interfaces";
import { ToolBoxPanelEligibilityAdvancedCheckboxState } from "app/state/api/action-reducers/sync";

const storeContent: StoreModel = {
  ToolBoxPanelEligibilityAdvancedCheckboxState: persist(
    ToolBoxPanelEligibilityAdvancedCheckboxState
  ),
};

export const store = createStore(storeContent);
