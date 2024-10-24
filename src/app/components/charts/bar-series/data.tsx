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

export const KEYS = ["2017 - 2019", "2020 - 2022", "2023 - 2025"];

export const STORY_DATA_VARIANT_1: BarSeriesChartDataItem[] = [
  {
    name: "Total Allocation",
    values: [10300000011.59, 12659254480.960001, 13074598442.130001],
    itemStyle: {
      color: "#0A2840",
    },
  },
  {
    name: "HIV",
    values: [5150000003.7, 6354999999.27, 6487600015.67],
    itemStyle: {
      color: "#013E77",
    },
  },
  {
    name: "Malaria",
    values: [3296000003, 4061486740.5, 4176981876.76],
    itemStyle: {
      color: "#00B5AE",
    },
  },
  {
    name: "Tuberculosis",
    values: [1854000004.89, 2242767741.19, 2410016549.7],
    itemStyle: {
      color: "#C3EDFD",
    },
  },
];
