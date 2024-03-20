export interface RaceBarChartDataItem {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface RaceBarChartProps {
  noValuesFormat?: boolean;
  data: RaceBarChartDataItem[];
}

export const STORY_DATA_VARIANT_1: RaceBarChartDataItem[] = [
  {
    name: "Disbursed",
    value: 54260000,
    color: "#0A2840",
    percentage: 73,
  },
  {
    name: "Committed",
    value: 60050000,
    color: "#013E77",
    percentage: 82,
  },
  {
    name: "Signed",
    value: 66330000,
    color: "#00B5AE",
    percentage: 90,
  },
];

export const STORY_DATA_VARIANT_2: RaceBarChartDataItem[] = [
  {
    name: "Signed",
    value: 212,
    color: "#0A2840",
    percentage: 73,
  },
  {
    name: "M. Process",
    value: 215,
    color: "#013E77",
    percentage: 78,
  },
  {
    name: "Submitted",
    value: 233,
    color: "#00B5AE",
    percentage: 90,
  },
];
