/* third-party */
import React from "react";
import { useDebounce, useUpdateEffect } from "react-use";
import TablePagination from "@material-ui/core/TablePagination";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { SimpleTableRow } from "app/components/Table/Simple/data";

interface TableProps {
  search: string;
  sortBy: string;
  isLoading: boolean;
  data: SimpleTableRow[];
  setSearch: (value: string) => void;
  setSortBy: (value: string) => void;
}

interface GrantsTableProps extends TableProps {
  page: number;
  pages: number;
  sortBy: string;
  pushValue: number;
  rowsPerPage: number;
  openToolboxPanel: boolean;
  isToolboxOvervlayVisible(): 0 | 1;
  reloadData: (resetPage?: boolean) => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

function Table(props: TableProps) {
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

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setRowsPerPage(parseInt(event.target.value, 10));
    props.setPage(1);
  };

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
          sortBy={props.sortBy}
          isLoading={props.isLoading}
          setSearch={props.setSearch}
          setSortBy={props.setSortBy}
        />
      </div>
      <div css="width: 100%;height: 26px;" />
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
      <div
        css={`
          display: flex;
          width: 100%;
          justify-content: flex-start;
        `}
      >
        <TablePagination
          page={props.page - 1}
          component="div"
          count={props.pages}
          rowsPerPage={props.rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          css={`
            @media (min-width: 768px) {
              .MuiTablePagination-toolbar {
                padding-left: 40px;
              }
              .MuiTablePagination-spacer {
                display: none;
              }
            }
          `}
        />
      </div>
    </>
  );
};

export default GrantsTable;
