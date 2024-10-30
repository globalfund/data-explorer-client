import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import Divider from "@mui/material/Divider";
import ReactDOMServer from "react-dom/server";
import { SVGRenderer } from "echarts/renderers";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SunburstProps } from "app/components/charts/sunburst/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
import { TooltipComponent, ToolboxComponentOption } from "echarts/components";
import { chartTooltipCommonConfig } from "app/components/charts/common/tooltip/config";
import {
  SunburstSeriesOption,
  SunburstChart as EChartsSunburst,
} from "echarts/charts";

echarts.use([EChartsSunburst, TooltipComponent, SVGRenderer]);

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
        <div className="chart-tooltip-text">{props.label}</div>
        <div className="chart-tooltip-text">
          {formatFinancialValue(props.value)}
        </div>
      </div>
    </div>
  );
};

export const SunburstChart: React.FC<SunburstProps> = (
  props: SunburstProps
) => {
  const isTouch = useMediaQuery("(hover: none)");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [stateChart, setStateChart] =
    React.useState<echarts.EChartsType | null>(null);

  useChartResizeObserver({
    chart: stateChart,
    containerId: "sunburst-chart",
    containerRef: containerRef,
  });

  const total = React.useMemo(() => {
    return sumBy(props.data, "value");
  }, [props.data]);

  const [centerValue, setCenterValue] = React.useState(total);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<
        SunburstSeriesOption | ToolboxComponentOption
      > = {
        series: {
          id: "sunburst-chart",
          type: "sunburst",
          data: props.data,
          radius: ["50%", "100%"],
          color: appColors.SUNBURST.ITEM_COLORS,
          levels: [
            {},
            {
              radius: ["50%", "80%"],
              itemStyle: {
                opacity: 1,
              },
            },
            {
              radius: ["80%", "100%"],
              itemStyle: {
                opacity: 1,
              },
            },
          ],
          emphasis: {
            focus: "ancestor",
            label: {
              show: false,
            },
          },
          label: {
            show: false,
          },
        },
        tooltip: {
          show: true,
          ...chartTooltipCommonConfig(isTouch),
          formatter: (params: any) => {
            return ReactDOMServer.renderToString(
              <Tooltip {...params} label={props.tooltipLabel} />
            );
          },
        },
      };

      chart.on("click", (params) => {
        const value = get(params, "data.value", 0);
        if (value) {
          setCenterValue(value);
        }
      });

      chart.setOption(option);
      setStateChart(chart);
    }
  }, [containerRef.current]);

  React.useEffect(() => {
    if (stateChart) {
      stateChart.setOption({
        series: [
          {
            data: props.data,
          },
        ],
      });
    }
  }, [props.data]);

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          id="sunburst-chart"
          data-cy="sunburst-chart"
          ref={containerRef}
          width="600px"
          height="600px"
          sx={{
            "> div": {
              borderRadius: "8px",
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            zIndex: -1,
            width: "100%",
            height: "100%",
            display: "flex",
            position: "absolute",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            "@media (max-width: 767px)": {
              h5: {
                fontSize: "18px",
              },
            },
          }}
        >
          <Typography variant="h4">{props.centerLabel}</Typography>
          <Typography variant="h4" fontWeight="400">
            {formatFinancialValue(centerValue)}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};
