import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { GridComponent } from "echarts/components";
import { onEchartResize } from "app/utils/onEchartResize";
import { LineChartProps } from "app/components/charts/line/data";
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
          right: 0,
          bottom: 40,
        },
        yAxis: {
          type: "value",
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
          },
          emphasis: {
            disabled: true,
          },
          itemStyle: line.itemStyle,
        })),
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "line-chart",
            containerRef.current?.clientHeight
          )
        ).observe(containerRef?.current);
      }

      chart.setOption(option);
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
