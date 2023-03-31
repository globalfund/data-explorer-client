export interface SimpleTableRow {
  [key: string]: any;
  children?: SimpleTableRow[];
}

export interface SimpleTableColumn {
  name: string;
  key: string;
  valueToColorMap?: { [key: string]: string };
}

export interface SimpleTableProps {
  title: string;
  search: string;
  sortBy: string;
  forceExpand?: boolean;
  rows: SimpleTableRow[];
  formatNumbers?: boolean;
  multiVizPageDataKey?: string;
  columns: SimpleTableColumn[];
  onSearchChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}
