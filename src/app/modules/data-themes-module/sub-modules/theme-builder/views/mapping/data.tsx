export interface DataThemesBuilderMappingProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  dimensions: any[];
  visualOptions: any;
  currentChartData: any;
  setVisualOptions: (value: any) => void;
}

export interface DataThemesBuilderMappingDimensionProps {
  dimension: any;
  currentChartData: any;
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
