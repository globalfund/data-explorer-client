export interface DataThemesBuilderMappingProps {
  loading: boolean;
  dataTypes: any[];
  dimensions: any[];
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
}

export interface DataThemesBuilderMappingDimensionProps {
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

export interface DataThemesBuilderMappingMessageProps {
  dimensions: any[];
}

export const typeIcon = {
  string: "/icons/string.svg",
  number: "/icons/number.svg",
  date: "/icons/date.svg",
};
