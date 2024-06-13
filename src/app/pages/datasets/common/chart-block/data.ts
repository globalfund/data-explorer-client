import { FilterGroupModel } from "app/components/filters/list/data";
import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";

export interface DatasetChartBlockProps {
  id: string;
  title: string;
  empty?: boolean;
  subtitle: string;
  loading?: boolean;
  appliedFilters: string[];
  children: React.ReactNode;
  dropdownSelected?: string;
  disableCollapse?: boolean;
  handleResetFilters: () => void;
  filterGroups: FilterGroupModel[];
  appliedFiltersData?: AppliedFiltersModel;
  handleDropdownChange?: (value: string) => void;
  removeFilter: (value: string, types: string[]) => void;
  toggleFilter: (checked: boolean, value: string, type: string) => void;
  dropdownItems: { value: string; label: string; icon?: React.ReactElement }[];
}
