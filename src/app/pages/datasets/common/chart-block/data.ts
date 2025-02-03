import { FilterGroupModel } from "app/components/filters/list/data";
import { AppliedFiltersModel } from "app/state/api/action-reducers/sync/filters";
import { InfoPanelType } from "app/components/chart-block/components/button-toolbar/data";
import { ChartSettingsBarProps } from "app/components/chart-settings/variations/bar/data";
import { ChartSettingsLineProps } from "app/components/chart-settings/variations/line/data";
import { ChartSettingsTreemapProps } from "app/components/chart-settings/variations/treemap/data";

export interface DatasetChartBlockProps {
  id: string;
  title: string;
  empty?: boolean;
  subtitle: string;
  loading?: boolean;
  infoType: InfoPanelType;
  appliedFilters: string[];
  children: React.ReactNode;
  dropdownSelected?: string;
  disableCollapse?: boolean;
  handleResetFilters: () => void;
  filterGroups: FilterGroupModel[];
  extraDropdown?: React.ReactElement;
  appliedFiltersData?: AppliedFiltersModel;
  handleDropdownChange?: (value: string) => void;
  removeFilter: (value: string, types: string[]) => void;
  toggleFilter: (checked: boolean, value: string, type: string) => void;
  dropdownItems: { value: string; label: string; icon?: React.ReactElement }[];
  barProps?: ChartSettingsBarProps;
  lineProps?: ChartSettingsLineProps;
  treemapProps?: ChartSettingsTreemapProps;
}
