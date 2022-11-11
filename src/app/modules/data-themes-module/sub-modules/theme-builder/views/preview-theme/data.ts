import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesBuilderPreviewThemeProps {
  tabIndex: number;
  vizIndex: number;
  loading: boolean;
  visualOptions: any;
  renderedChart: string;
  setVisualOptions: (value: any) => void;
  editable: any;
  deleteViz: (tabIndex: number, vizIndex: number) => void;
  duplicateViz: (tabIndex: number, vizIndex: number) => void;
}

export interface DataThemesBuilderPreviewThemePageProps {
  loading: boolean;
  isEditMode: boolean;
  renderedCharts: string[][];
  visualOptions: any;
  setVisualOptions: (value: any) => void;
  addVizToLocalStates: () => void;
  validMapping: boolean;
}
