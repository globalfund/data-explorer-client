/* third-party */
import React from "react";
/* project */
import { ExpandableTable } from "app/components/Table/Expandable";
import { Search } from "app/modules/grants-module/components/Search";
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
        <Search value={props.search} setValue={props.setSearch} />
        <div css="width: 100%;height: 25px;" />
        {props.data.length === 0 ? (
          <NoDataLabel />
        ) : (
          <ExpandableTable
            rows={props.data}
            columns={props.columns}
            forceExpand={props.forceExpand}
          />
        )}
      </div>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
