import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesBuilderExportProps {
  tabIndex: number;
  vizIndex: number;
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  currentChart: any;
  dimensions: any[];
  visualOptions: any;
  currentChartData: any;
  setVisualOptions: (value: any) => void;
  filterOptionGroups: FilterGroupModel[];
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
  updateLocalStates: any;
  themeData: {
    id: number;
    count: number;
    data: { [key: string]: string | number | null }[];
    filterOptionGroups: FilterGroupModel[];
  }[][];
}
