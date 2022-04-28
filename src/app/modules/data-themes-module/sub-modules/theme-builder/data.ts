// @ts-ignore
import { baseOptions } from "@rawgraphs/rawgraphs-core";
import {
  barchart,
  barchartmultiset,
  barchartstacked,
  linechart,
  alluvialdiagram,
  treemap,
  // @ts-ignore
} from "@rawgraphs/rawgraphs-charts";

export const charts = {
  barchart,
  linechart,
  barchartmultiset,
  alluvialdiagram,
  treemap,
  barchartstacked,
};

export const defaultChartOptions = {
  barchart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: 1000,
    },
    height: {
      ...baseOptions.height,
      default: 750,
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
    showLegend: {
      ...barchart.visualOptions.showLegend,
      default: true,
    },
  },
  linechart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: 1000,
    },
    height: {
      ...baseOptions.height,
      default: 750,
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
      default: 1000,
    },
    height: {
      ...baseOptions.height,
      default: 750,
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
      default: 1000,
    },
    height: {
      ...baseOptions.height,
      default: 750,
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
      default: 1000,
    },
    height: {
      ...baseOptions.height,
      default: 750,
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
    showLegend: {
      ...treemap.visualOptions.showLegend,
      default: true,
    },
  },
  barchartstacked: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: 1000,
    },
    height: {
      ...baseOptions.height,
      default: 750,
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
