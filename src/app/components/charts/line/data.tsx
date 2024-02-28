import { appColors } from "app/theme";

export interface LineChartDataItem {
  name: string;
  data: number[];
  itemStyle?: {
    color: string;
  };
}

export interface LineChartProps {
  xAxisKeys: string[];
  data: LineChartDataItem[];
}

function generateRealisticArray(
  length: number,
  minValue: number,
  maxValue: number,
  variability: number
) {
  const array = [];
  let currentValue = Math.random() * (maxValue - minValue) + minValue;

  for (let i = 0; i < length; i++) {
    currentValue += (Math.random() - 0.5) * variability;
    currentValue = Math.min(Math.max(currentValue, minValue), maxValue);
    array.push(Math.round(currentValue));
  }

  return array;
}

export const STORY_DATA_VARIANT_1: LineChartDataItem[] = [
  {
    name: "HIV",
    data: generateRealisticArray(20, 10, 90, 40),
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[0],
    },
  },
  {
    name: "Malaria",
    data: generateRealisticArray(20, 10, 65, 40),
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[1],
    },
  },
  {
    name: "Tuberculosis",
    data: generateRealisticArray(20, 10, 60, 40),
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[2],
    },
  },
  {
    name: "RSSH",
    data: generateRealisticArray(20, 10, 40, 40),
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[3],
    },
  },
];
