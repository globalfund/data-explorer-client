import React from "react";
import Box from "@mui/material/Box";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { onEchartResize } from "app/utils/onEchartResize";
import { PieSeriesOption, PieChart as EChartsPie } from "echarts/charts";
import {
  RadialChartProps,
  itemLabelFormatter,
} from "app/components/charts/radial/data";

echarts.use([EChartsPie, SVGRenderer]);

export const RadialChart: React.FC<RadialChartProps> = (
  props: RadialChartProps
) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<PieSeriesOption> = {
        series: {
          type: "pie",
          endAngle: 360,
          startAngle: 180,
          data: props.data,
          center: ["50%", "70%"],
          radius: ["60%", "100%"],
          label: {
            show: true,
            fontSize: "10px",
            minMargin: 0,
            fontFamily: "'Inter', sans-serif",
            formatter: (params) => {
              return itemLabelFormatter(params, props.itemLabelFormatterType);
            },
            rich: {
              boldName: {
                fontSize: "14px",
                fontWeight: "bold",
              },
            },
          },
          labelLine: {
            length: 5,
            length2: 5,
          },
        },
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "radial-chart",
            containerRef.current?.clientHeight
          )
        ).observe(containerRef?.current);
      }

      chart.setOption(option);
    }
  }, [props.data, containerRef.current]);

  return (
    <React.Fragment>
      <Box
        id="radial-chart"
        ref={containerRef}
        width="100%"
        height={props.height ?? "480px"}
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
