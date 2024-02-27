import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { formatLocale } from "app/utils/formatLocale";
import { onEchartResize } from "app/utils/onEchartResize";
import { TreemapProps } from "app/components/charts/treemap/data";
import {
  TreemapSeriesOption,
  TreemapChart as EchartsTreemap,
} from "echarts/charts";

echarts.use([EchartsTreemap, SVGRenderer]);

export const Treemap: React.FC<TreemapProps> = (props: TreemapProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isMultilevel = React.useMemo(() => {
    return props.data.some((item) => item.children);
  }, [props.data]);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<TreemapSeriesOption> = {
        // @ts-ignore
        series: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          leafDepth: 1,
          type: "treemap",
          data: props.data,
          nodeClick: false,
          drillDownIcon: "",
          emphasis: {
            disabled: true,
          },
          levels: [
            {
              label: {
                offset: [8, 8],
                position: "insideTopLeft",
                fontFamily: "Inter, sans-serif",
                formatter: (params: any) => {
                  return [
                    `{name| ${params.data.name}}`,
                    `{value| ${formatLocale(params.value)}}`,
                  ].join("\n");
                },
                rich: {
                  name: {
                    lineHeight: 15,
                    fontSize: "6px",
                    fontWeight: "bold",
                  },
                  value: {
                    fontSize: "6px",
                  },
                },
              },
              upperLabel: {
                show: false,
              },
              color: [
                appColors.TREEMAP.NODE_COLOR_1,
                appColors.TREEMAP.NODE_COLOR_2,
                appColors.TREEMAP.NODE_COLOR_3,
                appColors.TREEMAP.NODE_COLOR_4,
                appColors.TREEMAP.NODE_COLOR_5,
              ],
            },
            {
              label: {
                offset: [8, 8],
                position: "insideTopLeft",
                fontFamily: "Inter, sans-serif",
                formatter: (params: any) => {
                  return [
                    `{name| ${params.data.name}}`,
                    `{value| ${formatLocale(params.value)}}`,
                  ].join("\n");
                },
                rich: {
                  name: {
                    fontWeight: "bold",
                    lineHeight: isMultilevel ? 15 : 25,
                    fontSize: isMultilevel ? "14px" : "16px",
                  },
                  value: {
                    fontSize: isMultilevel ? "8px" : "12px",
                  },
                },
              },
              color: [
                appColors.TREEMAP.NODE_COLOR_1,
                appColors.TREEMAP.NODE_COLOR_2,
                appColors.TREEMAP.NODE_COLOR_3,
                appColors.TREEMAP.NODE_COLOR_4,
                appColors.TREEMAP.NODE_COLOR_5,
              ],
            },
          ],
          breadcrumb: {
            show: false,
          },
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
  }, [containerRef.current, isMultilevel, props.data]);

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
