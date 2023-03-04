/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import {
  SimpleTableRow,
  SimpleTableColumn,
} from "app/components/Table/Simple/data";
import {
  FundingRequestTable,
  FundingTableColumn,
} from "app/components/Table/funding";

interface FundingRequestTableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  columns: FundingTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
}

export function Table(props: FundingRequestTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <FundingRequestTable
      search={props.search}
      sortBy={props.sortBy}
      light
      rows={props.data}
      title="Funding Request"
      columns={props.columns}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
      paddingLeft={2}
    />
  );
}
