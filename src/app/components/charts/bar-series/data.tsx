import { appColors } from "app/theme";

export interface BarSeriesChartDataItem {
  name: string;
  values: number[];
  itemStyle?: {
    color: string;
  };
}

export interface BarSeriesChartProps {
  keys: string[];
  data: BarSeriesChartDataItem[];
}

export const KEYS = [
  "2014 - 2016",
  "2017 - 2019",
  "2020 - 2022",
  "2023 - 2025",
];

export const STORY_DATA_VARIANT_1: BarSeriesChartDataItem[] = [
  {
    name: "Total Allocation",
    values: [40000000, 42000000, 47000000, 48000000],
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_1,
    },
  },
  {
    name: "HIV",
    values: [20000000, 22000000, 27000000, 28000000],
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_2,
    },
  },
  {
    name: "Tuberculosis",
    values: [15000000, 10000000, 10000000, 10000000],
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_3,
    },
  },
  {
    name: "Malaria",
    values: [5000000, 10000000, 10000000, 10000000],
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_4,
    },
  },
];
