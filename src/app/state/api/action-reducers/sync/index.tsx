/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface ToolBoxPanelEligibilityAdvancedCheckboxStateModel {
  value: boolean;
  setValue: Action<ToolBoxPanelEligibilityAdvancedCheckboxStateModel, boolean>;
}

export const ToolBoxPanelEligibilityAdvancedCheckboxState: ToolBoxPanelEligibilityAdvancedCheckboxStateModel = {
  value: true,
  setValue: action((state, payload: boolean) => {
    state.value = payload;
  }),
};
