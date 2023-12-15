/* eslint-disable no-param-reassign */
import { ToolboxNavType } from "app/modules/chart-module/components/toolbox/views/steps/navbar";
import { action, Action } from "easy-peasy";

export interface ChartsActivePanelsStateModel {
  value: ToolboxNavType;
  reset: Action<ChartsActivePanelsStateModel>;
  setValue: Action<ChartsActivePanelsStateModel, ToolboxNavType>;
}

export const ChartsActivePanelsState: ChartsActivePanelsStateModel = {
  value: "selectDataset",
  reset: action((state) => {
    state.value = "selectDataset";
  }),
  setValue: action((state, payload: ToolboxNavType) => {
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
  removeMappingValue: Action<
    ChartsMappingStateModel,
    { id: any; value: string }
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
  removeMappingValue: action((state, payload: { id: any; value: string }) => {
    let nextValue = { ...state.value };
    //get value and ids for payload.id key
    const mappingValues: string[] = nextValue[payload.id].value;
    const mappingIds: string[] = nextValue[payload.id].ids;
    //get postion of payload.value in mappingValues
    const valueIndex = mappingValues.findIndex(
      (item: string) => item === payload.value
    );
    //remove value and id from mappingValues and mappingIds at valueIndex which will be the same for both arrays
    mappingValues.splice(valueIndex, 1);
    mappingIds.splice(valueIndex, 1);

    //update state
    state.value = {
      ...nextValue,
      [payload.id]: {
        ...nextValue[payload.id],
        value: mappingValues,
        ids: mappingIds,
      },
    };
  }),
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
