/* third-party */
import React from "react";
/* project */

import { PageLoader } from "app/modules/common/page-loader";

import {
  FundingRequestTable,
  FundingTableColumn,
  FundingTableRow,
} from "app/components/Table/funding";

interface FundingRequestTableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: FundingTableRow[];
  columns: FundingTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
  title: string;
}

export function Table(props: FundingRequestTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <FundingRequestTable
        search={props.search}
        sortBy={props.sortBy}
        light
        rows={props.data}
        title={props.title}
        columns={props.columns}
        onSearchChange={props.setSearch}
        onSortByChange={props.setSortBy}
        paddingLeft={2}
      />
    </div>
  );
}
