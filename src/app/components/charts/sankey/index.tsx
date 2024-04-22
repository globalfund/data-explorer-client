import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import ReactDOMServer from "react-dom/server";
import { SVGRenderer } from "echarts/renderers";
import { onEchartResize } from "app/utils/onEchartResize";
import { SankeyChartProps } from "app/components/charts/sankey/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { SankeyChartTooltip } from "app/components/charts/sankey/tooltip";
import { TooltipComponent, TooltipComponentOption } from "echarts/components";
import {
  SankeySeriesOption,
  SankeyChart as EChartsSankey,
} from "echarts/charts";

echarts.use([TooltipComponent, EChartsSankey, SVGRenderer]);

export const SankeyChart: React.FC<SankeyChartProps> = (
  props: SankeyChartProps
) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const totalValue = React.useMemo(() => {
    return props.data.links
      .filter((link) => link.source === "Total")
      .reduce((acc, item) => acc + item.value, 0);
  }, [props.data.links]);

  React.useEffect(() => {
    if (containerRef.current) {
      const chart = echarts.init(containerRef.current, undefined, {
        renderer: "svg",
      });

      const option: echarts.ComposeOption<
        SankeySeriesOption | TooltipComponentOption
      > = {
        blendMode: "color",
        series: {
          top: 10,
          left: 0,
          bottom: 16,
          right: 250,
          nodeWidth: 13,
          type: "sankey",
          draggable: false,
          layoutIterations: 0,
          nodes: props.data.nodes,
          links: props.data.links,
          emphasis: {
            focus: "trajectory",
            lineStyle: {
              opacity: 1,
            },
          },
          lineStyle: {
            opacity: 0.9,
            curveness: 0.6,
          },
          label: {
            fontSize: 12,
            textShadowColor: "none",
            fontFamily: "'Inter', sans-serif",
          },
          levels: [
            {
              depth: 0,
              label: {
                position: "right",
                fontWeight: "bold",
                color: appColors.COMMON.WHITE,
              },
              lineStyle: {
                color: appColors.SANKEY_CHART.LINK_COLORS[0],
              },
              itemStyle: {
                color: appColors.SANKEY_CHART.NODE_COLOR,
              },
            },
            {
              depth: 1,
              label: {
                position: "left",
                color: appColors.COMMON.WHITE,
              },
              lineStyle: {
                color: appColors.SANKEY_CHART.LINK_COLORS[1],
              },
            },
            {
              depth: 2,
              label: {
                position: "right",
                color: appColors.COMMON.BLACK,
              },
              lineStyle: {
                color: appColors.SANKEY_CHART.LINK_COLORS[2],
              },
              itemStyle: {
                color: appColors.SANKEY_CHART.NODE_COLOR,
              },
            },
            {
              depth: 3,
              label: {
                position: "right",
                color: appColors.COMMON.BLACK,
              },
              itemStyle: {
                color: appColors.SANKEY_CHART.NODE_COLOR,
              },
            },
          ],
        },
        tooltip: {
          padding: 16,
          confine: true,
          borderWidth: 0,
          trigger: "item",
          borderRadius: 16,
          triggerOn: "mousemove",
          textStyle: {
            fontSize: 12,
            fontFamily: "'Inter', sans-serif",
            color: appColors.TOOLTIP.TEXT_COLOR,
          },
          backgroundColor: appColors.TOOLTIP.BACKGROUND_COLOR,
          formatter: (params: any) => {
            const data = params.data;
            if (data.source && data.target) {
              return `<div>${data.source} -> ${
                data.target
              }:<br/>${formatFinancialValue(data.value)}</div>`;
            }
            const html = ReactDOMServer.renderToString(
              <SankeyChartTooltip
                name={data.name}
                data={props.data}
                level={data.level}
                totalValue={totalValue}
              />
            );
            return html;
          },
        },
      };

      if (containerRef.current) {
        new ResizeObserver(() =>
          onEchartResize(
            // @ts-ignore
            chart,
            "sankey-chart",
            containerRef.current?.clientHeight
          )
        ).observe(containerRef?.current);
      }

      chart.setOption(option);
    }
  }, [containerRef.current, totalValue, props.data]);

  return (
    <React.Fragment>
      <Box
        id="sankey-chart"
        ref={containerRef}
        width="100%"
        minHeight="500px"
        maxHeight="1700px"
        sx={{
          "> div": {
            borderRadius: "8px",
          },
        }}
      />
    </React.Fragment>
  );
};
