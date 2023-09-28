export interface ChartBuilderPreviewThemeProps {
  editable: any;
  loading: boolean;
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
  setIsPreviewView: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ChartBuilderPreviewThemePageProps {
  loading: boolean;
  visualOptions: any;
  isEditMode: boolean;
  validMapping: boolean;
  renderedCharts: string[][];
  renderedChartsMappedData: any;
  renderedChartsSsr: boolean[][];
  addVizToLocalStates: () => void;
  setVisualOptions: (value: any) => void;
  setIsPreviewView: React.Dispatch<React.SetStateAction<boolean>>;
}
