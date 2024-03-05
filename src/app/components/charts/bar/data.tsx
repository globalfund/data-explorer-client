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
    name: "2001-2005",
    value: 4855441149.2,
    value1: 4855441149.2,
  },
  {
    name: "2006-2007",
    value: 4750213146,
    value1: 4803345662.25,
  },
  {
    name: "2008-2010",
    value: 10039407985.1,
    value1: 9643861786.12,
  },
  {
    name: "2011-2013",
    value: 10307673846.25,
    value1: 10303883939.29,
  },
  {
    name: "2014-2016",
    value: 12448929788.12,
    value1: 11713105696.93,
  },
  {
    name: "2017-2019",
    value: 12242861295.84,
    value1: 11451587326.06,
  },
  {
    name: "2020-2022",
    value: 18630982818.69,
    value1: 17148836234.04,
  },
  {
    name: "2023-2025",
    value: 15683762516.83,
    value1: 3783056228.59,
  },
];
