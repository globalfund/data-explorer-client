/* eslint-disable no-param-reassign */
import filter from "lodash/filter";
import isEmpty from "lodash/isEmpty";
import { EditorState } from "draft-js";
import { action, Action } from "easy-peasy";

export interface DataThemesStepSelectionsStateModel {
  step1: [[{ dataset: string | null }]];
  setStep1: Action<
    DataThemesStepSelectionsStateModel,
    {
      tab: number;
      viz: number;
      dataset: string | null;
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
  copyViz: Action<
    DataThemesStepSelectionsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeViz: Action<
    DataThemesStepSelectionsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeTab: Action<DataThemesStepSelectionsStateModel, { tabIndex: number }>;
}

export const DataThemesStepSelectionsState: DataThemesStepSelectionsStateModel =
  {
    step1: [[{ dataset: null }]],
    setStep1: action(
      (
        state,
        payload: {
          tab: number;
          viz: number;
          dataset: string | null;
        }
      ) => {
        state.step1[payload.tab][payload.viz] = {
          dataset: payload.dataset,
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
      state.step1 = [[{ dataset: null }]];
    }),
    addTab: action((state) => {
      state.step1.push([{ dataset: null }]);
    }),
    addViz: action((state, payload: { tabIndex: number }) => {
      state.step1[payload.tabIndex].push({ dataset: null });
    }),
    copyViz: action(
      (state, payload: { tabIndex: number; vizIndex: number }) => {
        state.step1[payload.tabIndex].push(
          state.step1[payload.tabIndex][payload.vizIndex]
        );
      }
    ),
    removeViz: action(
      (state, payload: { tabIndex: number; vizIndex: number }) => {
        state.step1[payload.tabIndex].splice(payload.vizIndex, 1);
      }
    ),
    removeTab: action((state, payload: { tabIndex: number }) => {
      state.step1.splice(payload.tabIndex, 1);
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
  copyViz: Action<
    DataThemesStepChartTypeStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeViz: Action<
    DataThemesStepChartTypeStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeTab: Action<DataThemesStepChartTypeStateModel, { tabIndex: number }>;
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
    if (
      state.value[payload.tabIndex][
        state.value[payload.tabIndex].length - 1
      ] !== null
    ) {
      state.value[payload.tabIndex].push(null);
    }
  }),
  copyViz: action((state, payload: { tabIndex: number; vizIndex: number }) => {
    state.value[payload.tabIndex].push(
      state.value[payload.tabIndex][payload.vizIndex]
    );
  }),
  removeViz: action(
    (state, payload: { tabIndex: number; vizIndex: number }) => {
      state.value[payload.tabIndex].splice(payload.vizIndex, 1);
    }
  ),
  removeTab: action((state, payload: { tabIndex: number }) => {
    state.value.splice(payload.tabIndex, 1);
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
  copyViz: Action<
    DataThemesMappingStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeViz: Action<
    DataThemesMappingStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeTab: Action<DataThemesMappingStateModel, { tabIndex: number }>;
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
    if (
      !isEmpty(
        state.value[payload.tabIndex][state.value[payload.tabIndex].length - 1]
      )
    ) {
      state.value[payload.tabIndex].push({});
    }
  }),
  copyViz: action((state, payload: { tabIndex: number; vizIndex: number }) => {
    state.value[payload.tabIndex].push(
      state.value[payload.tabIndex][payload.vizIndex]
    );
  }),
  removeViz: action(
    (state, payload: { tabIndex: number; vizIndex: number }) => {
      state.value[payload.tabIndex].splice(payload.vizIndex, 1);
    }
  ),
  removeTab: action((state, payload: { tabIndex: number }) => {
    state.value.splice(payload.tabIndex, 1);
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
  addTab: Action<DataThemesIdsStateModel, { addPlaceholder?: boolean }>;
  addViz: Action<DataThemesIdsStateModel, { tabIndex: number }>;
  removeViz: Action<
    DataThemesIdsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  reset: Action<DataThemesIdsStateModel>;
  removeTab: Action<DataThemesIdsStateModel, { tabIndex: number }>;
}

export const DataThemesIdsState: DataThemesIdsStateModel = {
  value: [[0]],
  // setValue: action((state, payload: {tabIndex: number, vizIndex: number}) => {  // TODO: unused
  //   state.value[payload.tabIndex][payload.vizIndex] = payload.vizIndex;
  // }),
  addTab: action((state, payload: { addPlaceholder?: boolean }) => {
    // Add a new array of visualisations starting at id 0.
    state.value.push(payload.addPlaceholder ? [0] : []);
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
  removeTab: action((state, payload: { tabIndex: number }) => {
    state.value.splice(payload.tabIndex, 1);
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
  removeViz: Action<
    DataThemesActivePanelsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  reset: Action<DataThemesActivePanelsStateModel>;
  removeTab: Action<DataThemesActivePanelsStateModel, { tabIndex: number }>;
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
  removeViz: action(
    (state, payload: { tabIndex: number; vizIndex: number }) => {
      state.value[payload.tabIndex].splice(payload.vizIndex, 1);
    }
  ),
  reset: action((state) => {
    state.value = [[1]];
  }),
  removeTab: action((state, payload: { tabIndex: number }) => {
    state.value.splice(payload.tabIndex, 1);
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
  removeTab: Action<DataThemesTitlesStateModel, { tabIndex: number }>;
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
  removeTab: action((state, payload: { tabIndex: number }) => {
    state.tabTitles.splice(payload.tabIndex, 1);
  }),
};

export interface DataThemesTextContentStateModel {
  value: EditorState[][];
  vizIsTextContent: boolean[][];
  setValue: Action<
    DataThemesTextContentStateModel,
    { tab: number; viz: number; value: EditorState }
  >;
  addTab: Action<DataThemesTextContentStateModel, { addPlaceholder?: boolean }>;
  addViz: Action<DataThemesTextContentStateModel, { tabIndex: number }>;
  copyViz: Action<
    DataThemesTextContentStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeViz: Action<
    DataThemesTextContentStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  reset: Action<DataThemesTextContentStateModel>;
  removeTab: Action<DataThemesTextContentStateModel, { tabIndex: number }>;
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
  addTab: action((state, payload: { addPlaceholder?: boolean }) => {
    state.value.push(payload.addPlaceholder ? [EditorState.createEmpty()] : []);
    state.vizIsTextContent.push(payload.addPlaceholder ? [false] : []);
  }),
  addViz: action((state, payload: { tabIndex: number }) => {
    state.value[payload.tabIndex].push(EditorState.createEmpty());
    state.vizIsTextContent[payload.tabIndex].push(false);
  }),
  copyViz: action((state, payload: { tabIndex: number; vizIndex: number }) => {
    state.value[payload.tabIndex].push(
      state.value[payload.tabIndex][payload.vizIndex]
    );
    state.vizIsTextContent[payload.tabIndex].push(
      state.vizIsTextContent[payload.tabIndex][payload.vizIndex]
    );
  }),
  removeViz: action(
    (state, payload: { tabIndex: number; vizIndex: number }) => {
      state.value[payload.tabIndex].splice(payload.vizIndex, 1);
      state.vizIsTextContent[payload.tabIndex].splice(payload.vizIndex, 1);
    }
  ),
  reset: action((state) => {
    state.value = [[EditorState.createEmpty()]];
    state.vizIsTextContent = [[false]];
  }),
  removeTab: action((state, payload: { tabIndex: number }) => {
    state.value.splice(payload.tabIndex, 1);
    state.vizIsTextContent.splice(payload.tabIndex, 1);
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

export interface DataThemesVizOrderStateModel {
  value: {
    order: number[];
    hasChanged: boolean;
  };
  setValue: Action<
    DataThemesVizOrderStateModel,
    {
      order: number[];
      hasChanged: boolean;
    }
  >;
  clear: Action<DataThemesVizOrderStateModel>;
}

export const DataThemesVizOrderState: DataThemesVizOrderStateModel = {
  value: {
    order: [],
    hasChanged: false,
  },
  setValue: action(
    (
      state,
      payload: {
        order: number[];
        hasChanged: boolean;
      }
    ) => {
      state.value = payload;
    }
  ),
  clear: action((state) => {
    state.value = {
      order: [],
      hasChanged: false,
    };
  }),
};

export interface DataThemesVizDeletedStateModel {
  value: boolean;
  setValue: Action<DataThemesVizDeletedStateModel, boolean>;
}

export interface DataThemesTabDeletedStateModel {
  value: boolean;
  setValue: Action<DataThemesTabDeletedStateModel, boolean>;
}

export const DataThemesTabDeletedState: DataThemesTabDeletedStateModel = {
  value: false,
  setValue: action((state, payload: boolean) => {
    state.value = payload;
  }),
};

export const DataThemesVizDeletedState: DataThemesVizDeletedStateModel = {
  value: false,
  setValue: action((state, payload: boolean) => {
    state.value = payload;
  }),
};

export interface DataThemesVizDuplicatedStateModel {
  value: boolean;
  setValue: Action<DataThemesVizDuplicatedStateModel, boolean>;
}

export const DataThemesVizDuplicatedState: DataThemesVizDuplicatedStateModel = {
  value: false,
  setValue: action((state, payload: boolean) => {
    state.value = payload;
  }),
};

export interface DataThemesEnabledFilterOptionGroupsStateModel {
  value: [[string[]]];
  setValue: Action<
    DataThemesEnabledFilterOptionGroupsStateModel,
    { tab: number; viz: number; value: string[] }
  >;
  addTab: Action<DataThemesEnabledFilterOptionGroupsStateModel>;
  addViz: Action<
    DataThemesEnabledFilterOptionGroupsStateModel,
    { tabIndex: number }
  >;
  copyViz: Action<
    DataThemesEnabledFilterOptionGroupsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeViz: Action<
    DataThemesEnabledFilterOptionGroupsStateModel,
    { tabIndex: number; vizIndex: number }
  >;
  removeTab: Action<
    DataThemesEnabledFilterOptionGroupsStateModel,
    { tabIndex: number }
  >;
  clear: Action<DataThemesEnabledFilterOptionGroupsStateModel>;
}

export const DataThemesEnabledFilterOptionGroupsState: DataThemesEnabledFilterOptionGroupsStateModel =
  {
    value: [[[]]],
    setValue: action(
      (state, payload: { tab: number; viz: number; value: string[] }) => {
        state.value[payload.tab][payload.viz] = payload.value;
      }
    ),
    addTab: action((state) => {
      state.value.push([[]]);
    }),
    addViz: action((state, payload: { tabIndex: number }) => {
      if (
        state.value[payload.tabIndex][
          state.value[payload.tabIndex].length - 1
        ] !== null
      ) {
        state.value[payload.tabIndex].push([]);
      }
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
    clear: action((state) => {
      state.value = [[[]]];
    }),
  };
