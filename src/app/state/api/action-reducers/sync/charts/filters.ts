import { action, Action } from "easy-peasy";

export interface ChartsAppliedFiltersStateModel {
  value: {
    [key: string]: any[];
  };
  setValue: Action<
    ChartsAppliedFiltersStateModel,
    {
      key: string;
      value: any[];
    }
  >;
  setAll: Action<
    ChartsAppliedFiltersStateModel,
    {
      value: {
        [key: string]: any[];
      };
    }
  >;
  reset: Action<ChartsAppliedFiltersStateModel>;
}

export const ChartsAppliedFiltersState: ChartsAppliedFiltersStateModel = {
  value: {},
  setValue: action(
    (
      state,
      payload: {
        key: string;
        value: any[];
      }
    ) => {
      if (state.value[payload.key]) {
        if (payload.value.length === 0) {
          delete state.value[payload.key];
        } else {
          state.value[payload.key] = payload.value;
        }
      } else if (payload.value.length > 0) {
        state.value = {
          ...state.value,
          [payload.key]: payload.value,
        };
      }
    }
  ),
  setAll: action(
    (
      state,
      payload: {
        value: {
          [key: string]: any[];
        };
      }
    ) => {
      state.value = payload.value;
    }
  ),
  reset: action((state) => {
    state.value = {};
  }),
};
