/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface DataPathPanelVisibilityStateModel {
  value: boolean;
  setValue: Action<DataPathPanelVisibilityStateModel, boolean>;
}

export const DataPathPanelVisibilityState: DataPathPanelVisibilityStateModel = {
  value: false,
  setValue: action((state, payload: boolean) => {
    state.value = payload;
  }),
};
