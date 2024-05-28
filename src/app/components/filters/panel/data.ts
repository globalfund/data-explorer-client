import { FilterGroupModel } from "app/components/filters/list/data";

export interface FilterPanelProps {
  appliedFilters: string[];
  appliedFilterBgColors: {
    normal: string;
    hover: string;
  };
  onClose: () => void;
  handleResetFilters: () => void;
  filterGroups: FilterGroupModel[];
}
