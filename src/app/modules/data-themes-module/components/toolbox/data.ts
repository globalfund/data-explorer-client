import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesToolBoxProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  mappedData?: any;
  openPanel?: number;
  currentChart?: any;
  dataSteps?: boolean;
  guideView?: boolean;
  textView?: boolean;
  visualOptions?: any;
  filtersView?: boolean;
  exportView?: boolean;
  tabIndex?: number;
  vizIndex?: number;
  rawViz?: any;
  currentChartData?: any;
  totalAvailable?: number;
  forceNextEnabled?: boolean;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions?: (value: any) => void;
  setFilterOptionGroups?: (key: string, value: boolean) => void;
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
}
