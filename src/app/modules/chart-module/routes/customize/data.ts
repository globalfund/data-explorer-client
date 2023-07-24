export interface ChartBuilderCustomizeProps {
  loading: boolean;
  dimensions: any[];
  datasetName: string;
  mappedData: any[];
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
}
