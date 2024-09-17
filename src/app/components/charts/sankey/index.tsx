import React from "react";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import ReactDOMServer from "react-dom/server";
import { SVGRenderer } from "echarts/renderers";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SankeyChartProps } from "app/components/charts/sankey/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useChartResizeObserver } from "app/hooks/useChartResizeObserver";
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
  const mobile = useMediaQuery("(max-width: 767px)");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [stateChart, setStateChart] =
    React.useState<echarts.EChartsType | null>(null);

  useChartResizeObserver({
    chart: stateChart,
    containerId: "sankey-chart",
    containerRef: containerRef,
  });

  const totalValue = React.useMemo(() => {
    return props.data.links
      .filter((link) => link.source === "Total budget")
      .reduce((acc, item) => acc + item.value, 0);
  }, [props.data.links]);

  const maxLevel = React.useMemo(() => {
    return Math.max(...props.data.nodes.map((node) => node.level));
  }, [props.data.nodes]);

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
          nodeWidth: 13,
          type: "sankey",
          draggable: false,
          layoutIterations: 0,
          right: mobile ? 0 : 250,
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
            show: !mobile,
            textShadowColor: "none",
            fontFamily: "'Inter', sans-serif",
          },
          levels: [
            {
              depth: 0,
              label: {
                show: !mobile,
                position: "right",
                fontWeight: "bold",
                color: appColors.COMMON.WHITE,
              },
              lineStyle: {
                color:
                  appColors.SANKEY_CHART.LINK_COLORS[maxLevel === 3 ? 0 : 1],
              },
              itemStyle: {
                color: appColors.SANKEY_CHART.NODE_COLOR,
              },
            },
            {
              depth: 1,
              label: {
                show: !mobile,
                position: "left",
                color: appColors.COMMON.WHITE,
              },
              lineStyle: {
                color:
                  appColors.SANKEY_CHART.LINK_COLORS[maxLevel === 3 ? 1 : 2],
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
                show: !mobile,
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
              return ReactDOMServer.renderToString(
                <Box
                  style={{
                    gap: "10px",
                    display: "flex",
                    minWidth: "390px",
                    flexDirection: "column",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <Typography
                    component="div"
                    style={{
                      fontSize: "18px",
                      maxWidth: "100%",
                      fontWeight: "700",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {formatFinancialValue(data.value)}
                  </Typography>
                  <Box>
                    {data.source} -{">"} {data.target}
                    <br />
                    {((data.value / totalValue) * 100)
                      .toFixed(2)
                      .replace(".00", "")}
                    % of total budget
                  </Box>
                </Box>
              );
            }
            return ReactDOMServer.renderToString(
              <SankeyChartTooltip
                name={data.name}
                data={props.data}
                level={data.level}
                totalValue={totalValue}
              />
            );
          },
        },
      };

      chart.setOption(option);
      setStateChart(chart);
    }
  }, [containerRef.current, totalValue, props.data, mobile]);

  return (
    <React.Fragment>
      <Box
        id="sankey-chart"
        data-cy="sankey-chart"
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
