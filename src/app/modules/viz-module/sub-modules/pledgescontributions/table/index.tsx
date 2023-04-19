/* third-party */
import React from "react";
import get from "lodash/get";
import find from "lodash/find";
import filter from "lodash/filter";
import uniqueId from "lodash/uniqueId";
import { useHistory } from "react-router-dom";
import TablePagination from "@material-ui/core/TablePagination";
import { useDebounce, useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { SimpleTable } from "app/components/Table/Simple";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";

export function PledgesContributionsTable() {
  useTitle("The Data Explorer - Pledges & Contributions Table");

  const history = useHistory();

  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name ASC");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const fetchData = useStoreActions(
    (store) => store.PledgesContributionsTable.fetch
  );
  const data = useStoreState(
    (state) =>
      get(state.PledgesContributionsTable, "data.data", []) as SimpleTableRow[]
  );
  const isLoading = useStoreState(
    (state) => state.PledgesContributionsTable.loading
  );
  const selectedAggregation = useStoreState(
    (state) => state.ToolBoxPanelAggregateByState.value
  );
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  function reloadData() {
    const filterString = getAPIFormattedFilters(appliedFilters, {
      search,
      sortBy,
    });
    fetchData({
      filterString: `aggregateBy=${selectedAggregation || "Donor"}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, {
        name: "Resource Mobilization: Pledges & Contributions",
      })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Resource Mobilization: Pledges & Contributions",
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

  React.useEffect(
    () => reloadData(),
    [selectedAggregation, appliedFilters, sortBy]
  );

  useUpdateEffect(() => {
    if (search.length === 0) {
      reloadData();
    }
  }, [search]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        reloadData();
      }
    },
    500,
    [search]
  );

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

  const columns =
    data.length > 0
      ? filter(Object.keys(data[0]), (key) => key !== "children").map(
          (key) => ({
            name: key === "name" ? selectedAggregation : `${key} (USD)`,
            key,
          })
        )
      : [];

  return (
    <>
      <SimpleTable
        title="Pledges & Contributions"
        search={search}
        sortBy={sortBy}
        rows={data.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
        onSearchChange={setSearch}
        onSortByChange={setSortBy}
        formatNumbers
        columns={columns}
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
    </>
  );
}
