import React from "react";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import Typography from "@mui/material/Typography";
import { splitStringInMiddle } from "app/utils/splitStringInMiddle";
import { GridComponent, LegendComponent } from "echarts/components";
import { BarSeriesOption, BarChart as EChartsBar } from "echarts/charts";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
import {
  findDeep,
  ExpandableHorizontalBarChartProps,
} from "app/components/charts/expandable-horizontal-bar/data";
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

export const ExpandableHorizontalBar: React.FC<
  ExpandableHorizontalBarChartProps
> = (props: ExpandableHorizontalBarChartProps) => {
  const isMounted = React.useRef(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [data, setData] = React.useState(props.data);
  const [expandedBars, setExpandedBars] = React.useState<string[]>([]);
  const [stateChart, setStateChart] =
    React.useState<echarts.EChartsType | null>(null);

  useChartResizeObserver({
    chart: stateChart,
    containerId: "expandable-horizontal-bar-chart",
    containerRef: containerRef,
  });

  const range = React.useMemo(() => {
    return getRange(data, ["value", "value1"]);
  }, [data]);

  const xAxisKeys = React.useMemo(() => {
    return data.map((item) => item.name);
  }, [data]);

  const seriesData = React.useMemo(() => {
    const values = filter(
      data.map((item) => item.value),
      (v: number | undefined) => v
    ) as number[];
    const values1 = filter(
      data.map((item) => item.value1),
      (v: number | undefined) => v
    ) as number[];
    if (values1.length === 0) {
      return [values];
    }
    return [values, values1];
  }, [data]);

  const onBarClick = (value: string) => {
    const item = findDeep(props.data, value);
    if (item && item.items && item.items.length > 0) {
      setExpandedBars((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        }
        return [...prev, value];
      });
    }
  };

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
          right: 10,
          bottom: 20,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: range.abbr,
          position: "top",
          alignTicks: true,
          nameTextStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.X_AXIS_TEXT_COLOR,
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
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
        },
        yAxis: {
          type: "category",
          data: xAxisKeys,
          triggerEvent: true,
          inverse: true,
          axisTick: {
            alignWithLabel: false,
            interval: "auto",
            show: true,
            inside: false,
            length: chart.getWidth() - chart.getWidth() / 6,
            lineStyle: {
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
          nameTextStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.Y_AXIS_TEXT_COLOR,
          },
          axisLabel: {
            align: "right",
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.Y_AXIS_TEXT_COLOR,
            // margin: chart.getWidth() / 6,
            formatter: (value: string) => {
              const item = findDeep(props.data, value);
              let label = value;
              if (label.length > 40) {
                const [string1, string2] = splitStringInMiddle(value);
                label = `${string1}\n${string2}`;
              }
              if (!item?.items || item.items.length === 0) {
                return label;
              }
              const isExpanded = expandedBars.includes(value);
              return `${label} ${isExpanded ? "▲" : "▼"} `;
            },
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: appColors.TIME_CYCLE.AXIS_COLOR,
            },
          },
          splitLine: {
            show: true,
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
          barWidth: seriesData.length > 1 ? "15px" : "30px",
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
                    appColors.TIME_CYCLE.PLEDGE_COLOR,
                    appColors.TIME_CYCLE.CONTRIBUTION_COLOR,
                  ][index],
                }
              : props.itemStyle,
        })),
        legend: {
          right: 0,
          align: "left",
          itemWidth: 11,
          itemHeight: 11,
          show: seriesData.length > 1,
          textStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.LEGEND_TEXT_COLOR,
          },
          data: [
            props.valueLabels.value,
            props.valueLabels.value1
              ? props.valueLabels.value1
              : props.valueLabels.value,
          ],
        },
      };

      if (!isMounted.current) {
        chart.on("click", "yAxis", (params) => {
          const { value } = params;
          if (value) onBarClick(value?.toString());
        });
      }

      chart.setOption(option);
      setStateChart(chart);
      isMounted.current = true;
    }
  }, [containerRef.current]);

  React.useEffect(() => {
    if (expandedBars.length > 0) {
      const newData = [];
      const temp = [...props.data];
      for (const item of temp) {
        newData.push(item);
        if (
          expandedBars.includes(item.name) &&
          item.items &&
          item.items.length > 0
        ) {
          item.items.forEach((item) => {
            newData.push(item);
            if (expandedBars.includes(item.name) && item.items) {
              item.items.forEach((item) => {
                newData.push(item);
              });
            }
          });
        }
      }
      setData(newData);
    } else {
      setData(props.data);
    }
  }, [expandedBars, props.data]);

  React.useEffect(() => {
    if (stateChart) {
      stateChart.setOption({
        yAxis: {
          axisLabel: {
            formatter: (value: string) => {
              const item = findDeep(props.data, value);
              let label = value;
              if (label.length > 40) {
                const [string1, string2] = splitStringInMiddle(value);
                label = `${string1}\n${string2}`;
              }
              if (!item?.items || item.items.length === 0) {
                return label;
              }
              const isExpanded = expandedBars.includes(value);
              return `${label} ${isExpanded ? "▲" : "▼"} `;
            },
          },
        },
      });
    }
  }, [stateChart, expandedBars]);

  React.useEffect(() => {
    if (stateChart) {
      stateChart.setOption({
        xAxis: {
          name: range.abbr,
          formattter: (value: number) => {
            return getFinancialValueWithMetricPrefix(value, range.index);
          },
        },
        yAxis: {
          data: xAxisKeys,
        },
        series: seriesData.map((values, index) => ({
          data: values,
        })),
      });
    }
  }, [stateChart, seriesData, xAxisKeys, range]);

  return (
    <React.Fragment>
      <Typography
        fontSize="12px"
        sx={{
          top: "40px",
          position: "absolute",
        }}
      >
        Y Axis / <b>{props.yAxisLabel}</b>
      </Typography>
      <Typography
        fontSize="12px"
        sx={{
          top: "20px",
          position: "absolute",
          left: "calc(100% / 3)",
        }}
      >
        X Axis /{" "}
        <b>
          {props.xAxisLabel} (US$ in {range.abbr})
        </b>
      </Typography>
      <Box
        id="expandable-horizontal-bar-chart"
        ref={containerRef}
        width="100%"
        height={data.length * 40 + 100}
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
