import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface ChartToolBoxPreviewProps {
  loadDataFromAPI: (
    customAppliedFilters?: [
      [
        {
          [key: string]: any[];
        }
      ]
    ]
  ) => void;
  filterOptionGroups: FilterGroupModel[];
}
