export interface DataThemesBuilderCustomizeProps {
  loading: boolean;
  dimensions: any[];
  mappedData: any[];
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
}
