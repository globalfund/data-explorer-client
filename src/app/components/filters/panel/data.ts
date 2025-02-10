import { FilterGroupModel } from "app/components/filters/list/data";
import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";

export interface FilterPanelProps {
  appliedFilters: string[];
  appliedFilterBgColors: {
    normal: string;
    hover: string;
  };
  onClose: () => void;
  handleResetFilters: () => void;
  filterGroups: FilterGroupModel[];
  appliedFiltersData?: AppliedFiltersModel;
  removeFilter?: (value: string, types: string[]) => void;
  toggleFilter?: (checked: boolean, value: string, type: string) => void;
  setPage: (value: React.SetStateAction<number>) => void;
  setPageSearchValue: (value: React.SetStateAction<number>) => void;
}
