import { EligibilityType } from "app/components/Charts/Eligibility/Scatterplot/data";

export interface DotChartProps {
  data: DotChartModel[];
  selectedYear: string;
  aggregateBy: "componentName" | "geographicAreaName";
}

export interface DotChartModel {
  name: string;
  items: {
    name: string;
    status: EligibilityType;
  }[];
}
