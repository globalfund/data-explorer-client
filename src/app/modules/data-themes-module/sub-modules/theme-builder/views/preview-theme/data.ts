import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesBuilderPreviewThemeProps {
  tabIndex: number;
  vizIndex: number;
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  dimensions: any[];
  visualOptions: any;
  currentChartData: any;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions: (value: any) => void;
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
  updateLocalStates: any;
  themeData: {
    id: number;
    count: number;
    data: { [key: string]: string | number | null }[];
    filterOptionGroups: FilterGroupModel[];
  }[][];
  editable: any;
  deleteViz: (tabIndex: number, vizIndex: number) => void;
  duplicateViz: (tabIndex: number, vizIndex: number) => void;
}

export interface DataThemesBuilderPreviewThemePageProps {
  loading: boolean;
  isEditMode: boolean;
  rawData: {
    id: number;
    count: number;
    data: {
      [key: string]: string | number | null;
    }[];
    filterOptionGroups: FilterGroupModel[];
  }[][];
  visualOptions: any;
  updateLocalStates: (param?: boolean) => void;
  deleteTab: (value: number) => void;
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
  currentChart: any;
  setVisualOptions: (value: any) => void;
  currentChartData: any;
  setCurrentChart: (value: any) => void;
  setCurrentChartData: (value: any) => void;
  setRawData: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        count: number;
        data: {
          [key: string]: string | number | null;
        }[];
        filterOptionGroups: FilterGroupModel[];
      }[][]
    >
  >;
  addVizToLocalStates: () => void;
}
