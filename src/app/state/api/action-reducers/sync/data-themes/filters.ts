import { action, Action } from "easy-peasy";

export interface DataThemesAppliedFiltersStateModel {
  value: [[{
    [key: string]: any[];
  }]];
  setValue: Action<
    DataThemesAppliedFiltersStateModel,
    {
      tab: number;
      viz: number;
      key: string;
      value: any[];
    }
  >;
  reset: Action<DataThemesAppliedFiltersStateModel>;
  addTab: Action<DataThemesAppliedFiltersStateModel>;
  addViz: Action<DataThemesAppliedFiltersStateModel, {tabIndex: number}>;
}

export const DataThemesAppliedFiltersState: DataThemesAppliedFiltersStateModel =
  {
    value: [[{}]],
    setValue: action(
      (
        state,
        payload: {
          tab: number;
          viz: number;
          key: string;
          value: any[];
        }
      ) => {
        if (state.value[payload.tab][payload.viz][payload.key]) {
          if (payload.value.length === 0) {
            delete state.value[payload.tab][payload.viz][payload.key];
          } else {
            state.value[payload.tab][payload.viz][payload.key] = payload.value;
          }
        } else if (payload.value.length > 0) {
          state.value[payload.tab][payload.viz] = {
            ...state.value[payload.tab][payload.viz],
            [payload.key]: payload.value,
          };
        }
      }
    ),
    reset: action((state) => {state.value = [[{}]]}),
    addTab: action((state) => {
      state.value.push([{}]);
    }),
    addViz: action((state, payload: {tabIndex: number}) => {
      state.value[payload.tabIndex].push({});
    }),
  };
