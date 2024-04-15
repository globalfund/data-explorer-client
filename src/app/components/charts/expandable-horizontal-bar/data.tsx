export interface ExpandableHorizontalBarChartDataItem {
  name: string;
  value: number;
  value1?: number;
  itemStyle?: {
    color: string;
  };
}

export interface ExpandableHorizontalBarChartProps {
  data: ExpandableHorizontalBarChartDataItem[];
  valueLabels: {
    value: string;
    value1?: string;
  };
}

export const STORY_DATA_VARIANT_1: ExpandableHorizontalBarChartDataItem[] = [
  {
    name: "Affordable Medicines Facility - malaria (AMFm)",
    value: 1000000,
    value1: 500000,
  },
  {
    name: "Corporation",
    value: 500000,
    value1: 2000000,
  },
  {
    name: "Debt2Health",
    value: 2000000,
    value1: 2500000,
  },
  {
    name: "Faith-Based Organization",
    value: 2500000,
    value1: 6000000,
  },
];
