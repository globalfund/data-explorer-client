import React from "react";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import Divider from "@mui/material/Divider";
import ReactDOMServer from "react-dom/server";
import { SVGRenderer } from "echarts/renderers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BarChartProps } from "app/components/charts/bar/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { BarSeriesOption, BarChart as EChartsBar } from "echarts/charts";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
import { chartTooltipCommonConfig } from "app/components/charts/common/tooltip/config";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from "echarts/components";
import {
  GridComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
  LegendComponentOption,
  TooltipComponentOption,
} from "echarts";

echarts.use([
  EChartsBar,
  SVGRenderer,
  GridComponent,
  LegendComponent,
  TooltipComponent,
]);

const Tooltip = (props: any) => {
  return (
    <div
      style={{
        gap: "10px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="chart-tooltip-title">{props.name}</div>
      <Divider
        style={{ width: "100%", borderColor: "#DFE3E5", margin: "5px 0" }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div className="chart-tooltip-text">
          <b>Component</b>
        </div>
        <div className="chart-tooltip-text">
          <b>Amount</b>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div
          className="chart-tooltip-text"
          style={{
            textTransform: "capitalize",
          }}
        >
          {props.seriesName}
        </div>
        <div className="chart-tooltip-text">
          {formatFinancialValue(props.value)}
        </div>
      </div>
    </div>
  );
};

export const BarChart: React.FC<BarChartProps> = (props: BarChartProps) => {
  const isTouch = useMediaQuery("(hover: none)");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [stateChart, setStateChart] =
    React.useState<echarts.EChartsType | null>(null);

  useChartResizeObserver({
    chart: stateChart,
    containerId: "bar-chart",
    containerRef: containerRef,
  });

  const range = React.useMemo(() => {
    return getRange(props.data, ["value", "value1"]);
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
        | TooltipComponentOption
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
          name: range.abbr,
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
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "12px",
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
              : props.itemStyle,
        })),
        legend: {
          right: 0,
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
        tooltip: {
          show: true,
          ...chartTooltipCommonConfig(isTouch),
          formatter: (params: any) => {
            const html = ReactDOMServer.renderToString(<Tooltip {...params} />);
            return html;
          },
        },
      };

      chart.setOption(option);
      setStateChart(chart);
    }
  }, [containerRef.current]);

  React.useEffect(() => {
    if (stateChart) {
      stateChart.setOption({
        yAxis: {
          axisLabel: {
            formatter: (value: number) => {
              return getFinancialValueWithMetricPrefix(value, range.index);
            },
          },
        },
        xAxis: {
          data: xAxisKeys,
        },
        series: seriesData.map((values, index) => ({
          data: values,
          name:
            index === 0 ? props.valueLabels.value : props.valueLabels.value1,
          itemStyle:
            seriesData.length > 1
              ? {
                  color: [
                    appColors.TIME_CYCLE.BAR_COLOR_2,
                    appColors.TIME_CYCLE.BAR_COLOR_3,
                  ][index],
                }
              : props.itemStyle,
        })),
      });
    }
  }, [range, xAxisKeys, seriesData, props.valueLabels, stateChart]);

  return (
    <React.Fragment>
      <Box
        id="bar-chart"
        ref={containerRef}
        width="100%"
        height="450px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
