export interface ChartBuilderFiltersProps {
  loading: boolean;
  dimensions: any[];
  datasetName: string;
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
}
