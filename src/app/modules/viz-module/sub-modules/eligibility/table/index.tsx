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
  isLoading: boolean;
  data: SimpleTableRow[];
  columns: SimpleTableColumn[];
}

export function EligibilityTable(props: EligibilityTableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return <SimpleTable rows={props.data} columns={props.columns} />;
}
