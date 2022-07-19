/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";
import { EditorState } from "draft-js";
import filter from "lodash/filter";

export interface DataThemesStepSelectionsStateModel {
  step1: [[{ dataset: string | null; dataPoints: number }]];
  setStep1: Action<
    DataThemesStepSelectionsStateModel,
    {
      tab: number;
      viz: number;
      dataset: string | null;
      dataPoints: number;
    }
  >;
  activeStep: number[][];
  setActiveStep: Action<
    DataThemesStepSelectionsStateModel,
    { tab: number; viz: number; value: number }
  >;
  reset: Action<DataThemesStepSelectionsStateModel>;
  addTab: Action<DataThemesStepSelectionsStateModel>;
  addViz: Action<DataThemesStepSelectionsStateModel, { tabIndex: number }>;
}

export const DataThemesStepSelectionsState: DataThemesStepSelectionsStateModel =
  {
    step1: [[{ dataset: null, dataPoints: 100 }]],
    setStep1: action(
      (
        state,
        payload: {
          tab: number;
          viz: number;
          dataset: string | null;
          dataPoints: number;
        }
      ) => {
        state.step1[payload.tab][payload.viz] = {
          dataset: payload.dataset,
          dataPoints: payload.dataPoints,
        };
      }
    ),
    activeStep: [[0]],
    setActiveStep: action(
      (state, payload: { tab: number; viz: number; value: number }) => {
        state.activeStep[payload.tab][payload.viz] = payload.value;
      }
    ),
    reset: action((state) => {
      state.step1 = [[{ dataset: null, dataPoints: 100 }]];
    }),
    addTab: action((state) => {
      state.step1.push([{ dataset: null, dataPoints: 100 }]);
    }),
    addViz: action((state, payload: { tabIndex: number }) => {
      state.step1[payload.tabIndex].push({ dataset: null, dataPoints: 100 });
    }),
  };

export interface DataThemesStepChartTypeStateModel {
  value: [[string | null]];
  setValue: Action<
    DataThemesStepChartTypeStateModel,
    { tab: number; viz: number; value: string | null }
  >;
  reset: Action<DataThemesStepChartTypeStateModel>;
  addTab: Action<DataThemesStepChartTypeStateModel>;
  addViz: Action<DataThemesStepChartTypeStateModel, { tabIndex: number }>;
}

export const DataThemesStepChartTypeState: DataThemesStepChartTypeStateModel = {
  value: [[null]],
  setValue: action(
    (state, payload: { tab: number; viz: number; value: string | null }) => {
      state.value[payload.tab][payload.viz] = payload.value;
    }
  ),
  reset: action((state) => {
    state.value = [[null]];
  }),
  addTab: action((state) => {
    state.value.push([null]);
  }),
  addViz: action((state, payload: { tabIndex: number }) => {
    state.value[payload.tabIndex].push(null);
  }),
};

export interface DataThemesMappingStateModel {
  value: [
    [
      {
        [key: string]: any;
      }
    ]
  ];
  setValue: Action<DataThemesMappingStateModel, any>;
  clearValue: Action<DataThemesMappingStateModel, { tab: number; viz: number }>;
  reset: Action<DataThemesMappingStateModel>;
  addTab: Action<DataThemesMappingStateModel>;
  addViz: Action<DataThemesMappingStateModel, { tabIndex: number }>;
  removeViz: Action<
    DataThemesMappingStateModel,
    { tabIndex: number; vizIndex: number }
  >;
}

export const DataThemesMappingState: DataThemesMappingStateModel = {
  value: [[{}]],
  setValue: action(
    (state, payload: { tab: number; viz: number; mapping: any }) => {
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
    }
  ),

  clearValue: action((state, payload: { tab: number; viz: number }) => {
    state.value[payload.tab][payload.viz] = {};
  }),

  reset: action((state) => {
    state.value = [[{}]];
  }),

  addTab: action((state) => {
    state.value.push([{}]);
  }),
  addViz: action((state, payload: { tabIndex: number }) => {
    state.value[payload.tabIndex].push({});
  }),
  removeViz: action(
    (state, payload: { tabIndex: number; vizIndex: number }) => {
      state.value[payload.tabIndex].splice(payload.vizIndex, 1);
    }
  ),
};

export interface DataThemesStepSelectDataLiveStateModel {
  value: boolean[][];
  setValue: Action<
    DataThemesStepSelectDataLiveStateModel,
    { tab: number; viz: number; value: boolean }
  >;
  reset: Action<DataThemesStepSelectDataLiveStateModel>;
  addTab: Action<DataThemesStepSelectDataLiveStateModel>;
  addViz: Action<DataThemesStepSelectDataLiveStateModel, { tabIndex: number }>;
}

export const DataThemesStepSelectDataLiveState: DataThemesStepSelectDataLiveStateModel =
  {
    value: [[false]],
    setValue: action(
      (state, payload: { tab: number; viz: number; value: boolean }) => {
        state.value[payload.tab][payload.viz] = payload.value;
      }
    ),
    reset: action((state) => {
      state.value = [[false]];
    }),
    addTab: action((state) => {
      state.value.push([false]);
    }),
    addViz: action((state, payload: { tabIndex: number }) => {
      state.value[payload.tabIndex].push(false);
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

export const DataThemesVizIndexState: DataThemesIndexStateModel = {
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
  addViz: Action<DataThemesIdsStateModel, { tabIndex: number }>;
  removeViz: Action<
    DataThemesIdsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
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
  addViz: action((state, payload: { tabIndex: number }) => {
    // Add a new value to the array of visualisations, with the length + 1 as the ID (length is 0 indexed so +1 is implicit)
    state.value[payload.tabIndex].push(state.value[payload.tabIndex].length);
  }),
  removeViz: action(
    (state, payload: { tabIndex: number; vizIndex: number }) => {
      state.value[payload.tabIndex] = filter(
        state.value[payload.tabIndex],
        (id: number) => id !== payload.vizIndex
      );
    }
  ),
  reset: action((state) => {
    state.value = [[0]];
  }),
};

export interface DataThemesActivePanelsStateModel {
  value: number[][];
  setValue: Action<
    DataThemesActivePanelsStateModel,
    { tabIndex: number; vizIndex: number; panel: number }
  >; // TODO: unused
  addTab: Action<DataThemesActivePanelsStateModel>;
  addViz: Action<DataThemesActivePanelsStateModel, { tabIndex: number }>;
  reset: Action<DataThemesActivePanelsStateModel>;
}

export const DataThemesActivePanelsState: DataThemesActivePanelsStateModel = {
  value: [[1]],
  setValue: action(
    (state, payload: { tabIndex: number; vizIndex: number; panel: number }) => {
      // TODO: unused
      state.value[payload.tabIndex][payload.vizIndex] = payload.panel;
    }
  ),
  addTab: action((state) => {
    state.value.push([1]);
  }),
  addViz: action((state, payload: { tabIndex: number }) => {
    // Add a new value to the array of visualisations, with the length + 1 as the ID (length is 0 indexed so +1 is implicit)
    state.value[payload.tabIndex].push(state.value[payload.tabIndex].length);
  }),
  reset: action((state) => {
    state.value = [[1]];
  }),
};

export interface DataThemesTitlesStateModel {
  title: string;
  subTitle: string;
  tabTitles: string[];
  setTitle: Action<DataThemesTitlesStateModel, { title: string }>;
  setSubTitle: Action<DataThemesTitlesStateModel, { subTitle: string }>;
  setTabTitle: Action<
    DataThemesTitlesStateModel,
    { tabIndex: number; tabTitle: string }
  >;
  addTab: Action<DataThemesTitlesStateModel>;
  reset: Action<DataThemesTitlesStateModel>;
}

export const DataThemesTitlesState: DataThemesTitlesStateModel = {
  title: "New Theme",
  subTitle: "Subtitle",
  tabTitles: ["Tab 1"],
  setTitle: action((state, payload: { title: string }) => {
    state.title = payload.title;
  }),
  setSubTitle: action((state, payload: { subTitle: string }) => {
    state.subTitle = payload.subTitle;
  }),
  setTabTitle: action(
    (state, payload: { tabIndex: number; tabTitle: string }) => {
      state.tabTitles[payload.tabIndex] = payload.tabTitle;
    }
  ),
  addTab: action((state) => {
    state.tabTitles.push(`Tab ${state.tabTitles.length + 1}`);
  }),
  reset: action((state) => {
    state.title = "New Theme";
    state.subTitle = "Subtitle";
    state.tabTitles = ["Tab 1"];
  }),
};

export interface DataThemesTextContentStateModel {
  value: EditorState[][];
  vizIsTextContent: boolean[][];
  setValue: Action<
    DataThemesTextContentStateModel,
    { tab: number; viz: number; value: EditorState }
  >;
  addTab: Action<DataThemesTextContentStateModel>;
  addViz: Action<DataThemesTextContentStateModel, { tabIndex: number }>;
  reset: Action<DataThemesTextContentStateModel>;
}

export const DataThemesTextContentState: DataThemesTextContentStateModel = {
  value: [[EditorState.createEmpty()]],
  vizIsTextContent: [[false]],
  setValue: action(
    (state, payload: { tab: number; viz: number; value: EditorState }) => {
      state.value[payload.tab][payload.viz] = payload.value;
      state.vizIsTextContent[payload.tab][payload.viz] = true;
    }
  ),
  addTab: action((state) => {
    state.value.push([EditorState.createEmpty()]);
    state.vizIsTextContent.push([false]);
  }),
  addViz: action((state, payload: { tabIndex: number }) => {
    state.value[payload.tabIndex].push(EditorState.createEmpty());
    state.vizIsTextContent[payload.tabIndex].push(false);
  }),
  reset: action((state) => {
    state.value = [[EditorState.createEmpty()]];
    state.vizIsTextContent = [[false]];
  }),
};

export interface DataThemesPublicStateModel {
  value: boolean;
  setValue: Action<DataThemesPublicStateModel, boolean>;
}

export const DataThemesPublicState: DataThemesPublicStateModel = {
  value: true,
  setValue: action((state, payload: boolean) => {
    state.value = payload;
  }),
};
