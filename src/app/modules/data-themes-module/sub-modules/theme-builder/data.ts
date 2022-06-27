// @ts-ignore
import { baseOptions } from "@rawgraphs/rawgraphs-core";
import {
  alluvialdiagram,
  arcdiagram,
  barchart,
  barchartmultiset,
  barchartstacked,
  beeswarm,
  boxplot,
  bubblechart,
  bumpchart,
  // calendarHeatmap,
  circlepacking,
  circularDendrogram,
  contourPlot,
  convexHull,
  dendrogram,
  ganttChart,
  hexagonalBinning,
  horizongraph,
  linechart,
  matrixplot,
  parallelcoordinates,
  piechart,
  radarchart,
  sankeydiagram,
  slopechart,
  streamgraph,
  sunburst,
  treemap,
  violinplot,
  voronoidiagram,
  voronoitreemap,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-charts";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export const charts = {
  alluvialdiagram,
  arcdiagram,
  barchart,
  barchartmultiset,
  barchartstacked,
  beeswarm,
  boxplot,
  bubblechart,
  bumpchart,
  // calendarHeatmap,
  circlepacking,
  circularDendrogram,
  contourPlot,
  convexHull,
  dendrogram,
  ganttChart,
  hexagonalBinning,
  horizongraph,
  linechart,
  matrixplot,
  parallelcoordinates,
  piechart,
  radarchart,
  sankeydiagram,
  slopechart,
  streamgraph,
  sunburst,
  treemap,
  violinplot,
  voronoidiagram,
  voronoitreemap,
};

export const CHART_DEFAULT_WIDTH = 1000;
export const CHART_DEFAULT_HEIGHT = 750;

export const defaultChartOptions = {
  barchart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...barchart.visualOptions,
    marginTop: {
      ...barchart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...barchart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...barchart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...barchart.visualOptions.marginBottom,
      default: 50,
    },
    padding: {
      ...barchart.visualOptions.padding,
      default: 10,
    },
    sortBarsBy: {
      ...barchart.visualOptions.sortBarsBy,
      default: "totalDescending",
    },
  },
  linechart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...linechart.visualOptions,
    marginTop: {
      ...linechart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...linechart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...linechart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...linechart.visualOptions.marginBottom,
      default: 50,
    },
  },
  barchartmultiset: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...barchartmultiset.visualOptions,
    marginTop: {
      ...barchartmultiset.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...barchartmultiset.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...barchartmultiset.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...barchartmultiset.visualOptions.marginBottom,
      default: 50,
    },
  },
  alluvialdiagram: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...alluvialdiagram.visualOptions,
    marginTop: {
      ...alluvialdiagram.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...alluvialdiagram.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...alluvialdiagram.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...alluvialdiagram.visualOptions.marginBottom,
      default: 50,
    },
    nodesWidth: {
      ...alluvialdiagram.visualOptions.nodesWidth,
      default: 20,
    },
    nodesPadding: {
      ...alluvialdiagram.visualOptions.nodesPadding,
      default: 10,
    },
    linksOpacity: {
      ...alluvialdiagram.visualOptions.linksOpacity,
      default: 0.5,
    },
    linksBlendMode: {
      ...alluvialdiagram.visualOptions.linksBlendMode,
      default: "normal",
    },
    sortNodesBy: {
      ...alluvialdiagram.visualOptions.sortNodesBy,
      default: "auto",
    },
    showValues: {
      ...alluvialdiagram.visualOptions.showValues,
      default: true,
    },
  },
  treemap: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...treemap.visualOptions,
    marginTop: {
      ...treemap.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...treemap.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...treemap.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...treemap.visualOptions.marginBottom,
      default: 50,
    },
    showHierarchyLabels: {
      ...treemap.visualOptions.showHierarchyLabels,
      default: true,
    },
  },
  barchartstacked: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...barchartstacked.visualOptions,
    marginTop: {
      ...barchartstacked.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...barchartstacked.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...barchartstacked.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...barchartstacked.visualOptions.marginBottom,
      default: 50,
    },
  },
};

export interface DataThemeTabVizAPIModel {
  id: string;
  vizType:
    | "barchart"
    | "linechart"
    | "barchartmultiset"
    | "alluvialdiagram"
    | "treemap"
    | "barchartstacked";
  datasetId:
    | "investment-signed"
    | "investment-committed"
    | "investment-disbursed"
    | "budgets"
    | "pledges-contributions"
    | "allocations"
    | "grants"
    | "eligibility";
  data: { [key: string]: string | number | null }[];
  mapping: any;
  vizOptions: any;
  filterOptionGroups: FilterGroupModel[];
  appliedFilters: { [key: string]: any[] };
  liveData: boolean;
  createdDate: Date;
}

export interface DataThemeTabTextAPIModel {
  id: string;
  content: object;
  createdDate: Date;
}

export interface DataThemeTabAPIModel {
  id: string;
  title: string;
  content: (DataThemeTabTextAPIModel | DataThemeTabVizAPIModel)[];
  createdDate: Date;
}

export interface DataThemeAPIModel {
  id: string;
  title: string;
  subTitle: string;
  public: boolean;
  tabs: DataThemeTabAPIModel[];
  createdDate: Date;
}

export const emptyDataThemeAPI: DataThemeAPIModel = {
  id: "",
  title: "",
  subTitle: "",
  public: false,
  createdDate: new Date(),
  tabs: [
    {
      id: "",
      title: "",
      content: [
        {
          id: "",
          mapping: {},
          vizOptions: {},
          liveData: false,
          createdDate: new Date(),
          filterOptionGroups: [],
          appliedFilters: {},
          data: [],
          vizType: "barchart",
          datasetId: "investment-signed",
        },
      ],
      createdDate: new Date(),
    },
  ],
};
