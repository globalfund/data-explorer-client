/* third-party */
import React from "react";
import get from "lodash/get";
/* project */
import { useCMSData } from "app/hooks/useCMSData";
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";

interface InvestmentsTableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
}

export function InvestmentsTable(props: InvestmentsTableProps) {
  const csmData = useCMSData({ returnData: true });
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <SimpleTable
      title={get(csmData, "componentsChartsInvestments.tableTitle", "")}
      rows={props.data}
      search={props.search}
      sortBy={props.sortBy}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
      columns={[
        { name: "Name", key: "name" },
        { name: "Grants", key: "grants" },
        { name: "Signed (USD)", key: "signed" },
        { name: "Committed (USD)", key: "committed" },
        { name: "Disbursed (USD)", key: "disbursed" },
      ]}
    />
  );
}
