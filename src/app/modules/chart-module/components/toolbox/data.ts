import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface ChartToolBoxProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  mappedData: any;
  isEditMode: boolean;
  openPanel?: number;
  dataSteps: boolean;
  guideView: boolean;
  textView: boolean;
  visualOptions: any;
  filtersView: boolean;
  loadDataFromAPI: (
    customAppliedFilters?: [
      [
        {
          [key: string]: any[];
        }
      ]
    ]
  ) => void;
  exportView: boolean;
  rawViz: any;
  dataTypes: any;
  previewMode: boolean;
  forceNextEnabled: boolean;
  addVizToLocalStates: () => void;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions: (value: any) => void;
  loadDataset: (endpoint: string) => Promise<boolean>;
}
