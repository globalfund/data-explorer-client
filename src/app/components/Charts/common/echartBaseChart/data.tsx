import ReactDOM from "react-dom";
import { appColors } from "app/theme";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { EchartsTreemapTooltip } from "app/components/Charts/common/echartBaseChart/tooltips/treemap";
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

type EchartChartTypes = "treemap";

export interface EchartBaseChartProps {
  data: any;
  type: EchartChartTypes;
  onNodeClick?: (node: string, code?: string, name?: string) => void;
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

export function getChartConfigAsPerType(
  type: EchartChartTypes,
  data: any,
  cmsData: any
) {
  switch (type) {
    case "treemap":
      return getTreemapConfig(data, cmsData);
    default:
      return {};
  }
}
