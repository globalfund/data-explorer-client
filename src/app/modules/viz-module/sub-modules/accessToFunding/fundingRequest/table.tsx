import React from "react";
import get from "lodash/get";
import { useCMSData } from "app/hooks/useCMSData";
import {
  FundingTableRow,
  FundingTableColumn,
  FundingRequestTable,
} from "app/components/Table/funding";

interface FundingRequestTableProps {
  search: string;
  sortBy: string;
  data: FundingTableRow[];
  columns: FundingTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
  title: string;
  forceExpand?: boolean;
}

export function Table(props: FundingRequestTableProps) {
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
        forceExpand={props.forceExpand}
      />
    </div>
  );
}
