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
import { useCMSData } from "app/hooks/useCMSData";
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { DotChartModel } from "app/components/Charts/Eligibility/DotChart/data";
import { EligibilityTable } from "app/modules/viz-module/sub-modules/eligibility/table";

function getTableData(data: DotChartModel[]): SimpleTableRow[] {
  const updatedTableData: SimpleTableRow[] = [];
  data.forEach((item: DotChartModel) => {
    let instance = {
      name: item.name,
    };
    item.items.forEach((subItem: any) => {
      instance = {
        ...instance,
        [subItem.name]: subItem.status,
      };
    });
    updatedTableData.push(instance);
  });
  return updatedTableData;
}

export function GenericEligibilityWrapper() {
  useTitle("The Data Explorer - Eligibility");
  const cmsData = useCMSData({ returnData: true });
  const history = useHistory();

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("name ASC");

  const selectedYear = useStoreState(
    (state) => state.ToolBoxPanelEligibilityYearState.value
  );

  const fetchYearOptionsData = useStoreActions(
    (store) => store.EligibilityYears.fetch
  );

  const dataPathSteps = useStoreState((state) => state.DataPathSteps.steps);
  const data = useStoreState(
    (state) => get(state.EligibilityTable.data, "data", []) as DotChartModel[]
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [tableData, setTableData] = React.useState<SimpleTableRow[]>(
    getTableData(data)
  );

  const fetchData = useStoreActions((store) => store.EligibilityTable.fetch);

  const isLoading = useStoreState((state) => state.EligibilityTable.loading);

  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  const addDataPathSteps = useStoreActions(
    (actions) => actions.DataPathSteps.addSteps
  );

  React.useEffect(() => {
    fetchYearOptionsData({});
    if (
      dataPathSteps.length === 0 ||
      !find(dataPathSteps, { name: "Access to Funding: Eligibility" })
    ) {
      addDataPathSteps([
        {
          id: uniqueId(),
          name: "Access to Funding: Eligibility",
          path: `${history.location.pathname}${history.location.search}`,
        },
      ]);
    }
  }, []);

  function reloadData() {
    const filterString = getAPIFormattedFilters(appliedFilters, {
      search,
      sortBy,
    });
    fetchData({
      filterString: `aggregateBy=geographicAreaName&periods=${selectedYear}${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }

  React.useEffect(() => reloadData(), [appliedFilters, selectedYear, sortBy]);

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

  const columns =
    data.length > 0
      ? filter(
          Object.keys(tableData.length > 0 ? tableData[0] : {}),
          (key) => key !== "children"
        ).map((key) => ({
          name: key === "name" ? "Location" : key,
          key,
        }))
      : [];

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
          {get(cmsData, "componentsChartsEligibility.year", "")} {selectedYear}
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
    </React.Fragment>
  );
}
