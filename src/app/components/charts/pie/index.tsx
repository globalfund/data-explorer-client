import React from "react";
import Box from "@mui/material/Box";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { onEchartResize } from "app/utils/onEchartResize";
import { PieChartProps } from "app/components/charts/pie/data";
import { PieSeriesOption, PieChart as EChartsPie } from "echarts/charts";

echarts.use([EChartsPie, SVGRenderer]);

export const PieChart: React.FC<PieChartProps> = (props: PieChartProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<PieSeriesOption> = {
        series: {
          type: "pie",
          data: props.data,
          cursor: "default",
          label: {
            show: true,
            fontSize: "12px",
            fontFamily: "'Inter', sans-serif",
            formatter: (params: any) => {
              if (params.name.length > 15)
                return params.name.split(" ").join("\n");
              return params.name;
            },
          },
          labelLine: {
            length: 10,
            length2: 5,
          },
          emphasis: {
            disabled: true,
          },
        },
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "pie-chart",
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
        id="pie-chart"
        ref={containerRef}
        width="100%"
        height="265px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
