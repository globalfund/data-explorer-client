import { appColors } from "app/theme";

export interface PieChartDataItem {
  name: string;
  value: number;
  itemStyle?: {
    color: string;
  };
}

export interface PieChartProps {
  data: PieChartDataItem[];
}

export const STORY_DATA_VARIANT_1: PieChartDataItem[] = [
  {
    name: "HIV",
    value: 7768674058,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Tuberculosis",
    value: 2569168282,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Malaria",
    value: 4336892541,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[2],
    },
  },
  {
    name: "RSSH",
    value: 248473839,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[3],
    },
  },
  {
    name: "Others",
    value: 174746442,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[4],
    },
  },
];

export const STORY_DATA_VARIANT_2: PieChartDataItem[] = [
  {
    name: "Multilateral Organization",
    value: 7768674058,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[0],
    },
  },
  {
    name: "Civil Society Organization",
    value: 2569168282,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Private Sector",
    value: 4336892541,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[2],
    },
  },
  {
    name: "Not Classified",
    value: 248473839,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[3],
    },
  },
  {
    name: "Govermental Organization",
    value: 174746442,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[4],
    },
  },
];

export const STORY_DATA_VARIANT_3: PieChartDataItem[] = [
  {
    name: "Disbursed",
    value: 7768674058,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[1],
    },
  },
  {
    name: "Committed",
    value: 2569168282,
    itemStyle: {
      color: appColors.PIE_CHART.ITEM_COLORS[2],
    },
  },
];
