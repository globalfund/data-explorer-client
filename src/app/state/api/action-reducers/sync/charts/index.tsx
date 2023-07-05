/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface ChartsActivePanelsStateModel {
  value: number;
  reset: Action<ChartsActivePanelsStateModel>;
  setValue: Action<ChartsActivePanelsStateModel, number>;
}

export const ChartsActivePanelsState: ChartsActivePanelsStateModel = {
  value: 1,
  reset: action((state) => {
    state.value = 1;
  }),
  setValue: action((state, payload: number) => {
    state.value = payload;
  }),
};

export interface ChartsDatasetStateModel {
  value: string | null;
  reset: Action<ChartsDatasetStateModel>;
  setValue: Action<ChartsDatasetStateModel, string | null>;
}

export const ChartsDatasetState: ChartsDatasetStateModel = {
  value: null,
  setValue: action((state, payload) => {
    state.value = payload;
  }),
  reset: action((state) => {
    state.value = null;
  }),
};

export interface ChartsMappingStateModel {
  value: {
    [key: string]: any;
  };
  setValue: Action<
    ChartsMappingStateModel,
    {
      [key: string]: any;
    }
  >;
  reset: Action<ChartsMappingStateModel>;
}

export const ChartsMappingState: ChartsMappingStateModel = {
  value: {},
  setValue: action(
    (
      state,
      payload: {
        [key: string]: any;
      }
    ) => {
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
    }
  ),
  reset: action((state) => {
    state.value = {};
  }),
};

export interface ChartsChartTypeStateModel {
  value: string | null;
  setValue: Action<ChartsChartTypeStateModel, string | null>;
  reset: Action<ChartsChartTypeStateModel>;
}
export const ChartsChartTypeState: ChartsChartTypeStateModel = {
  value: null,
  setValue: action((state, payload: string | null) => {
    state.value = payload;
  }),
  reset: action((state) => {
    state.value = null;
  }),
};

export interface ChartsEnabledFilterOptionGroupsStateModel {
  value: string[];
  setValue: Action<ChartsEnabledFilterOptionGroupsStateModel, string[]>;
  clear: Action<ChartsEnabledFilterOptionGroupsStateModel>;
}

export const ChartsEnabledFilterOptionGroupsState: ChartsEnabledFilterOptionGroupsStateModel =
  {
    value: [],
    setValue: action((state, payload: string[]) => {
      state.value = payload;
    }),
    clear: action((state) => {
      state.value = [];
    }),
  };
