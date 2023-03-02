/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import {
  SimpleTableRow,
  SimpleTableColumn,
} from "app/components/Table/Simple/data";

interface EligibilityTableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  columns: SimpleTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
  title: string;
}

export function EligibilityTable(props: EligibilityTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <SimpleTable
      search={props.search}
      sortBy={props.sortBy}
      rows={props.data}
      title={props.title}
      columns={props.columns}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
    />
  );
}
