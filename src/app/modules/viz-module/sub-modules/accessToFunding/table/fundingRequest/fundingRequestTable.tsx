/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import {
  SimpleTableRow,
  SimpleTableColumn,
} from "app/components/Table/Simple/data";
import { FundingTable, FundingTableColumn } from "app/components/Table/funding";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { ClickAwayListener, Slide } from "@material-ui/core";
import { SubToolBoxPanel } from "app/components/ToolBoxPanel/components/subtoolboxpanel";
import { get } from "lodash";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";

interface FundingRequestTableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  columns: FundingTableColumn[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
  title: string;
}

export function FundingRequestTable(props: FundingRequestTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <div>
      <FundingTable
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
