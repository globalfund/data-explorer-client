export interface ExpandableTableRowDocProps {
  title: string;
  link: string;
}

export interface ExpandableTableRowDocCategoryProps {
  name: string;
  count: number;
  docs: ExpandableTableRowDocProps[];
}

export interface ExpandableTableRowProps {
  name: string;
  link?: string;
  count?: number;
  docCategories?: ExpandableTableRowProps[];
  docs?: {
    title: string;
    link: string;
  }[];
}

export interface ExpandableTableProps {
  search: string;
  columns: string[];
  forceExpand?: boolean;
  rows: ExpandableTableRowProps[];
  onSearchChange: (value: string) => void;
}

export interface TableToolbarCols {
  name: string;
  index: number;
  checked: boolean;
}
