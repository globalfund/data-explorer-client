/* third-party */
import React from "react";
import get from "lodash/get";
import TablePagination from "@material-ui/core/TablePagination";
import { useDebounce, useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { EligibilityTable } from "app/modules/viz-module/sub-modules/eligibility/table";
import {
  incomeLevels,
  diseaseBurdens,
  EligibilityScatterplotDataItemModel,
} from "app/components/Charts/Eligibility/Scatterplot/data";

function getTableData(
  data: EligibilityScatterplotDataItemModel[]
): SimpleTableRow[] {
  return data.map((item: EligibilityScatterplotDataItemModel) => ({
    year: item.x,
    component: item.y,
    incomeLevel: get(incomeLevels, `[${item.incomeLevel}]`, item.incomeLevel),
    diseaseBurden: get(diseaseBurdens, `[${item.diseaseBurden}]`, ""),
    status: item.eligibility,
  }));
}

interface Props {
  code: string;
}

export function LocationEligibilityTableWrapper(props: Props) {
  useTitle("The Data Explorer - Location Eligibility");

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("year ASC");

  const data = useStoreState(
    (state) =>
      get(
        state.EligibilityCountry.data,
        "data",
        []
      ) as EligibilityScatterplotDataItemModel[]
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  const fetchData = useStoreActions((store) => store.EligibilityCountry.fetch);

  const isLoading = useStoreState((state) => state.EligibilityCountry.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  function reloadData() {
    const filterString = getAPIFormattedFilters(
      props.code
        ? {
            ...appliedFilters,
            locations: [...appliedFilters.locations, props.code],
          }
        : appliedFilters,
      { search, sortBy }
    );
    fetchData({
      filterString: `${filterString}${
        filterString.length > 0 ? "&" : ""
      }view=table`,
    });
  }

  React.useEffect(() => reloadData(), [props.code, appliedFilters, sortBy]);

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

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

  return (
    <>
      <EligibilityTable
        search={search}
        sortBy={sortBy}
        data={tableData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
        isLoading={isLoading}
        setSearch={setSearch}
        setSortBy={setSortBy}
        columns={[
          { name: "Year", key: "year" },
          { name: "Component", key: "component" },
          { name: "Income Level", key: "incomeLevel" },
          { name: "Disease Burden", key: "diseaseBurden" },
          { name: "Status", key: "status" },
        ]}
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
