import random from "lodash/random";
import { appColors } from "app/theme";
import {
  getRange,
  getFinancialValueWithMetricPrefix,
} from "app/utils/getFinancialValueWithMetricPrefix";

export interface RadialChartDataItem {
  name: string;
  value: number;
  tooltip?: {
    items: {
      name: string;
      value: number;
      percentage: number;
    }[];
  };
  itemStyle?: {
    color: string;
  };
}

export interface RadialChartProps {
  height?: string;
  tooltipLabel: string;
  data: RadialChartDataItem[];
  itemLabelFormatterType: "name" | "name-percent" | "name-value-percent";
}

export function itemLabelFormatter(
  params: any,
  type: "name" | "name-percent" | "name-value-percent",
) {
  switch (type) {
    case "name":
      return params.name;
    case "name-percent":
      return `${params.name}\n${params.percent}%`;
    case "name-value-percent":
      const range = getRange([{ value: params.value }], ["value"], "en");
      return `{boldName| ${params.name}}\n$${getFinancialValueWithMetricPrefix(
        params.value,
        range.index,
        2,
      )}${range.abbr} - ${params.percent}%`;
    default:
      return params.name;
  }
}

export const STORY_DATA_VARIANT_1: RadialChartDataItem[] = [
  {
    name: "Afghanistan",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Algeria",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Burundi",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[2],
    },
  },
  {
    name: "Congo",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[3],
    },
  },
  {
    name: "Ecuador",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[4],
    },
  },
  {
    name: "Iraq",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Kenya",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Liberia",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[2],
    },
  },
  {
    name: "Mongolia",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[3],
    },
  },
  {
    name: "Nepal",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[4],
    },
  },
];

export const STORY_DATA_VARIANT_2: RadialChartDataItem[] = [
  {
    name: "HIV",
    value: 7768674058,
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Tuberculosis",
    value: 2569168282,
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Malaria",
    value: 4336892541,
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[2],
    },
  },
];

export const STORY_DATA_VARIANT_3: RadialChartDataItem[] = [
  {
    name: "HIV",
    value: 11706734676.03,
    itemStyle: {
      color: "#0A2840",
    },
  },
  {
    name: "Malaria",
    value: 8209420455.49,
    itemStyle: {
      color: "#013E77",
    },
  },
  {
    name: "Multicomponent",
    value: 10920830650.98,
    itemStyle: {
      color: "#00B5AE",
    },
  },
  {
    name: "RSSH",
    value: 3852950735.94,
    itemStyle: {
      color: "#C3EDFD",
    },
  },
  {
    name: "Tuberculosis",
    value: 5197007040.04,
    itemStyle: {
      color: "#F3F5F4",
    },
  },
];

export const STORY_DATA_VARIANT_4: RadialChartDataItem[] = [
  {
    name: "Disbursed",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Committed",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[1],
    },
  },
];

export const STORY_DATA_VARIANT_5: RadialChartDataItem[] = [
  {
    name: "Eastern Africa",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Middle Africa",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Northern Africa",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[2],
    },
  },
  {
    name: "Southern Africa",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[3],
    },
  },
  {
    name: "Western Africa",
    value: random(1000000, 10000000),
    itemStyle: {
      color: appColors.RADIAL_CHART.ITEM_COLORS[4],
    },
  },
];
