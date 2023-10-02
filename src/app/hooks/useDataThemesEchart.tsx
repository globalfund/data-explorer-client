import React from "react";
import get from "lodash/get";
import filter from "lodash/filter";
import uniqBy from "lodash/uniqBy";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import {
  MapChart,
  BarChart,
  LineChart,
  SankeyChart,
  TreemapChart,
} from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { checkLists } from "app/modules/chart-module/routes/customize/data";

echarts.use([
  BarChart,
  MapChart,
  LineChart,
  SankeyChart,
  TreemapChart,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
]);

export function useDataThemesEchart() {
  function onResize(chart: echarts.EChartsType, id: string, height?: number) {
    const container = document.getElementById(id);
    chart.resize({
      width: container?.clientWidth,
      height: height ?? "auto",
    });
  }

  function echartsBarchart(data: any, visualOptions: any) {
    const {
      // artboard
      // height,
      // background,
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // chart options
      // orientation,
      // Tooltip
      realTimeSort,
      color,
      splitLineY,
      barRadius,
      xAxisLineColor,
      xAxisLabelFontSize,
      focus,
      xAxisLabelColor,
      xAxisLabelInterval,
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    const bars = data.map((d: any) => d.bars);
    const sizes = data.map((d: any) => d.size);

    return {
      grid: {
        top: marginTop,
        left: marginLeft,
        right: marginRight,
        bottom: marginBottom,
      },
      xAxis: {
        data: bars,
        show: true,
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: xAxisLineColor,
          },
        },
        axisLabel: {
          show: true,
          color: xAxisLabelColor || "#000",
          fontSize: xAxisLabelFontSize || 12,
          interval: xAxisLabelInterval || "auto",
        },
      },
      yAxis: {
        type: "value",
        show: true,
        splitLine: {
          show: splitLineY ?? true,
        },
      },
      // xAxis: orientation === "horizontal" ? { type: "value" } : { data: bars },
      // yAxis: orientation === "vertical" ? { type: "value" } : { data: bars },
      // backgroundColor: background,
      backgroundColor: "transparent",
      series: [
        {
          name: "",
          // height,
          type: "bar",
          data: sizes,
          realtimeSort: realTimeSort ?? true,
          itemStyle: {
            color: color,
            borderRadius: barRadius,
          },
          emphasis: {
            focus,
          },
        },
      ],
      tooltip: {
        trigger: showTooltip ? "item" : "none",
        confine: true,
        formatter: (params: any) => {
          return `${params.name}: ${
            isMonetaryValue
              ? formatFinancialValue(params.value, true)
              : params.value
          }`;
        },
      },
    };
  }

  function echartsGeomap(data: any, visualOptions: any) {
    const {
      // artboard
      height,
      width,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      background,
      // Tooltip
      palette,
      roam,
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    echarts.registerMap("World", data.geoJSON);

    const sizes = data.results.map((d: any) => d.value);

    return {
      tooltip: {
        trigger: showTooltip ? "item" : "none",
        showDelay: 0,
        transitionDuration: 0.2,
        confine: true,
        formatter: (params: any) => {
          if (params.value) {
            return `${params.name}: ${
              isMonetaryValue
                ? formatFinancialValue(params.value, true)
                : params.value
            }`;
          }
        },
      },
      backgroundColor: background,

      visualMap: {
        left: "right",
        min: Math.min(...sizes),
        max: Math.max(...sizes),
        inRange: {
          color: checkLists
            .filter((item) => palette[item.label])
            .map((item) => item.value)
            .flat(1),
        },
        text: ["High", "Low"],
        calculable: true,
      },
      series: [
        {
          type: "map",
          height,
          width,
          roam: roam,
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
  }

  function echartsLinechart(data: any, visualOptions: any) {
    const {
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      stack,
      showLegend,
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    return {
      grid: {
        top: marginTop,
        left: marginLeft,
        right: marginRight,
        bottom: marginBottom,
        zlevel: -1,
        z: -1,
      },
      xAxis: {
        type: "category",
        data: data.xAxisValues || [],
        zlevel: -1,
        z: -1,
      },
      yAxis: {
        type: "value",
        zlevel: -1,
        z: -1,
      },
      legend: {
        show: showLegend,
        data: filter(
          get(data, "lines", []).map((d: any) => d[0]),
          (d: any) => d !== null
        ),
      },
      // backgroundColor: background,
      backgroundColor: "transparent",

      series: filter(get(data, "lines", []), (l: any) => l !== null).map(
        (d: any) => ({
          type: "line",
          name: d[0],
          data: d[1].map((l: any) => l.y),
          stack: stack ? "Total" : undefined,
          z: -1,
          zlevel: -1,
        })
      ),
      tooltip: {
        show: showTooltip,
        trigger: "axis",

        confine: true,
        valueFormatter: (value: number | string) =>
          isMonetaryValue
            ? formatFinancialValue(parseInt(value.toString(), 10), true)
            : value,
      },
    };
  }

  function echartsSankey(data: any, visualOptions: any) {
    const {
      height,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      nodesWidth,
      nodesPadding,
      linksOpacity,
      nodeAlign,
      orient,
      showLabels,
      labelRotate,
      labelPosition,
      labelFontSize,
      showTooltip,
      isMonetaryValue,
    } = visualOptions;

    let nodes: { name: string }[] = [];
    data.forEach((d: any) => {
      nodes.push({ name: d.source });
      nodes.push({ name: d.target });
    });
    nodes = uniqBy(nodes, "name");

    return {
      backgroundColor: "transparent",
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
              return splits.slice(1).join("-");
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
                ? formatFinancialValue(params.data.value, true)
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
  }

  function echartsTreemap(data: any, visualOptions: any) {
    const {
      // artboard
      width,
      height,
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

    return {
      // backgroundColor: background,
      backgroundColor: "transparent",
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
              ? formatFinancialValue(params.data.value, true)
              : params.data.value
          }`;
        },
      },
    };
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
    visualOptions: any,
    id: string
  ) {
    new ResizeObserver(() => onResize(chart, id, node.clientHeight)).observe(
      node
    );

    const chart = echarts.init(node, undefined, {
      renderer: "canvas",
      height: visualOptions.height,
    });

    window.removeEventListener("resize", () => onResize(chart, id));

    const CHART_TYPE_TO_COMPONENT = {
      echartsBarchart: () => echartsBarchart(data, visualOptions),
      echartsGeomap: () => echartsGeomap(data, visualOptions),
      echartsLinechart: () => echartsLinechart(data, visualOptions),
      echartsSankey: () => echartsSankey(data, visualOptions),
      echartsTreemap: () => echartsTreemap(data, visualOptions),
    };

    chart.setOption(CHART_TYPE_TO_COMPONENT[chartType]());

    window.addEventListener("resize", () => onResize(chart, id));
  }

  return { render };
}
