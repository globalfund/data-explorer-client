import React from "react";
import uniqBy from "lodash/uniqBy";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import {
  BarChart,
  LineChart,
  MapChart,
  SankeyChart,
  TreemapChart,
} from "echarts/charts";
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
} from "echarts/components";

echarts.use([
  TooltipComponent,
  VisualMapComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  LineChart,
  MapChart,
  SankeyChart,
  TreemapChart,
  SVGRenderer,
]);

export function useDataThemesEchart() {
  function onResize(chart: echarts.EChartsType, height?: number) {
    const container = document.getElementById("common-chart-render-container");
    chart.resize({
      width: container?.clientWidth,
      height: height || "auto",
    });
  }

  function echartsBarchart(data: any, visualOptions: any) {
    const {
      // artboard
      // height,
      background,
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // chart options
      // orientation,
      // Tooltip
      showTooltip,
      isMonetaryValue,
      label,
      legend,
      legendHoverLink,
      barWidth,
      // stack,
    } = visualOptions;

    const bars = data.map((d: any) => d.bars);
    const sizes = data.map((d: any) => d.size);

    const option = {
      grid: {
        top: marginTop,
        left: marginLeft,
        right: marginRight,
        bottom: marginBottom,
      },
      legend: {
        show: legend,
      },
      xAxis: { data: bars },
      yAxis: { type: "value" },
      // xAxis: orientation === "horizontal" ? { type: "value" } : { data: bars },
      // yAxis: orientation === "vertical" ? { type: "value" } : { data: bars },
      backgroundColor: background,
      series: [
        {
          name: "legend",
          // height,
          type: "bar",

          data: sizes,
          realtimeSort: true,
          legendHoverLink: legendHoverLink,
          // stack: stack,
          barWidth: barWidth,
          label: {
            show: label,
            formatter: (params: any) => {
              return `${params.name}: ${
                isMonetaryValue
                  ? formatFinancialValue(params.value)
                  : params.value
              }`;
            },
          },
        },
      ],
      tooltip: {
        trigger: showTooltip ? "item" : "none",
        confine: true,
        formatter: (params: any) => {
          return `${params.name}: ${
            isMonetaryValue ? formatFinancialValue(params.value) : params.value
          }`;
        },
      },
    };

    return option;
  }

  function echartsGeomap(data: any, visualOptions: any) {
    const {
      // artboard
      height,
      background,
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // Tooltip
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    echarts.registerMap("World", data.geoJSON);

    const sizes = data.results.map((d: any) => d.value);

    const option = {
      tooltip: {
        trigger: showTooltip ? "item" : "none",
        showDelay: 0,
        transitionDuration: 0.2,
        confine: true,
        formatter: (params: any) => {
          if (params.value) {
            return `${params.name}: ${
              isMonetaryValue
                ? formatFinancialValue(params.value)
                : params.value
            }`;
          }
        },
      },
      visualMap: {
        left: "right",
        min: Math.min(...sizes),
        max: Math.max(...sizes),
        inRange: {
          color: [
            "#313695",
            "#4575b4",
            "#74add1",
            "#abd9e9",
            "#e0f3f8",
            "#ffffbf",
            "#fee090",
            "#fdae61",
            "#f46d43",
            "#d73027",
            "#a50026",
          ],
        },
        text: ["High", "Low"],
        calculable: true,
      },
      series: [
        {
          type: "map",
          height,
          roam: true,
          map: "World",
          data: data.results,
          top: marginTop,
          left: marginLeft,
          right: marginRight,
          bottom: marginBottom,
          emphasis: {
            label: {
              show: false,
            },
            itemStyle: {
              areaColor: "#cdd4df",
            },
          },
          select: {
            disabled: true,
          },
        },
      ],
    };

    return option;
  }

  function echartsLinechart(data: any, visualOptions: any) {
    const {
      // artboard
      background,
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // chart options
      stack,
      showLegend,
      label,
      showArea,
      lineStyle,
      lineWidth,
      // Tooltip
      showTooltip,
      isMonetaryValue,
      legendHoverLink,
    } = visualOptions;

    const option = {
      grid: {
        top: marginTop,
        left: marginLeft,
        right: marginRight,
        bottom: marginBottom,
      },
      xAxis: {
        type: "category",
        data: data.xAxisValues,
      },
      yAxis: {
        type: "value",
      },
      legend: {
        show: showLegend,
        data: data.lines.map((d: any) => d[0]),
      },

      label: {
        show: label,
        // formatter: (params: any) => {
        //   return `${params.name}: ${
        //     isMonetaryValue ? formatFinancialValue(params.value) : params.value
        //   }`;
        // },
      },
      backgroundColor: background,
      series: data.lines.map((d: any) => ({
        type: "line",
        name: d[0],
        data: d[1].map((l: any) => l.y),
        stack: stack ? "Total" : undefined,
        legendHoverLink: legendHoverLink,
        areaStyle: {
          color: showArea ? null : "",
        },
        lineStyle: {
          type: lineStyle,
          width: lineWidth,
        },
      })),
      tooltip: {
        trigger: showTooltip ? "axis" : "none",
        confine: true,
        valueFormatter: (value: number | string) =>
          isMonetaryValue
            ? formatFinancialValue(parseInt(value.toString(), 10))
            : value,
      },
    };

    return option;
  }

  function echartsSankey(data: any, visualOptions: any) {
    const {
      // artboard
      height,
      background,
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // chart options
      nodesWidth,
      nodesPadding,
      linksOpacity,
      nodeAlign,
      orient,
      // Labels
      showLabels,
      labelRotate,
      labelPosition,
      labelFontSize,
      // Tooltip
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    let nodes: { name: string }[] = [];
    data.forEach((d: any) => {
      nodes.push({ name: d.source });
      nodes.push({ name: d.target });
    });
    nodes = uniqBy(nodes, "name");

    const option = {
      backgroundColor: background,
      series: [
        {
          type: "sankey",
          data: nodes,
          links: data,
          height,
          orient,
          nodeAlign,
          top: marginTop,
          left: marginLeft,
          right: marginRight,
          bottom: marginBottom,
          nodeGap: nodesPadding,
          nodeWidth: nodesWidth,
          emphasis: {
            focus: "adjacency",
          },
          lineStyle: {
            curveness: 0.5,
            color: "source",
            opacity: linksOpacity,
          },
          label: {
            show: showLabels,
            rotate: labelRotate,
            position: labelPosition,
            fontSize: labelFontSize,
            formatter: (params: any) => {
              const splits = params.name.split("-");
              if (splits.length === 1) {
                return params.name;
              }
              const text = splits.slice(1).join("-");
              return text;
            },
          },
        },
      ],
      tooltip: {
        trigger: showTooltip ? "item" : "none",
        confine: true,
        formatter: (params: any) => {
          let result = "";
          if (params.data.source && params.data.target && params.data.value) {
            let source = "";
            let target = "";
            let splits = params.data.source.split("-");
            if (splits.length === 1) {
              source = params.data.source;
            } else {
              source = splits.slice(1).join("-");
            }
            splits = params.data.target.split("-");
            if (splits.length === 1) {
              target = params.data.target;
            } else {
              target = splits.slice(1).join("-");
            }
            result = `${source} - ${target}: ${
              isMonetaryValue
                ? formatFinancialValue(params.data.value)
                : params.data.value
            }`;
          } else {
            let name = "";
            let splits = params.name.split("-");
            if (splits.length === 1) {
              name = params.name;
            } else {
              name = splits.slice(1).join("-");
            }
            result = name;
          }
          return result;
        },
      },
    };

    return option;
  }

  function echartsTreemap(data: any, visualOptions: any) {
    const {
      // artboard
      width,
      height,
      background,
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // labels
      showLabels,
      labelFontSize,
      showBreadcrumbs,
      // tooltip
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    const option = {
      backgroundColor: background,
      series: [
        {
          name: "All",
          type: "treemap",
          data,
          width,
          height,
          top: marginTop,
          left: marginLeft,
          right: marginRight,
          bottom: marginBottom,
          leafDepth: 1,
          label: {
            show: showLabels,
            fontSize: labelFontSize,
          },
          breadcrumb: {
            show: showBreadcrumbs,
            top: 0,
            bottom: "auto",
          },
        },
      ],
      tooltip: {
        trigger: showTooltip ? "item" : "none",
        confine: true,
        formatter: (params: any) => {
          return `${params.name}: ${
            isMonetaryValue
              ? formatFinancialValue(params.data.value)
              : params.data.value
          }`;
        },
      },
    };

    return option;
  }

  function render(
    data: any,
    node: HTMLElement,
    chartType:
      | "echartsBarchart"
      | "echartsGeomap"
      | "echartsLinechart"
      | "echartsSankey"
      | "echartsTreemap",
    visualOptions: any
  ) {
    new ResizeObserver(() => onResize(chart, node.clientHeight)).observe(node);

    const chart = echarts.init(node, undefined, {
      renderer: "svg",
      height: visualOptions.height,
    });

    window.removeEventListener("resize", () => onResize(chart));

    const CHART_TYPE_TO_COMPONENT = {
      echartsBarchart: () => echartsBarchart(data, visualOptions),
      echartsGeomap: () => echartsGeomap(data, visualOptions),
      echartsLinechart: () => echartsLinechart(data, visualOptions),
      echartsSankey: () => echartsSankey(data, visualOptions),
      echartsTreemap: () => echartsTreemap(data, visualOptions),
    };

    chart.setOption(CHART_TYPE_TO_COMPONENT[chartType]());

    window.addEventListener("resize", () => onResize(chart));
  }

  return { render };
}
