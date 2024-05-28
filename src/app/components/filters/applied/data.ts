import { FilterGroupModel } from "app/components/filters/list/data";

export interface FiltersAppliedProps {
  items: string[];
  filterGroups: FilterGroupModel[];
  appliedFilterBgColors: {
    normal: string;
    hover: string;
  };
}
