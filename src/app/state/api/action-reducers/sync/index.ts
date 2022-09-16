/* eslint-disable no-param-reassign */
import { action, Action } from "easy-peasy";

export interface ToolBoxPanelEligibilityAdvancedCheckboxStateModel {
  value: boolean;
  setValue: Action<ToolBoxPanelEligibilityAdvancedCheckboxStateModel, boolean>;
}

export const ToolBoxPanelEligibilityAdvancedCheckboxState: ToolBoxPanelEligibilityAdvancedCheckboxStateModel =
  {
    value: true,
    setValue: action((state, payload: boolean) => {
      state.value = payload;
    }),
  };

export interface ToolBoxPanelDonorMapTypeStateModel {
  value: string;
  setValue: Action<ToolBoxPanelDonorMapTypeStateModel, string>;
}

export const ToolBoxPanelDonorMapTypeState: ToolBoxPanelDonorMapTypeStateModel =
  {
    value: "Pledge",
    setValue: action((state, payload: string) => {
      state.value = payload;
    }),
  };

export interface ToolBoxPanelDonorMapViewStateModel {
  value: string;
  setValue: Action<ToolBoxPanelDonorMapViewStateModel, string>;
}

export const ToolBoxPanelDonorMapViewState: ToolBoxPanelDonorMapTypeStateModel =
  {
    value: "Public Sector",
    setValue: action((state, payload: string) => {
      state.value = payload;
    }),
  };

export interface ToolBoxPanelAggregateByStateModel {
  value: string;
  setValue: Action<ToolBoxPanelDonorMapViewStateModel, string>;
}

export const ToolBoxPanelAggregateByState: ToolBoxPanelAggregateByStateModel = {
  value: "",
  setValue: action((state, payload: string) => {
    state.value = payload;
  }),
};

export interface ToolBoxPanelPFPeriodStateModel {
  value: number;
  setValue: Action<ToolBoxPanelPFPeriodStateModel, number>;
}

export const ToolBoxPanelPFPeriodState: ToolBoxPanelPFPeriodStateModel = {
  value: 0,
  setValue: action((state, payload: number) => {
    state.value = payload;
  }),
};

export interface PageHeaderVizDrilldownsStateModel {
  value: { name: string }[];
  setValue: Action<PageHeaderVizDrilldownsStateModel, { name: string }[]>;
}

export const PageHeaderVizDrilldownsState: PageHeaderVizDrilldownsStateModel = {
  value: [],
  setValue: action((state, payload: { name: string }[]) => {
    state.value = payload;
  }),
};

export interface ToolBoxPanelInvestmentsMapViewStateModel {
  value: string;
  setValue: Action<ToolBoxPanelInvestmentsMapViewStateModel, string>;
}

export const ToolBoxPanelInvestmentsMapViewState: ToolBoxPanelInvestmentsMapViewStateModel =
  {
    value: "countries",
    setValue: action((state, payload: string) => {
      state.value = payload;
    }),
  };

export interface ToolBoxPanelAllocationsPeriodStateModel {
  value: string;
  setValue: Action<ToolBoxPanelAllocationsPeriodStateModel, string>;
}

export const ToolBoxPanelAllocationsPeriodState: ToolBoxPanelAllocationsPeriodStateModel =
  {
    value: "2014 - 2016",
    setValue: action((state, payload: string) => {
      state.value = payload;
    }),
  };

export interface ToolBoxPanelEligibilityYearStateModel {
  value: string;
  setValue: Action<ToolBoxPanelEligibilityYearStateModel, string>;
}

export const ToolBoxPanelEligibilityYearState: ToolBoxPanelEligibilityYearStateModel =
  {
    value: "2020",
    setValue: action((state, payload: string) => {
      state.value = payload;
    }),
  };

export interface ToolBoxPanelResultsYearStateModel {
  value: string;
  setValue: Action<ToolBoxPanelResultsYearStateModel, string>;
}

export const ToolBoxPanelResultsYearState: ToolBoxPanelResultsYearStateModel = {
  value: "2020",
  setValue: action((state, payload: string) => {
    state.value = payload;
  }),
};

export interface ToolBoxPanelDisbursementsSliderValuesModel {
  max: number;
  setMax: Action<ToolBoxPanelDisbursementsSliderValuesModel, number>;
  values: number[];
  setValues: Action<ToolBoxPanelDisbursementsSliderValuesModel, number[]>;
}

export const ToolBoxPanelDisbursementsSliderValues: ToolBoxPanelDisbursementsSliderValuesModel =
  {
    max: 0,
    setMax: action((state, payload: number) => {
      state.max = payload;
    }),
    values: [0, 0],
    setValues: action((state, payload: number[]) => {
      state.values = payload;
    }),
  };

export interface ToolBoxPanelBudgetFlowDrilldownSelectorsModel {
  levels: {
    name: string;
    items: string[];
  }[];
  setLevels: Action<
    ToolBoxPanelBudgetFlowDrilldownSelectorsModel,
    {
      name: string;
      items: string[];
    }[]
  >;
  selectedLevelValue: { id: string | undefined; filterStr: string | undefined };
  setSelectedLevelValue: Action<
    ToolBoxPanelBudgetFlowDrilldownSelectorsModel,
    { id: string | undefined; filterStr: string | undefined }
  >;
}

export const ToolBoxPanelBudgetFlowDrilldownSelectors: ToolBoxPanelBudgetFlowDrilldownSelectorsModel =
  {
    levels: [],
    setLevels: action(
      (
        state,
        payload: {
          name: string;
          items: string[];
        }[]
      ) => {
        state.levels = payload;
      }
    ),
    selectedLevelValue: { id: undefined, filterStr: undefined },
    setSelectedLevelValue: action(
      (
        state,
        payload: { id: string | undefined; filterStr: string | undefined }
      ) => {
        state.selectedLevelValue = payload;
      }
    ),
  };

export interface ToolBoxPanelBudgetTimeCycleDrilldownYearSelectorModel {
  options: string[];
  setOptions: Action<
    ToolBoxPanelBudgetTimeCycleDrilldownYearSelectorModel,
    string[]
  >;
  selectedOption: string | undefined;
  setSelectedOption: Action<
    ToolBoxPanelBudgetTimeCycleDrilldownYearSelectorModel,
    string | undefined
  >;
}

export const ToolBoxPanelBudgetTimeCycleDrilldownYearSelector: ToolBoxPanelBudgetTimeCycleDrilldownYearSelectorModel =
  {
    options: [],
    setOptions: action((state, payload: string[]) => {
      state.options = payload;
    }),
    selectedOption: undefined,
    setSelectedOption: action((state, payload: string | undefined) => {
      state.selectedOption = payload;
    }),
  };

export interface DataSourceStateModel {
  value: string;
  setValue: Action<DataSourceStateModel, string>;
}

export const DataSourceState: DataSourceStateModel = {
  value: "TGFOData",
  setValue: action((state, payload: string) => {
    state.value = payload;
  }),
};
