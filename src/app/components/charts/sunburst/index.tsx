import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import Typography from "@mui/material/Typography";
import { SunburstProps } from "app/components/charts/sunburst/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
import {
  SunburstSeriesOption,
  SunburstChart as EChartsSunburst,
} from "echarts/charts";

echarts.use([EChartsSunburst, SVGRenderer]);

export const SunburstChart: React.FC<SunburstProps> = (
  props: SunburstProps
) => {
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

      const option: echarts.ComposeOption<SunburstSeriesOption> = {
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
          }}
        >
          <Typography variant="h5">{props.centerLabel}</Typography>
          <Typography variant="h5" fontWeight="400">
            {formatFinancialValue(centerValue)}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
};
