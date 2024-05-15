import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { GridComponent } from "echarts/components";
import { LineChartProps } from "app/components/charts/line/data";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
import { LineSeriesOption, LineChart as EChartsLine } from "echarts/charts";
import {
  GridComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
} from "echarts";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

echarts.use([EChartsLine, GridComponent, SVGRenderer]);

export const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [stateChart, setStateChart] =
    React.useState<echarts.EChartsType | null>(null);

  useChartResizeObserver({
    chart: stateChart,
    containerId: "line-chart",
    containerRef: containerRef,
  });

  const range = React.useMemo(() => {
    const values: { value: number }[] = [];
    props.data.forEach((line) => {
      line.data.forEach((value) => {
        values.push({ value });
      });
    });
    return getRange(values, ["value"]);
  }, [props.data]);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<
        | LineSeriesOption
        | GridComponentOption
        | YAXisComponentOption
        | XAXisComponentOption
      > = {
        grid: {
          top: 40,
          left: 40,
          right: 70,
          bottom: 40,
        },
        yAxis: {
          type: "value",
          name: range.abbr,
          position: "left",
          alignTicks: true,
          nameTextStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.LINE_CHART.CHART_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.LINE_CHART.CHART_TEXT_COLOR,
            formatter: (value: number) => {
              return getFinancialValueWithMetricPrefix(value, range.index);
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
        },
        xAxis: {
          type: "category",
          data: props.xAxisKeys,
          axisTick: {
            interval: 0,
            alignWithLabel: true,
            lineStyle: {
              width: 1,
              color: appColors.LINE_CHART.AXIS_COLOR,
            },
          },
          axisLabel: {
            interval: 1,
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.LINE_CHART.CHART_TEXT_COLOR,
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: appColors.LINE_CHART.AXIS_COLOR,
            },
          },
        },
        series: props.data.map((line) => ({
          type: "line",
          name: line.name,
          data: line.data,
          showSymbol: false,
          color: line.itemStyle?.color,
          endLabel: {
            show: true,
            fontSize: "12px",
            formatter: "{a}",
            fontFamily: "Inter, sans-serif",
          },
          lineStyle: {
            width: 2,
            color: line.itemStyle?.color,
          },
          emphasis: {
            disabled: true,
          },
          itemStyle: line.itemStyle,
        })),
      };

      chart.setOption(option);
      setStateChart(chart);
    }
  }, [props.data, props.xAxisKeys, containerRef.current]);

  return (
    <React.Fragment>
      <Box
        id="line-chart"
        ref={containerRef}
        width="100%"
        height="480px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
