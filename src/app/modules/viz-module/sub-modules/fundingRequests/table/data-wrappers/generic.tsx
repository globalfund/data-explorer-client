/* third-party */
import React from "react";
import get from "lodash/get";
import { useDebounce, useTitle } from "react-use";
import TablePagination from "@material-ui/core/TablePagination";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { Table } from "app/modules/viz-module/sub-modules/fundingRequests/table";
import { fundingRequestColumns } from "app/modules/viz-module/sub-modules/fundingRequests/table/data-wrappers/data";

export function GenericFundingRequestWrapper() {
  useTitle("The Data Explorer - Funding Requests");

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name ASC");

  const data = useStoreState(
    (state) =>
      get(state.FundingRequestsTable.data, "data", []) as SimpleTableRow[]
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const fetchData = useStoreActions(
    (store) => store.FundingRequestsTable.fetch
  );

  const isLoading = useStoreState(
    (state) => state.FundingRequestsTable.loading
  );

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  function reloadData() {
    const filterString = getAPIFormattedFilters(appliedFilters, {
      search,
      sortBy,
    });
    fetchData({
      filterString: `${filterString.length > 0 ? `&${filterString}` : ""}`,
    });
  }

  React.useEffect(() => reloadData(), [appliedFilters, sortBy]);

  const [,] = useDebounce(() => reloadData(), 500, [search]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <React.Fragment>
      <div
        css={`
          gap: 6px;
          display: flex;
          align-items: center;

          > * {
            @supports (-webkit-touch-callout: none) and (not (translate: none)) {
              &:not(:last-child) {
                margin-right: 6px;
              }
            }
          }
        `}
      >
        <div
          css={`
            display: flex;
            margin-left: 10px;
            visibility: hidden;
          `}
        >
          <InfoIcon />
        </div>
      </div>
      <div css="width: 100%;height: 25px;" />
      <Table
        data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        search={search}
        sortBy={sortBy}
        isLoading={isLoading}
        setSearch={setSearch}
        setSortBy={setSortBy}
        columns={fundingRequestColumns}
      />
      <TablePagination
        page={page}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
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
    </React.Fragment>
  );
}