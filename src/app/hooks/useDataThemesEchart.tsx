import React from "react";
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
  PolarComponent,
} from "echarts/components";

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
  PolarComponent,
]);

export function useDataThemesEchart() {
  function onResize(chart: echarts.EChartsType, id: string, height?: number) {
    const container = document.getElementById(id);
    chart.resize({
      width: container?.clientWidth,
      height: height || "auto",
    });
  }

  function echartsPolarBar(data: any, visualOptions: any) {
    const { showTooltip, isMonetaryValue } = visualOptions;

    const labels = data.map((d: any) => d.label);
    const sizes = data.map((d: any) => {
      return {
        value: d.size,
        itemStyle: d.itemStyles,
      };
    });

    const option = {
      polar: {
        radius: [30, "85%"],
      },
      angleAxis: {
        max: 100,
        startAngle: 75,
      },
      radiusAxis: {
        type: "category",
        data: labels,
        axisLabel: {
          inside: true,
          fontSize: 10,
          formatter: (label: any) => {
            return label.slice(0, 3);
          },
        },
      },
      backgroundColor: "transparent",
      series: {
        type: "bar",
        data: sizes,
        colorBy: "data",
        coordinateSystem: "polar",
        itemStyle: {
          color: ["#252C34", "#C9CAD4", "#595D70"],
        },
      },

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

  function render(
    data: any,
    node: HTMLElement,
    chartType:
      | "echartsPolarBar"
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

    const CHART_TYPE_TO_COMPONENT: any = {
      echartsPolarBar: () => echartsPolarBar(data, visualOptions),
    };

    chart.setOption(CHART_TYPE_TO_COMPONENT[chartType]());

    window.addEventListener("resize", () => onResize(chart, id));
  }

  return { render };
}
