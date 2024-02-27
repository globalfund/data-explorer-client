import { appColors } from "app/theme";

export interface BarChartDataItem {
  name: string;
  value: number;
  value1?: number;
  itemStyle?: {
    color: string;
  };
}

export interface BarChartProps {
  data: BarChartDataItem[];
  valueLabels: {
    value: string;
    value1?: string;
  };
}

export const STORY_DATA_VARIANT_1: BarChartDataItem[] = [
  {
    name: "Cycle 1",
    value: 1000000,
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_1,
    },
  },
  {
    name: "Cycle 2",
    value: 500000,
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_2,
    },
  },
  {
    name: "Cycle 3",
    value: 2000000,
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_3,
    },
  },
  {
    name: "Cycle 4",
    value: 2500000,
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_4,
    },
  },
  {
    name: "Cycle 5",
    value: 6000000,
    itemStyle: {
      color: appColors.TIME_CYCLE.BAR_COLOR_5,
    },
  },
];

export const STORY_DATA_VARIANT_2: BarChartDataItem[] = [
  {
    name: "Cycle 1",
    value: 1000000,
    value1: 500000,
  },
  {
    name: "Cycle 2",
    value: 500000,
    value1: 300000,
  },
  {
    name: "Cycle 3",
    value: 2000000,
    value1: 1000000,
  },
  {
    name: "Cycle 4",
    value: 2500000,
    value1: 1500000,
  },
  {
    name: "Cycle 5",
    value: 6000000,
    value1: 8000000,
  },
];
