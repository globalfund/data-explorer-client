import { ChartAPIModel } from "../../data";

export interface ChartBuilderMappingProps {
  loading: boolean;
  loadedChart: ChartAPIModel;
  datasetName: string;
  dataTypes: any[];
  dimensions: any[];
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
}

export interface ChartBuilderMappingDimensionProps {
  dimension: any;
  dataTypes: any;
  replaceDimension: (
    fromDimension: string,
    toDimension: string,
    fromIndex: number,
    toIndex: number,
    multiple?: boolean
  ) => void;
}

export interface ChartBuilderMappingMessageProps {
  dimensions: any[];
  errors: string[];
  requiredFields: { id: string; name: string }[];
  minValuesFields: { id: string; name: string; minValues: number }[];
}

export const typeIcon = {
  string: "/icons/string.svg",
  number: "/icons/number.svg",
  date: "/icons/date.svg",
};
