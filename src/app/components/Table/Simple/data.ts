export interface SimpleTableRow {
  [key: string]: any;
  children?: SimpleTableRow[];
}

export interface SimpleTableColumn {
  name: string;
  key: string;
}

export interface SimpleTableProps {
  title: string;
  light?: boolean;
  search: string;
  sortBy: string;
  rows: SimpleTableRow[];
  columns: SimpleTableColumn[];
  onSearchChange: (value: string) => void;
  onSortByChange: (value: string) => void;
}
