export interface ChartBuilderMappingProps {
  loading: boolean;
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
}

export const typeIcon = {
  string: "/icons/string.svg",
  number: "/icons/number.svg",
  date: "/icons/date.svg",
};
