export interface DataThemesBuilderPreviewThemeProps {
  editable: any;
  tabIndex: number;
  vizIndex: number;
  loading: boolean;
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
  deleteViz: (tabIndex: number, vizIndex: number) => void;
  duplicateViz: (tabIndex: number, vizIndex: number) => void;
}

export interface DataThemesBuilderPreviewThemePageProps {
  loading: boolean;
  visualOptions: any;
  isEditMode: boolean;
  validMapping: boolean;
  renderedCharts: string[][];
  renderedChartsMappedData: any;
  renderedChartsSsr: boolean[][];
  addVizToLocalStates: () => void;
  setVisualOptions: (value: any) => void;
}
