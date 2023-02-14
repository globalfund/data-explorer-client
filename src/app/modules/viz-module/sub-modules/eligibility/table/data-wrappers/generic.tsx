/* third-party */
import React from "react";
import get from "lodash/get";
import TablePagination from "@material-ui/core/TablePagination";
import { useDebounce, useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { InfoIcon } from "app/assets/icons/Info";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";
import { EligibilityTable } from "app/modules/viz-module/sub-modules/eligibility/table";

function getTableData(data: DotChartModel[]): SimpleTableRow[] {
  const updatedTableData: SimpleTableRow[] = [];
  data.forEach((item: DotChartModel) => {
    updatedTableData.push({
      name: item.name,
      status: "",
      children: item.items.map((subItem: any) => ({
        name: subItem.name,
        status: subItem.status,
      })),
    });
  });
  return updatedTableData;
}

export function GenericEligibilityWrapper() {
  useTitle("The Data Explorer - Eligibility");

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelEligibilityYearState.value
  );

  const fetchYearOptionsData = useStoreActions(
    (store) => store.EligibilityYears.fetch
  );

  const data = useStoreState(
    (state) => get(state.Eligibility.data, "data", []) as DotChartModel[]
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  // aggregateBy control const
  const aggregateBy = useStoreState(
    (state) =>
      (state.ToolBoxPanelAggregateByState.value.length > 0
        ? state.ToolBoxPanelAggregateByState.value
        : "componentName") as "componentName" | "geographicAreaName"
  );

  const fetchData = useStoreActions((store) => store.Eligibility.fetch);

  const isLoading = useStoreState((state) => state.Eligibility.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  React.useEffect(() => {
    fetchYearOptionsData({});
  }, []);

  function reloadData() {
    const filterString = getAPIFormattedFilters(appliedFilters, {
      search,
      sortBy,
    });
    fetchData({
      filterString: `aggregateBy=${aggregateBy}&periods=${selectedYear}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }

  React.useEffect(
    () => reloadData(),
    [aggregateBy, appliedFilters, selectedYear, sortBy]
  );

  useUpdateEffect(() => setTableData(getTableData(data)), [data]);

  const [,] = useDebounce(() => reloadData(), 500, [search]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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
            font-weight: bold;
            margin-right: 10px;
            font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
          `}
        >
          Year {selectedYear}
        </div>
        <div
          css={`
            display: flex;
            margin-left: 10px;
          `}
        >
          <InfoIcon />
        </div>
      </div>
      <div css="width: 100%;height: 25px;" />
      <EligibilityTable
        search={search}
        sortBy={sortBy}
        data={tableData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
        isLoading={isLoading}
        setSearch={setSearch}
        setSortBy={setSortBy}
        columns={[
          {
            name:
              aggregateBy === "componentName"
                ? "Component/Location"
                : "Location/Component",
            key: "name",
          },
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
    </React.Fragment>
  );
}
