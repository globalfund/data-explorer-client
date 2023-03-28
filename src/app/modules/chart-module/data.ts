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
  echartsBarchart,
  echartsGeomap,
  echartsLinechart,
  echartsSankey,
  echartsTreemap,
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
  echartsBarchart,
  echartsGeomap,
  echartsLinechart,
  echartsSankey,
  echartsTreemap,
};

export const CHART_DEFAULT_WIDTH = 1000;
export const CHART_DEFAULT_HEIGHT = 750;

export const defaultChartOptions = {
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
    showLegend: {
      ...alluvialdiagram.visualOptions.showLegend,
      default: true,
    },
  },
  arcdiagram: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...arcdiagram.visualOptions,
    marginTop: {
      ...arcdiagram.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...arcdiagram.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...arcdiagram.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...arcdiagram.visualOptions.marginBottom,
      default: 50,
    },
    padding: {
      ...arcdiagram.visualOptions.padding,
      default: 10,
    },
    showLegend: {
      ...arcdiagram.visualOptions.showLegend,
      default: true,
    },
  },
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
    showLegend: {
      ...barchart.visualOptions.showLegend,
      default: true,
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
    showLegend: {
      ...barchartmultiset.visualOptions.showLegend,
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
    showLegend: {
      ...barchartstacked.visualOptions.showLegend,
      default: true,
    },
  },
  beeswarm: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...beeswarm.visualOptions,
    marginTop: {
      ...beeswarm.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...beeswarm.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...beeswarm.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...beeswarm.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...beeswarm.visualOptions.showLegend,
      default: true,
    },
  },
  boxplot: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...boxplot.visualOptions,
    marginTop: {
      ...boxplot.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...boxplot.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...boxplot.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...boxplot.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...boxplot.visualOptions.showLegend,
      default: true,
    },
  },
  bubblechart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...bubblechart.visualOptions,
    marginTop: {
      ...bubblechart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...bubblechart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...bubblechart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...bubblechart.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...bubblechart.visualOptions.showLegend,
      default: true,
    },
  },
  bumpchart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...bumpchart.visualOptions,
    marginTop: {
      ...bumpchart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...bumpchart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...bumpchart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...bumpchart.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...bumpchart.visualOptions.showLegend,
      default: true,
    },
  },
  circlepacking: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...circlepacking.visualOptions,
    marginTop: {
      ...circlepacking.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...circlepacking.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...circlepacking.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...circlepacking.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...circlepacking.visualOptions.showLegend,
      default: true,
    },
  },
  circularDendrogram: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...circularDendrogram.visualOptions,
    marginTop: {
      ...circularDendrogram.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...circularDendrogram.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...circularDendrogram.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...circularDendrogram.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...circularDendrogram.visualOptions.showLegend,
      default: true,
    },
  },
  contourPlot: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...contourPlot.visualOptions,
    marginTop: {
      ...contourPlot.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...contourPlot.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...contourPlot.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...contourPlot.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...contourPlot.visualOptions.showLegend,
      default: true,
    },
  },
  convexHull: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...convexHull.visualOptions,
    marginTop: {
      ...convexHull.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...convexHull.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...convexHull.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...convexHull.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...convexHull.visualOptions.showLegend,
      default: true,
    },
  },
  dendrogram: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...dendrogram.visualOptions,
    marginTop: {
      ...dendrogram.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...dendrogram.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...dendrogram.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...dendrogram.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...dendrogram.visualOptions.showLegend,
      default: true,
    },
  },
  ganttChart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...ganttChart.visualOptions,
    marginTop: {
      ...ganttChart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...ganttChart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...ganttChart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...ganttChart.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...ganttChart.visualOptions.showLegend,
      default: true,
    },
  },
  hexagonalBinning: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...hexagonalBinning.visualOptions,
    marginTop: {
      ...hexagonalBinning.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...hexagonalBinning.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...hexagonalBinning.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...hexagonalBinning.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...hexagonalBinning.visualOptions.showLegend,
      default: true,
    },
  },
  horizongraph: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...horizongraph.visualOptions,
    marginTop: {
      ...horizongraph.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...horizongraph.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...horizongraph.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...horizongraph.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...horizongraph.visualOptions.showLegend,
      default: true,
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
    showLegend: {
      ...linechart.visualOptions.showLegend,
      default: true,
    },
  },
  matrixplot: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...matrixplot.visualOptions,
    marginTop: {
      ...matrixplot.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...matrixplot.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...matrixplot.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...matrixplot.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...matrixplot.visualOptions.showLegend,
      default: true,
    },
  },
  parallelcoordinates: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...parallelcoordinates.visualOptions,
    marginTop: {
      ...parallelcoordinates.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...parallelcoordinates.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...parallelcoordinates.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...parallelcoordinates.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...parallelcoordinates.visualOptions.showLegend,
      default: true,
    },
  },
  piechart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...piechart.visualOptions,
    marginTop: {
      ...piechart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...piechart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...piechart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...piechart.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...piechart.visualOptions.showLegend,
      default: true,
    },
  },
  radarchart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...radarchart.visualOptions,
    marginTop: {
      ...radarchart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...radarchart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...radarchart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...radarchart.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...radarchart.visualOptions.showLegend,
      default: true,
    },
  },
  sankeydiagram: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...sankeydiagram.visualOptions,
    marginTop: {
      ...sankeydiagram.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...sankeydiagram.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...sankeydiagram.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...sankeydiagram.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...sankeydiagram.visualOptions.showLegend,
      default: true,
    },
  },
  slopechart: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...slopechart.visualOptions,
    marginTop: {
      ...slopechart.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...slopechart.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...slopechart.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...slopechart.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...slopechart.visualOptions.showLegend,
      default: true,
    },
  },
  streamgraph: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...streamgraph.visualOptions,
    marginTop: {
      ...streamgraph.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...streamgraph.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...streamgraph.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...streamgraph.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...streamgraph.visualOptions.showLegend,
      default: true,
    },
  },
  sunburst: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...sunburst.visualOptions,
    marginTop: {
      ...sunburst.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...sunburst.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...sunburst.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...sunburst.visualOptions.marginBottom,
      default: 50,
    },
    showLegend: {
      ...sunburst.visualOptions.showLegend,
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
    showLegend: {
      ...treemap.visualOptions.showLegend,
      default: true,
    },
  },
  violinplot: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...violinplot.visualOptions,
    marginTop: {
      ...violinplot.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...violinplot.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...violinplot.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...violinplot.visualOptions.marginBottom,
      default: 50,
    },
    showHierarchyLabels: {
      ...violinplot.visualOptions.showHierarchyLabels,
      default: true,
    },
    showLegend: {
      ...violinplot.visualOptions.showLegend,
      default: true,
    },
  },
  voronoidiagram: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...voronoidiagram.visualOptions,
    marginTop: {
      ...voronoidiagram.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...voronoidiagram.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...voronoidiagram.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...voronoidiagram.visualOptions.marginBottom,
      default: 50,
    },
    showHierarchyLabels: {
      ...voronoidiagram.visualOptions.showHierarchyLabels,
      default: true,
    },
    showLegend: {
      ...voronoidiagram.visualOptions.showLegend,
      default: true,
    },
  },
  voronoitreemap: {
    ...baseOptions,
    width: {
      ...baseOptions.width,
      default: CHART_DEFAULT_WIDTH,
    },
    height: {
      ...baseOptions.height,
      default: CHART_DEFAULT_HEIGHT,
    },
    ...voronoitreemap.visualOptions,
    marginTop: {
      ...voronoitreemap.visualOptions.marginTop,
      default: 50,
    },
    marginLeft: {
      ...voronoitreemap.visualOptions.marginLeft,
      default: 70,
    },
    marginRight: {
      ...voronoitreemap.visualOptions.marginRight,
      default: 70,
    },
    marginBottom: {
      ...voronoitreemap.visualOptions.marginBottom,
      default: 50,
    },
    showHierarchyLabels: {
      ...voronoitreemap.visualOptions.showHierarchyLabels,
      default: true,
    },
    showLegend: {
      ...voronoitreemap.visualOptions.showLegend,
      default: true,
    },
  },
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
};

export interface ChartAPIModel {
  id: string;
  name: string;
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
  mapping: any;
  vizOptions: any;
  appliedFilters: { [key: string]: any[] };
  createdDate: Date;
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
  lock: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 5,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  customize: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 6,
    exportView: false,
    filtersView: false,
    tabsDisabled: true,
  },
  export: {
    textView: false,
    guideView: false,
    dataSteps: true,
    openPanel: 7,
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
  vizType: "barchart",
  datasetId: "investment-signed",
};
