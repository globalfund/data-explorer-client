import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesToolBoxProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  mappedData?: any;
  openPanel?: number;
  currentChart?: any;
  dataSteps?: boolean;
  guideView?: boolean;
  visualOptions?: any;
  currentChartData?: any;
  forceNextEnabled?: boolean;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions?: (value: any) => void;
  loadDataset: (endpoint: string) => Promise<boolean>;
}