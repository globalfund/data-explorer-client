/* third-party */
import React from "react";
/* project */
import { ExpandableTable } from "app/components/Table/Expandable";
import { docsmockdata } from "app/components/Table/Expandable/data";
import { Search } from "app/modules/grants-module/components/Search";

export function DocumentsSubModule() {
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
        <ExpandableTable
          rows={docsmockdata}
          columns={["Location", "Documents"]}
        />
      </div>
      <div css="width: 100%;height: 25px;" />
    </React.Fragment>
  );
}
