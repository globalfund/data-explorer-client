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
import { checkLists } from "app/modules/data-themes-module/sub-modules/theme-builder/views/customize/data";
import { charts } from "app/modules/chart-module/data";

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
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
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
      label,
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
          show: label,
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
      palette,

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
                ? formatFinancialValue(params.value, true)
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
          color: checkLists.find((item) => item.label === palette)?.value,
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
      // margins
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      // chart options
      stack,
      showLegend,
      // Tooltip
      showTooltip,
      isMonetaryValue,
    } = visualOptions;
    const option = {
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
      // backgroundColor: background,
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

    return option;
  }

  function echartsTreemap(data: any, visualOptions: any) {
    const {
      // artboard
      width,
      height,
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

    return option;
  }

  function bigNumberRender(data: any, node: HTMLElement) {
    const formatedData = {
      ...data,
      description: data?.description?.value[0],
      title: data?.title?.value[0],
      subtitle: data?.subtitle?.value[0],
    };

    const renderBigNumber = charts["bigNumber"].render;
    renderBigNumber(node, formatedData);
  }

  function render(
    data: any,
    node: HTMLElement,
    chartType:
      | "echartsBarchart"
      | "echartsGeomap"
      | "echartsLinechart"
      | "echartsSankey"
      | "echartsTreemap"
      | "bigNumber",
    visualOptions: any,
    id: string
  ) {
    if (chartType === "bigNumber") {
      bigNumberRender(data, node);
    } else {
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
  }

  return { render };
}
