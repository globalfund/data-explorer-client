import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesBuilderPreviewThemeProps {
  tabIndex: number;
  vizIndex: number;
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  visualOptions: any;
  currentChartData: any;
  setVisualOptions: (value: any) => void;
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
  currentChart: any;
  setVisualOptions: (value: any) => void;
  currentChartData: any;
  setCurrentChart: (value: any) => void;
  setCurrentChartData: (value: any) => void;
  addVizToLocalStates: () => void;
  validMapping: boolean;
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
}
