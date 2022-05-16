import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesPageSubHeaderProps {
  loading: boolean;
  visualOptions: any;
  previewMode?: boolean;
  filterOptionGroups: FilterGroupModel[];
  data: { [key: string]: string | number | null }[];
}
