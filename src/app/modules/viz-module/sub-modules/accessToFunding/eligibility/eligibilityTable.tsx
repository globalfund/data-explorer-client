/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import {
  SimpleTableRow,
  SimpleTableColumn,
} from "app/components/Table/Simple/data";

interface EligibilityTableProps {
  search: string;
  sortBy: string;
  data: SimpleTableRow[];
  columns: SimpleTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
  title: string;
  forceExpand?: boolean;
  isLocation?: boolean;
}

export function EligibilityTable(props: EligibilityTableProps) {
  return (
    <SimpleTable
      search={props.search}
      sortBy={props.sortBy}
      rows={props.data}
      title={props.title}
      columns={props.columns}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
      forceExpand={props.forceExpand}
      multiVizPageDataKey="eligibility"
      condensed={props.isLocation}
    />
  );
}
