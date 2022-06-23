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
  loadDataset: (endpoint: string) => Promise<boolean>;
  updateLocalStates: any;
  themeData: {
    id: number;
    count: number;
    data: { [key: string]: string | number | null }[];
    filterOptionGroups: FilterGroupModel[];
  }[][];
  editable: any;
}
