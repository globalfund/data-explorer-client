import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { onEchartResize } from "app/utils/onEchartResize";
import { TreeSeriesOption, TreeChart as EchartsTree } from "echarts/charts";
import { PolylineTreeProps } from "app/components/charts/polyline-tree/data";
import { formatLocale, formatLocaleN } from "app/utils/formatLocale";

echarts.use([EchartsTree, SVGRenderer]);

export const PolylineTree: React.FC<PolylineTreeProps> = (
  props: PolylineTreeProps
) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<TreeSeriesOption> = {
        series: {
          type: "tree",
          data: [props.data],
          top: "50px",
          left: "50px",
          bottom: "50px",
          right: "70%",
          edgeShape: "polyline",
          symbolSize: 9,
          symbol: (value) => {
            if (value) return "circle";
            return "none";
          },
          lineStyle: {
            width: 1,
          },
          label: {
            align: "center",
            position: "left",
            padding: [0, 5, 0, 5],
            verticalAlign: "middle",
            backgroundColor: appColors.COMMON.WHITE,
            rich: {
              value: {
                fontSize: 12,
                fontWeight: "bold",
              },
              smallName: {
                fontSize: 12,
              },
              name: {
                fontSize: 14,
                fontWeight: "bold",
              },
              bigName: {
                fontSize: 18,
                fontWeight: "bold",
              },
            },
            formatter: (params) => {
              if (params.dataIndex === 1) {
                return `{bigName|${params.name}}`;
              }
              if (params.value) {
                return [
                  `{value|${formatLocale(params.value as number)}}`,
                  `{smallName|${params.name}}`,
                ].join(" ");
              }
              return `{name|${params.name}}`;
            },
          },
          leaves: {
            label: {
              align: "left",
              position: "right",
              verticalAlign: "middle",
            },
          },
          emphasis: {
            focus: "descendant",
          },
        },
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "polyline-tree",
            containerRef.current?.clientHeight
          )
        ).observe(containerRef?.current);
      }

      chart.setOption(option);
    }
  }, [containerRef.current]);

  return (
    <React.Fragment>
      <Box
        id="polyline-tree"
        ref={containerRef}
        width="100%"
        height="900px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};