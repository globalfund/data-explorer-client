/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface DataThemesStepSelectionsStateModel {
  step1: {
    dataset: string | null;
  };
  setStep1: Action<
    DataThemesStepSelectionsStateModel,
    {
      dataset: string | null;
    }
  >;
}

export const DataThemesStepSelectionsState: DataThemesStepSelectionsStateModel =
  {
    step1: {
      dataset: null,
    },
    setStep1: action(
      (
        state,
        payload: {
          dataset: string | null;
        }
      ) => {
        state.step1 = payload;
      }
    ),
  };

export interface DataThemesStepChartTypeStateModel {
  value: string | null;
  setValue: Action<DataThemesStepChartTypeStateModel, string | null>;
}

export const DataThemesStepChartTypeState: DataThemesStepChartTypeStateModel = {
  value: null,
  setValue: action((state, payload: string | null) => {
    state.value = payload;
  }),
};

export interface DataThemesMappingStateModel {
  value: {
    [key: string]: any;
  };
  setValue: Action<DataThemesMappingStateModel, any>;
  clearValue: Action<DataThemesMappingStateModel>;
}

export const DataThemesMappingState: DataThemesMappingStateModel = {
  value: {},
  setValue: action((state, payload: any) => {
    let nextValue = { ...state.value };
    const keysToRemove: string[] = [];
    Object.keys(payload).forEach((key: string) => {
      if (payload[key] === undefined) {
        keysToRemove.push(key);
      }
    });
    nextValue = { ...nextValue, ...payload };
    keysToRemove.forEach((key: string) => {
      delete nextValue[key];
    });
    state.value = { ...nextValue };
  }),
  clearValue: action((state) => {
    state.value = {};
  }),
};

export interface DataThemesStepSelectDataLiveStateModel {
  value: boolean;
  setValue: Action<DataThemesStepSelectDataLiveStateModel, boolean>;
}

export const DataThemesStepSelectDataLiveState: DataThemesStepSelectDataLiveStateModel =
  {
    value: false,
    setValue: action((state, payload: boolean) => {
      state.value = payload;
    }),
  };
