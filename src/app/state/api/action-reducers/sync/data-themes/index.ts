/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface DataThemesStepSelectionsStateModel {
  step1: [[{dataset: string | null}]];
  setStep1: Action<
    DataThemesStepSelectionsStateModel,
    {
      tab: number,
      viz: number,
      dataset: string | null,
    }
  >;
  reset: Action<DataThemesStepSelectionsStateModel>;
}

export const DataThemesStepSelectionsState: DataThemesStepSelectionsStateModel = {
  step1: [[{dataset: null}]],
  setStep1: action((state, payload: {tab: number, viz: number, dataset: string | null}) => {
      state.step1[payload.tab][payload.viz] = { dataset: payload.dataset };
    }
  ),
  reset: action((state) => {
    state.step1 = [[{dataset: null}]];
  }),
};

export interface DataThemesStepChartTypeStateModel {
  value: [[string | null]];
  setValue: Action<DataThemesStepChartTypeStateModel, {tab: number, viz: number, value: string | null}>;
  reset: Action<DataThemesStepChartTypeStateModel>;
}

export const DataThemesStepChartTypeState: DataThemesStepChartTypeStateModel = {
  value: [[null]],
  setValue: action((state, payload: {tab: number, viz: number, value: string | null}) => {
    state.value[payload.tab][payload.viz] = payload.value;
  }),
  reset: action((state) => {
    state.value = [[null]];
  }),
};

export interface DataThemesMappingStateModel {
  value: [[{
    [key: string]: any;
  }]];
  setValue: Action<DataThemesMappingStateModel, any>;
  clearValue: Action<DataThemesMappingStateModel, {tab: number, viz: number}>;
  reset: Action<DataThemesMappingStateModel>;
}

export const DataThemesMappingState: DataThemesMappingStateModel = {
  value: [[{}]],
  setValue: action((state, payload: {tab: number, viz: number, mapping: any}) => {
    let nextValue = { ...state.value[payload.tab][payload.viz] };
    const keysToRemove: string[] = [];
    Object.keys(payload.mapping).forEach((key: string) => {
      if (payload.mapping[key] === undefined) {
        keysToRemove.push(key);
      }
    });
    nextValue = { ...nextValue, ...payload.mapping };
    keysToRemove.forEach((key: string) => {
      delete nextValue[key];
    });
    state.value[payload.tab][payload.viz] = { ...nextValue };
  }),
  
  clearValue: action((state, payload: {tab: number, viz: number}) => {
    state.value[payload.tab][payload.viz] = {};
  }),

  reset: action((state) => {
    state.value = [[{}]];
  }),
};

export interface DataThemesStepSelectDataLiveStateModel {
  value: boolean[][];
  setValue: Action<DataThemesStepSelectDataLiveStateModel, {tab: number, viz: number, value: boolean}>;
  reset: Action<DataThemesStepSelectDataLiveStateModel>;
}

export const DataThemesStepSelectDataLiveState: DataThemesStepSelectDataLiveStateModel = {
  value: [[false]],
  setValue: action((state, payload: {tab: number, viz: number, value: boolean}) => {
    state.value[payload.tab][payload.viz] = payload.value;
  }),
  reset: action((state) => {
    state.value = [[false]];
  }),
};

export interface DataThemesIndexStateModel {
  value: number;
  setValue: Action<DataThemesIndexStateModel, number>;
  reset: Action<DataThemesIndexStateModel>;
}

export const DataThemesIndexState: DataThemesIndexStateModel = {
  value: 0,
  setValue: action((state, payload: number) => {
    state.value = payload;
  }),
  reset: action((state) => {
    state.value = 0;
  }),
};


export interface DataThemesIdsStateModel {
  value: number[][];
  // setValue: Action<DataThemesIdsStateModel, {tabIndex: number, vizIndex: number}>; // TODO: unused
  addTab: Action<DataThemesIdsStateModel>;
  addViz: Action<DataThemesIdsStateModel, {tabIndex: number}>;
  reset: Action<DataThemesIdsStateModel>;
}

export const DataThemesIdsState: DataThemesIdsStateModel = {
  value: [[0]],
  // setValue: action((state, payload: {tabIndex: number, vizIndex: number}) => {  // TODO: unused
  //   state.value[payload.tabIndex][payload.vizIndex] = payload.vizIndex;
  // }),
  addTab: action((state) => {
    // Add a new array of visualisations starting at id 0.
    state.value.push([0]);
  }),
  addViz: action((state, payload: {tabIndex: number}) => {
    // Add a new value to the array of visualisations, with the length + 1 as the ID (length is 0 indexed so +1 is implicit)
    state.value[payload.tabIndex].push(state.value[payload.tabIndex].length);
  }),
  reset: action((state) => {
    state.value = [[0]];
  }),
};
