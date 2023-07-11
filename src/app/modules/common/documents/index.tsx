/* third-party */
import React from "react";
/* project */
import { ExpandableTable } from "app/components/Table/Expandable";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";

interface DocumentsSubModuleProps {
  columns: string[];
  data: ExpandableTableRowProps[];
  search: string;
  setSearch: (search: string) => void;
  forceExpand?: boolean;
}

export function DocumentsSubModule(props: DocumentsSubModuleProps) {
  return (
    <React.Fragment>
      <div
        css={`
          width: 100%;
        `}
      >
        {props.data.length === 0 ? (
          <NoDataLabel />
        ) : (
          <ExpandableTable
            rows={props.data}
            search={props.search}
            columns={props.columns}
            forceExpand={props.forceExpand}
            onSearchChange={props.setSearch}
          />
        )}
      </div>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
