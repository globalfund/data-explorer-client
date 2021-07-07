/* third-party */
import React from "react";
/* project */
import { ExpandableTable } from "app/components/Table/Expandable";
import { Search } from "app/modules/grants-module/components/Search";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";
import { NoDataLabel } from "app/components/Charts/common/nodatalabel";

interface DocumentsSubModuleProps {
  columns: string[];
  data: ExpandableTableRowProps[];
  search: string;
  setSearch: (search: string) => void;
}

export function DocumentsSubModule(props: DocumentsSubModuleProps) {
  return (
    <React.Fragment>
      <div css="width: 100%;height: 25px;" />
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
          <ExpandableTable rows={props.data} columns={props.columns} />
        )}
      </div>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
