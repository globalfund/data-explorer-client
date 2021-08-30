/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";

interface InvestmentsTableProps {
  isLoading: boolean;
  data: SimpleTableRow[];
}

export function InvestmentsTable(props: InvestmentsTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <SimpleTable
      rows={props.data}
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
