// @ts-ignore
import { baseOptions } from "@rawgraphs/rawgraphs-core";
import {
  echartsBarchart,
  echartsGeomap,
  echartsLinechart,
  echartsSankey,
  echartsTreemap,
  bigNumber,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-charts";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export const charts = {
  echartsBarchart,
  echartsGeomap,
  echartsLinechart,
  echartsSankey,
  echartsTreemap,
  bigNumber,
};

export const CHART_DEFAULT_WIDTH = 1000;
export const CHART_DEFAULT_HEIGHT = 750;

export const defaultChartOptions = {
  echartsBarchart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...echartsBarchart.visualOptions,
  },
  echartsGeomap: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...echartsGeomap.visualOptions,
  },
  echartsLinechart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...echartsLinechart.visualOptions,
  },
  echartsSankey: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...echartsSankey.visualOptions,
  },
  echartsTreemap: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...echartsTreemap.visualOptions,
    marginTop: {
      ...echartsTreemap.visualOptions.marginTop,
      default: 0,
    },
    marginLeft: {
      ...echartsTreemap.visualOptions.marginLeft,
      default: 0,
    },
    marginRight: {
      ...echartsTreemap.visualOptions.marginRight,
      default: 0,
    },
    marginBottom: {
      ...echartsTreemap.visualOptions.marginBottom,
      default: 0,
    },
  },
  bigNumber: {},
};

export interface ChartAPIModel {
  id: string;
  name: string;
  vizType: string;
  datasetId: string;
  mapping: any;
  vizOptions: any;
  appliedFilters: { [key: string]: any[] };
  createdDate: Date;
  public?: boolean;
}

export interface ChartRenderedItem {
  renderedContent: string;
  appliedFilters: { [key: string]: any[] };
  filterOptionGroups: FilterGroupModel[];
  dataTypes: any;
  mappedData: any;
  dimensions: any;
  ssr: boolean;
}

export interface DatasetAPIModel {
  id: string;
  name: string;
  description: string;
  public: boolean;
  category: string;
  createdDate: Date;
}

export const emptyDatasetAPI: DatasetAPIModel = {
  id: "",
  name: "",
  description: "",
  public: false,
  category: "",
  createdDate: new Date(),
};

interface ChartRoutesConfigModel {
  [key: string]: {
    textView: boolean;
    guideView: boolean;
    dataSteps: boolean;
    openPanel?: number;
    exportView: boolean;
    filtersView: boolean;
    tabsDisabled: boolean;
  };
}

export const routeToConfig: ChartRoutesConfigModel = {
  initial: {
    textView: false,
    guideView: true,
    dataSteps: false,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  data: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 1,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  "preview-data": {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 1,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  "chart-type": {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 2,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  mapping: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 3,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  filters: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 4,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  customize: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 5,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  text: {
    textView: true,
    guideView: false,
    dataSteps: false,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  new: {
    textView: false,
    guideView: false,
    dataSteps: false,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  preview: {
    textView: false,
    guideView: false,
    dataSteps: false,
    exportView: false,
    filtersView: true,
    tabsDisabled: false,
  },
};

export const emptyChartAPI: ChartAPIModel = {
  id: "",
  name: "",
  createdDate: new Date(),
  mapping: {},
  vizOptions: {},
  appliedFilters: {},
  vizType: "echartsBarchart",
  datasetId: "investment-signed",
};
