/* third-party */
import React from "react";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { useDebounce, useUpdateEffect } from "react-use";

interface TableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
}
interface GrantsTableProps extends TableProps {
  pushValue: number;
  isToolboxOvervlayVisible(): 0 | 1;
  openToolboxPanel: boolean;
  reloadData: (resetPage?: boolean) => void;
}

function Table(props: TableProps) {
  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <SimpleTable
      title="Grants"
      rows={props.data}
      search={props.search}
      sortBy={props.sortBy}
      onSearchChange={props.setSearch}
      onSortByChange={props.setSortBy}
      columns={[
        { name: "Description", key: "title" },
        { name: "ID Number", key: "id" },
      ]}
    />
  );
}

export const GrantsTable = (props: GrantsTableProps) => {
  const [sortBy, setSortBy] = React.useState("grants ASC");

  useUpdateEffect(() => {
    if (props.search.length === 0) {
      props.reloadData();
    }
  }, [props.search]);

  const [,] = useDebounce(
    () => {
      if (props.search.length > 0) {
        props.reloadData();
      }
    },
    500,
    [props.search]
  );

  if (props.isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div
        css={`
          align-self: flex-start;
          transition: width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
          width: ${props.openToolboxPanel
            ? `calc(100% - ${props.pushValue}px)`
            : "100%"};
        `}
      >
        <Table
          data={props.data}
          search={props.search}
          sortBy={sortBy}
          isLoading={props.isLoading}
          setSearch={props.setSearch}
          setSortBy={setSortBy}
        />
      </div>
      <div css="width: 100%;height: 56px;" />
      <div
        css={`
          left: 0;
          top: 48px;
          z-index: 15;
          width: 100%;
          height: 100%;
          position: fixed;
          background: rgba(35, 35, 35, 0.5);
          opacity: ${props.isToolboxOvervlayVisible()};
          visibility: ${props.isToolboxOvervlayVisible()
            ? "visible"
            : "hidden"};
          transition: visibility 225ms cubic-bezier(0, 0, 0.2, 1),
            opacity 225ms cubic-bezier(0, 0, 0.2, 1);
        `}
      />
    </>
  );
};
export default GrantsTable;
