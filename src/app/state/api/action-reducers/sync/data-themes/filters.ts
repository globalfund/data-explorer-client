import { action, Action } from "easy-peasy";

export interface DataThemesAppliedFiltersStateModel {
  value: {
    [key: string]: any[];
  };
  setValue: Action<
    DataThemesAppliedFiltersStateModel,
    {
      key: string;
      value: any[];
    }
  >;
  setAll: Action<
    DataThemesAppliedFiltersStateModel,
    {
      [key: string]: any[];
    }
  >;
}

export const DataThemesAppliedFiltersState: DataThemesAppliedFiltersStateModel =
  {
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
          [key: string]: any[];
        }
      ) => {
        state.value = payload;
      }
    ),
  };
