/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";
import { DrilldownModelUpdated } from "app/interfaces";

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

export interface DataPathStepsStateModel {
  steps: DrilldownModelUpdated[];
  addSteps: Action<DataPathStepsStateModel, DrilldownModelUpdated[]>;
  setSteps: Action<DataPathStepsStateModel, DrilldownModelUpdated[]>;
  clear: Action<DataPathStepsStateModel>;
}

export const DataPathStepsState: DataPathStepsStateModel = {
  steps: [],
  addSteps: action((state, payload: DrilldownModelUpdated[]) => {
    state.steps = [...state.steps, ...payload];
  }),
  setSteps: action((state, payload: DrilldownModelUpdated[]) => {
    state.steps = payload;
  }),
  clear: action((state) => {
    state.steps = [];
  }),
};

export interface DataPathActiveStepStateModel {
  step: DrilldownModelUpdated | null;
  setStep: Action<DataPathActiveStepStateModel, DrilldownModelUpdated>;
  clear: Action<DataPathActiveStepStateModel>;
}

export const DataPathActiveStep: DataPathActiveStepStateModel = {
  step: null,
  setStep: action((state, payload: DrilldownModelUpdated) => {
    state.step = payload;
  }),
  clear: action((state) => {
    state.step = null;
  }),
};
