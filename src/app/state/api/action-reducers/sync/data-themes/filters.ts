import { action, Action } from "easy-peasy";

export interface DataThemesAppliedFiltersStateModel {
  value: [
    [
      {
        [key: string]: any[];
      }
    ]
  ];
  setValue: Action<
    DataThemesAppliedFiltersStateModel,
    {
      tab: number;
      viz: number;
      key: string;
      value: any[];
    }
  >;
  setAll: Action<
    DataThemesAppliedFiltersStateModel,
    {
      tab: number;
      viz: number;
      value: any;
    }
  >;
  reset: Action<DataThemesAppliedFiltersStateModel>;
  addTab: Action<DataThemesAppliedFiltersStateModel>;
  addViz: Action<DataThemesAppliedFiltersStateModel, { tabIndex: number }>;
  copyViz: Action<
    DataThemesAppliedFiltersStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeViz: Action<
    DataThemesAppliedFiltersStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeTab: Action<DataThemesAppliedFiltersStateModel, { tabIndex: number }>;
  resetTabViz: Action<
    DataThemesAppliedFiltersStateModel,
    { tabIndex: number; vizIndex: number }
  >;
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
    setAll: action(
      (
        state,
        payload: {
          tab: number;
          viz: number;
          value: any;
        }
      ) => {
        state.value[payload.tab][payload.viz] = payload.value;
      }
    ),
    reset: action((state) => {
      state.value = [[{}]];
    }),
    addTab: action((state) => {
      state.value.push([{}]);
    }),
    addViz: action((state, payload: { tabIndex: number }) => {
      state.value[payload.tabIndex].push({});
    }),
    copyViz: action(
      (state, payload: { tabIndex: number; vizIndex: number }) => {
        state.value[payload.tabIndex].push(
          state.value[payload.tabIndex][payload.vizIndex]
        );
      }
    ),
    removeViz: action(
      (state, payload: { tabIndex: number; vizIndex: number }) => {
        state.value[payload.tabIndex].splice(payload.vizIndex, 1);
      }
    ),
    removeTab: action((state, payload: { tabIndex: number }) => {
      state.value.splice(payload.tabIndex, 1);
    }),
    resetTabViz: action(
      (state, payload: { tabIndex: number; vizIndex: number }) => {
        state.value[payload.tabIndex][payload.vizIndex] = {};
      }
    ),
  };
