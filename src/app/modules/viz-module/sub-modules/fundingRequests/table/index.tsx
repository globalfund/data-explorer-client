/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import {
  SimpleTableRow,
  SimpleTableColumn,
} from "app/components/Table/Simple/data";

interface FundingRequestTableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  columns: SimpleTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
}

export function FundingRequestTable(props: FundingRequestTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <SimpleTable
      search={props.search}
      sortBy={props.sortBy}
      rows={props.data}
      title="Funding Request"
      columns={props.columns}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
    />
  );
}
