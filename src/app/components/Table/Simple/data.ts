export interface SimpleTableRow {
  [key: string]: any;
  children?: SimpleTableRow[];
}

export interface SimpleTableColumn {
  name: string;
  key: string;
}

export interface SimpleTableProps {
  rows: SimpleTableRow[];
  columns: SimpleTableColumn[];
}
