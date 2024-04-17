import React from "react";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { onEchartResize } from "app/utils/onEchartResize";
import { GridComponent, LegendComponent } from "echarts/components";
import { BarSeriesOption, BarChart as EChartsBar } from "echarts/charts";
import { BarSeriesChartProps } from "app/components/charts/bar-series/data";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";
import {
  GridComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
  LegendComponentOption,
} from "echarts";

echarts.use([EChartsBar, GridComponent, LegendComponent, SVGRenderer]);

export const BarSeriesChart: React.FC<BarSeriesChartProps> = (
  props: BarSeriesChartProps
) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const range = React.useMemo(() => {
    const values: {
      value: number;
    }[] = [];
    props.data.forEach((item) => {
      item.values.forEach((value) => {
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
        | BarSeriesOption
        | GridComponentOption
        | YAXisComponentOption
        | XAXisComponentOption
        | LegendComponentOption
      > = {
        grid: {
          top: 40,
          left: 20,
          right: 0,
          bottom: 20,
          containLabel: true,
        },
        yAxis: {
          type: "value",
          position: "left",
          alignTicks: true,
          nameTextStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
            formatter: (value: number) => {
              return getFinancialValueWithMetricPrefix(value, range.index);
            },
          },
          axisTick: {
            show: true,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
          splitLine: {
            show: false,
          },
        },
        xAxis: {
          type: "category",
          data: props.keys,
          axisTick: {
            show: false,
          },
          nameTextStyle: {
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
        },
        series: props.data.map((serie) => ({
          type: "bar",
          name: serie.name,
          data: serie.values,
          barWidth: "40px",
          color: serie.itemStyle?.color,
          emphasis: {
            disabled: true,
          },
        })),
        legend: {
          right: 0,
          itemWidth: 11,
          itemHeight: 11,
          align: "left",
          itemGap: 20,
          textStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
        },
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "bar-chart",
            containerRef.current?.clientHeight
          )
        ).observe(containerRef?.current);
      }

      chart.setOption(option);
    }
  }, [range, props.keys, props.data, containerRef.current]);

  return (
    <React.Fragment>
      <Box
        id="bar-chart"
        ref={containerRef}
        width="100%"
        height="300px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
