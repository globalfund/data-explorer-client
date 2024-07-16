import React from "react";
import find from "lodash/find";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import Divider from "@mui/material/Divider";
import ReactDOMServer from "react-dom/server";
import { SVGRenderer } from "echarts/renderers";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LineChartProps } from "app/components/charts/line/data";
import { GridComponent, TooltipComponent } from "echarts/components";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
import { LineSeriesOption, LineChart as EChartsLine } from "echarts/charts";
import { chartTooltipCommonConfig } from "app/components/charts/common/tooltip/config";
import {
  GridComponentOption,
  XAXisComponentOption,
  YAXisComponentOption,
  TooltipComponentOption,
} from "echarts";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

echarts.use([EChartsLine, GridComponent, TooltipComponent, SVGRenderer]);

const Tooltip = (props: any) => {
  return (
    <div
      className="chart-tooltip"
      style={{
        gap: "10px",
        width: "400px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="chart-tooltip-title">
        {props.name} {props.seriesName}
      </div>
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
          <b>Disbursed in</b>
        </div>
        <div className="chart-tooltip-text">
          {formatFinancialValue(props.value)}
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
        <div className="chart-tooltip-text">
          <b>Cumulative to</b>
        </div>
        <div className="chart-tooltip-text">
          {formatFinancialValue(props.cumulative)}
        </div>
      </div>
    </div>
  );
};

export const LineChart: React.FC<LineChartProps> = (props: LineChartProps) => {
  const isTouch = useMediaQuery("(hover: none)");
  const mobile = useMediaQuery("(max-width: 767px)");
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
        | TooltipComponentOption
      > = {
        grid: {
          top: 40,
          left: 60,
          right: 70,
          bottom: 40,
        },
        yAxis: {
          name: "",
          type: "value",
          position: "left",
          alignTicks: true,
          nameTextStyle: {
            fontSize: "12px",
            fontFamily: "Inter, sans-serif",
            color: appColors.LINE_CHART.CHART_TEXT_COLOR,
          },
          axisLabel: {
            fontSize: "10px",
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
            fontSize: "10px",
            rotate: mobile ? 90 : 0,
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
          showSymbol: true,
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
          symbolSize: 2,
          emphasis: {
            disabled: true,
          },
          itemStyle: line.itemStyle,
        })),
        tooltip: {
          show: true,
          ...chartTooltipCommonConfig(isTouch),
          trigger: "item",
          formatter: (params: any) => {
            const seriesData = find(props.data, { name: params.seriesName });
            let cumulative = 0;
            seriesData?.data
              .slice(0, params.dataIndex + 1)
              .forEach((value: number) => {
                cumulative += value;
              });
            const html = ReactDOMServer.renderToString(
              <Tooltip {...params} cumulative={cumulative} />
            );
            return html;
          },
        },
      };

      chart.setOption(option);
      setStateChart(chart);
    }
  }, [props.data, props.xAxisKeys, containerRef.current]);

  return (
    <React.Fragment>
      <Box
        id="line-chart"
        data-cy="line-chart"
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
