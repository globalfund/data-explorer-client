import React from "react";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { onEchartResize } from "app/utils/onEchartResize";
import { BarChartProps } from "app/components/charts/bar/data";
import { GridComponent, LegendComponent } from "echarts/components";
import { BarSeriesOption, BarChart as EChartsBar } from "echarts/charts";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";
import {
  XAXisComponentOption,
  YAXisComponentOption,
  LegendComponentOption,
} from "echarts";

echarts.use([EChartsBar, GridComponent, LegendComponent, SVGRenderer]);

export const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const range = React.useMemo(() => {
    return getRange(props.data, ["exclusive", "other"]);
  }, [props.data]);

  const xAxisKeys = React.useMemo(() => {
    return props.data.map((item) => item.name);
  }, [props.data]);

  const seriesData = React.useMemo(() => {
    const values = filter(
      props.data.map((item) => item.value),
      (v: number | undefined) => v
    ) as number[];
    const values1 = filter(
      props.data.map((item) => item.value1),
      (v: number | undefined) => v
    ) as number[];
    if (values1.length === 0) {
      return [values];
    }
    return [values, values1];
  }, [props.data]);

  const max = React.useMemo(() => {
    return Math.max(...seriesData[0], ...(seriesData[1] ? seriesData[1] : []));
  }, [seriesData]);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<
        | BarSeriesOption
        | YAXisComponentOption
        | XAXisComponentOption
        | LegendComponentOption
      > = {
        yAxis: {
          type: "value",
          name: range.abbr,
          position: "left",
          alignTicks: true,
          max,
          nameTextStyle: {
            fontSize: "8px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "8px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
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
          data: xAxisKeys,
          axisTick: {
            show: false,
          },
          nameTextStyle: {
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "10px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
        },
        series: seriesData.map((values, index) => ({
          type: "bar",
          name:
            index === 0 ? props.valueLabels.value : props.valueLabels.value1,
          data: values,
          barWidth: seriesData.length > 1 ? "37px" : "72px",
          colorBy: seriesData.length > 1 ? "series" : "data",
          color:
            seriesData.length > 1
              ? [
                  appColors.TIME_CYCLE.BAR_COLOR_2,
                  appColors.TIME_CYCLE.BAR_COLOR_3,
                ]
              : [
                  appColors.TIME_CYCLE.BAR_COLOR_1,
                  appColors.TIME_CYCLE.BAR_COLOR_2,
                  appColors.TIME_CYCLE.BAR_COLOR_3,
                  appColors.TIME_CYCLE.BAR_COLOR_4,
                  appColors.TIME_CYCLE.BAR_COLOR_5,
                ],
          emphasis: {
            disabled: true,
          },
          itemStyle:
            seriesData.length > 1
              ? {
                  color: [
                    appColors.TIME_CYCLE.BAR_COLOR_2,
                    appColors.TIME_CYCLE.BAR_COLOR_3,
                  ][index],
                }
              : undefined,
        })),
        legend: {
          right: "10%",
          itemWidth: 8,
          itemHeight: 8,
          align: "left",
          show: seriesData.length > 1,
          textStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          data: [
            props.valueLabels.value,
            props.valueLabels.value1
              ? props.valueLabels.value1
              : props.valueLabels.value,
          ],
        },
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "treemap-chart",
            containerRef.current?.clientHeight
          )
        ).observe(containerRef?.current);
      }

      chart.setOption(option);
    }
  }, [
    max,
    range,
    xAxisKeys,
    seriesData,
    props.valueLabels,
    containerRef.current,
  ]);

  return (
    <React.Fragment>
      <Box
        id="treemap-chart"
        ref={containerRef}
        width="100%"
        height="400px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
