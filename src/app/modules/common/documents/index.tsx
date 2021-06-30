/* third-party */
import React from "react";
/* project */
import { ExpandableTable } from "app/components/Table/Expandable";
import { Search } from "app/modules/grants-module/components/Search";
import { ExpandableTableRowProps } from "app/components/Table/Expandable/data";

interface DocumentsSubModuleProps {
  columns: string[];
  data: ExpandableTableRowProps[];
}

export function DocumentsSubModule(props: DocumentsSubModuleProps) {
  const [search, setSearch] = React.useState("");

  return (
    <React.Fragment>
      <div css="width: 100%;height: 25px;" />
      <div
        css={`
          width: 100%;
        `}
      >
        <Search value={search} setValue={setSearch} />
        <div css="width: 100%;height: 25px;" />
        <ExpandableTable rows={props.data} columns={props.columns} />
      </div>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
