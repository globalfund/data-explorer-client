import get from "lodash/get";
import find from "lodash/find";
import ReactDOM from "react-dom";
import filter from "lodash/filter";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";
import { EchartsTreemapTooltip } from "app/components/Charts/common/echartBaseChart/tooltips/treemap";
import { EchartsPolarBarTooltip } from "app/components/Charts/common/echartBaseChart/tooltips/polarbar";
import {
  EchartsSankeyNodeTooltip,
  EchartsSankeyLinkTooltip,
} from "app/components/Charts/common/echartBaseChart/tooltips/sankey";
import {
  MapChart,
  BarChart,
  LineChart,
  SankeyChart,
  TreemapChart,
} from "echarts/charts";
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { EchartsHorizontalBarTooltip } from "./tooltips/horizontalbar";

echarts.use([
  BarChart,
  MapChart,
  LineChart,
  SankeyChart,
  TreemapChart,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  TooltipComponent,
  VisualMapComponent,
]);

type EchartChartTypes = "treemap" | "sankey" | "polarbar" | "horizontalbar";

export interface EchartBaseChartProps {
  data: any;
  type: EchartChartTypes;
  onNodeClick?: (node: any, code?: string, name?: string) => void;
}

function getTreemapConfig(data: any, cmsData: any) {
  const formattedData = data.map((item: any) => {
    return {
      name: item.name,
      value: item.value,
      tooltip: item.tooltip,
      code: item.code || item.name,
      itemStyle: {
        color: appColors.TREEMAP.SECOND_LEVEL_BACKROUND_COLOR,
      },
      children: (item._children || []).map((child: any) => {
        return {
          name: child.name,
          value: child.value,
          tooltip: child.tooltip,
          code: child.code || child.name,
          itemStyle: {
            color: appColors.TREEMAP.THIRD_LEVEL_BACKROUND_COLOR,
          },
          children: (child._children || []).map((subChild: any) => {
            return {
              name: subChild.name,
              value: subChild.value,
            };
          }),
        };
      }),
    };
  });

  let totalLabel = "Total";

  if (window.location.pathname.indexOf("disbursement") > -1) {
    totalLabel = "Investment - Disbursed";
  } else if (window.location.pathname.indexOf("signed") > -1) {
    totalLabel = "Investment - Signed";
  } else if (window.location.pathname.indexOf("commitment") > -1) {
    totalLabel = "Investment - Committed";
  } else if (window.location.pathname.indexOf("pledges-contributions") > -1) {
    totalLabel = "Resource Mobilization";
  } else if (window.location.pathname.indexOf("budgets") > -1) {
    totalLabel = "Budget";
  } else if (window.location.pathname.indexOf("allocations") > -1) {
    totalLabel = "Allocation";
  }

  return {
    series: [
      {
        type: "treemap",
        data: formattedData,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        colorMappingBy: "id",
        label: {
          show: true,
          position: "insideTopLeft",
          formatter: (params: any) => {
            const name =
              !params.name && params.dataIndex === 0 ? totalLabel : params.name;
            return `${name}\n${formatFinancialValue(params.value)}`;
          },
        },
        upperLabel: {
          show: true,
          height: 70,
          padding: 5,
          fontSize: 14,
          color: appColors.TREEMAP.SECOND_LEVEL_COLOR,
          textBorderColor: appColors.TREEMAP.SECOND_LEVEL_COLOR,
        },
        levels: [
          {
            label: {
              padding: 5,
              fontSize: 14,
              color: appColors.TREEMAP.FIRST_LEVEL_COLOR,
              textBorderColor: appColors.TREEMAP.FIRST_LEVEL_COLOR,
            },
            itemStyle: {
              gapWidth: 5,
              borderRadius: 4,
              borderWidth: 15,
              borderColor: appColors.TREEMAP.FIRST_LEVEL_BACKROUND_COLOR,
            },
          },
          {
            label: {
              padding: 5,
              fontSize: 14,
              color: appColors.TREEMAP.SECOND_LEVEL_COLOR,
              textBorderColor: appColors.TREEMAP.SECOND_LEVEL_COLOR,
            },
            itemStyle: {
              gapWidth: 5,
              borderRadius: 4,
              borderWidth: 15,
              borderColor: appColors.TREEMAP.SECOND_LEVEL_BACKROUND_COLOR,
            },
          },
          {
            label: {
              padding: 12,
              fontSize: 12,
              color: appColors.TREEMAP.THIRD_LEVEL_COLOR,
              textBorderColor: appColors.TREEMAP.THIRD_LEVEL_COLOR,
            },
            itemStyle: {
              gapWidth: 10,
              borderRadius: 4,
              borderColor: appColors.TREEMAP.THIRD_LEVEL_BACKROUND_COLOR,
            },
          },
        ],
        breadcrumb: {
          show: false,
        },
      },
    ],
    tooltip: {
      show: true,
      confine: true,
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: any) => {
        if (!params.data.tooltip) return "";
        const ct = document.createElement("div");
        ReactDOM.render(
          <EchartsTreemapTooltip data={params.data} cmsData={cmsData} />,
          ct
        );
        const result = ct.outerHTML;
        ReactDOM.unmountComponentAtNode(ct);
        return result;
      },
      extraCssText: `
        padding: 20px;
        border-style: none;
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
        background: ${appColors.TREEMAP.TOOLTIP_BACKGROUND_COLOR};
      `,
    },
  };
}

function getSankeyConfig(data: any) {
  let nodes = data.nodes.map((node: any) => ({
    ...node,
    name: node.id,
  }));
  return {
    series: [
      {
        type: "sankey",
        data: nodes,
        links: data.links,
        top: 0,
        left: 0,
        right: 0,
        bottom: 20,
        nodeGap: 14,
        nodeWidth: 12,
        draggable: false,
        nodeAlign: "left",
        emphasis: {
          focus: "adjacency",
        },
        itemStyle: {
          borderWidth: 0,
          color: appColors.BUDGETS_FLOW.SINGLE_NODE_BACKGROUND_COLOR,
        },
        lineStyle: {
          opacity: 1,
          curveness: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0.25, color: "#CDCDCD" },
            { offset: 1, color: "#FEFEFE" },
          ]),
        },
        levels: [
          {
            depth: 0,
            label: {
              position: "right",
            },
          },
          {
            depth: 1,
            label: {
              position: "right",
              width: 150,
              overflow: "break",
            },
          },
          {
            depth: 2,
            label: {
              position: "right",
              width: 150,
              overflow: "break",
            },
          },
          {
            depth: 3,
            label: {
              position: "left",
              width: 150,
              overflow: "break",
            },
          },
        ],
        label: {
          show: true,
          fontSize: 12,
          color: appColors.BUDGETS_FLOW.TEXT_COLOR,
          textBorderColor: appColors.BUDGETS_FLOW.TEXT_COLOR,
        },
      },
    ],
    tooltip: {
      confine: true,
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: any) => {
        const ct = document.createElement("div");
        const content =
          params.dataType === "node" ? (
            <EchartsSankeyNodeTooltip
              id={params.data.id}
              components={params.data.components}
            />
          ) : (
            <EchartsSankeyLinkTooltip
              value={params.data.value}
              source={params.data.source}
              target={params.data.target}
            />
          );
        ReactDOM.render(content, ct);
        const result = ct.outerHTML;
        ReactDOM.unmountComponentAtNode(ct);
        return result;
      },
      extraCssText: `
        padding: 20px;
        border-style: none;
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
        background: ${appColors.BUDGETS_FLOW.TOOLTIP_BACKGROUND_COLOR};
      `,
    },
  };
}

function getPolarBarConfig(data: any, cmsData: any) {
  return {
    colorBy: "data",
    color: appColors.ALLOCATIONS.POLAR_BAR_COLORS,
    polar: {
      radius: [30, "80%"],
    },
    angleAxis: {
      startAngle: 75,
      max: (value: any) => value.max * 1.2,
      axisLabel: {
        formatter: (value: any) =>
          formatLargeAmountsWithPrefix(value).replace("$", ""),
      },
    },
    radiusAxis: {
      name: "values in USD",
      data: data.keys,
      type: "category",
      axisLabel: {
        formatter: (value: any, index: number) => {
          const nValue = data.values[index];
          return `${value}\n${formatLargeAmountsWithPrefix(nValue).replace(
            "$",
            ""
          )}`;
        },
      },
    },
    series: {
      type: "bar",
      data: data.values,
      coordinateSystem: "polar",
      barWidth: 60,
      label: {
        show: false,
      },
    },
    tooltip: {
      show: true,
      confine: true,
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: any) => {
        const ct = document.createElement("div");
        ReactDOM.render(
          <EchartsPolarBarTooltip
            data={{
              header: `Allocation ${get(
                JSON.parse(
                  sessionStorage.getItem(
                    "[EasyPeasyStore][0][ToolBoxPanelAllocationsPeriodState]"
                  ) || ""
                ),
                "data.value",
                ""
              )}`,
              key: params.name,
              value: params.value,
            }}
            cmsData={cmsData}
          />,
          ct
        );
        const result = ct.outerHTML;
        ReactDOM.unmountComponentAtNode(ct);
        return result;
      },
      extraCssText: `
        padding: 20px;
        border-style: none;
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
        background: ${appColors.TREEMAP.TOOLTIP_BACKGROUND_COLOR};
      `,
    },
  };
}

function getHorizontalBarConfig(data: any, cmsData: any) {
  let components: any[] = [];

  data.forEach((item: any) => {
    const itemComponentKeys = filter(
      Object.keys(item),
      (key) =>
        key !== "year" && key !== "amount" && !key.toString().includes("Color")
    );
    itemComponentKeys.forEach((key: any) => {
      if (!find(components, { name: key })) {
        components.push({
          name: key,
          type: "bar",
          stack: "total",
          data: data.map((item: any) => ({
            value: item[key],
            itemStyle: { color: item[`${key}Color`] },
          })),
          barWidth: 24,
          emphasis: {
            focus: "none",
          },
        });
      }
    });
  });

  return {
    colorBy: "data",
    xAxis: {
      name: "values in USD",
      type: "value",
      nameLocation: "start",
      nameTextStyle: {
        color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
      },
      axisLabel: {
        formatter: (value: any) =>
          formatLargeAmountsWithPrefix(value).replace("$", ""),
        textStyle: {
          color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
        },
      },
    },
    yAxis: {
      type: "category",
      data: data.map((item: any) => item.year),
      axisLabel: {
        textStyle: {
          color: appColors.TIME_CYCLE.AXIS_TEXT_COLOR,
        },
      },
    },
    series: components,
    legend: {
      right: 0,
      show: true,
      data: components.map((item: any) => {
        const color = find(item.data, (d: any) => d.value).itemStyle.color;
        return {
          name: item.name,
          icon: "rect",
          itemStyle: { color },
        };
      }),
    },
    tooltip: {
      show: true,
      confine: true,
      trigger: "item",
      triggerOn: "mousemove",
      formatter: (params: any) => {
        const tdata = find(data, { year: params.name });
        if (!data) return;
        const ct = document.createElement("div");
        ReactDOM.render(
          <EchartsHorizontalBarTooltip data={tdata} cmsData={cmsData} />,
          ct
        );
        const result = ct.outerHTML;
        ReactDOM.unmountComponentAtNode(ct);
        return result;
      },
      extraCssText: `
        padding: 20px;
        border-style: none;
        border-radius: 20px;
        box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
        background: ${appColors.TREEMAP.TOOLTIP_BACKGROUND_COLOR};
      `,
    },
  };
}

export function getChartConfigAsPerType(
  type: EchartChartTypes,
  data: any,
  cmsData: any
) {
  switch (type) {
    case "treemap":
      return getTreemapConfig(data, cmsData);
    case "sankey":
      return getSankeyConfig(data);
    case "polarbar":
      return getPolarBarConfig(data, cmsData);
    case "horizontalbar":
      return getHorizontalBarConfig(data, cmsData);
    default:
      return {};
  }
}
