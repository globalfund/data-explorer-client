import { random } from "lodash";

interface RadarChartDataProps {
  components: string[];
  budgetValues: number[];
  disbursementValues: number[];
}

export interface RadarChartProps {
  height?: string;
  data: RadarChartDataProps;
}

export const STORY_DATA_VARIANT_1: RadarChartDataProps = {
  components: [
    "HIV",
    "Tuberculosis",
    "Malaria",
    "RSSH",
    "TB/HIV",
    "Multicomponent",
  ],
  budgetValues: [
    random(15000000, 20000000),
    random(15000000, 20000000),
    random(15000000, 20000000),
    random(15000000, 20000000),
    random(15000000, 20000000),
    random(15000000, 20000000),
  ],
  disbursementValues: [
    random(10000000, 15000000),
    random(10000000, 15000000),
    random(10000000, 15000000),
    random(10000000, 15000000),
    random(10000000, 15000000),
    random(10000000, 15000000),
  ],
};
