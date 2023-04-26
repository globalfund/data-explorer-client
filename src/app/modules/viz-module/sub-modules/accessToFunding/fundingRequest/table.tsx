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
  const cmsData = useCMSData({ returnData: true });

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
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          width: 90%;
          margin: 0 auto;
          font-size: 14px;
          line-height: 17px;
          text-align: center;
        `}
      >
        {get(cmsData, "modulesFundingRequests.tableDisclaimer", "")}
      </div>
      <div css="width: 100%;height: 25px;" />
    </div>
  );
}
