import React from "react";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import {
  FundingTableColumn,
  FundingRequestTable,
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
      title=""
      paddingLeft={2}
      rows={props.data}
      search={props.search}
      sortBy={props.sortBy}
      columns={props.columns}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
    />
  );
}
