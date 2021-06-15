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

export interface ToolBoxPanelDonorMapTypeStateModel {
  value: string;
  setValue: Action<ToolBoxPanelDonorMapTypeStateModel, string>;
}

export const ToolBoxPanelDonorMapTypeState: ToolBoxPanelDonorMapTypeStateModel = {
  value: "Pledge",
  setValue: action((state, payload: string) => {
    state.value = payload;
  }),
};

export interface ToolBoxPanelDonorMapViewStateModel {
  value: string;
  setValue: Action<ToolBoxPanelDonorMapViewStateModel, string>;
}

export const ToolBoxPanelDonorMapViewState: ToolBoxPanelDonorMapTypeStateModel = {
  value: "Public Sector",
  setValue: action((state, payload: string) => {
    state.value = payload;
  }),
};
