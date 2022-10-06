export interface DataThemesBuilderCustomizeProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  dimensions: any[];
  visualOptions: any;
  currentChartData: any;
  setVisualOptions: (value: any) => void;
}
