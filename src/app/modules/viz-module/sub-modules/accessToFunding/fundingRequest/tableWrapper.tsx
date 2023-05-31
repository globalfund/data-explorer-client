/* third-party */
import React from "react";
import get from "lodash/get";
import orderBy from "lodash/orderBy";
import { useDebounce } from "react-use";
import { useRecoilValue } from "recoil";
import Slide from "@material-ui/core/Slide";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import TablePagination from "@material-ui/core/TablePagination";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { locationAccessToFundingCycleAtom } from "app/state/recoil/atoms";
import { ToolBoxPanelFilters } from "app/components/ToolBoxPanel/components/filters";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { Table } from "app/modules/viz-module/sub-modules/accessToFunding/fundingRequest/table";
import { fundingRequestColumns } from "app/modules/viz-module/sub-modules/fundingRequests/table/data-wrappers/data";

interface Props {
  code: string;
  codeParam: string;
  filterGroups: FilterGroupProps[];
}

export function AccessToFundingRequestTableWrapper(props: Props) {
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupProps | null>(null);
  const [appliedFilters, setAppliedFilters] = React.useState<{
    [key: string]: string[];
  }>({
    components: [],
    trpWindows: [],
    portfolioCategories: [],
  });

  const filterGroups = [
    {
      name: "Components",
    },
    {
      name: "TRP Window",
    },
    {
      name: "Portfolio Categorization",
    },
  ];

  const groupAppliedFiltersPathKey = {
    Components: "components",
    "TRP Window": "trpWindows",
    "Portfolio Categorization": "portfolioCategories",
  };

  const cycle = useRecoilValue(locationAccessToFundingCycleAtom);

  const data = useStoreState(
    (state) =>
      get(
        state.LocationAccessToFunding.FundingRequestsTable.data,
        "data",
        []
      ) as SimpleTableRow[]
  );

  const isLoading = useStoreState(
    (state) => state.LocationAccessToFunding.FundingRequestsTable.loading
  );

  const fetchData = useStoreActions(
    (store) => store.LocationAccessToFunding.FundingRequestsTable.fetch
  );

  function handleChangePage(
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function reloadData() {
    const filterStr: string[] = [`locations=${props.code}`];
    if (search.length > 0) {
      filterStr.push(`q=${search}`);
    }
    if (sortBy.length > 0) {
      filterStr.push(`sortBy=${sortBy}`);
    }
    if (appliedFilters.components.length > 0) {
      filterStr.push(`components=${appliedFilters.components.join(",")}`);
    }
    if (appliedFilters.trpWindows.length > 0) {
      filterStr.push(`trpWindows=${appliedFilters.trpWindows.join(",")}`);
    }
    if (appliedFilters.portfolioCategories.length > 0) {
      filterStr.push(
        `portfolioCategories=${appliedFilters.portfolioCategories.join(",")}`
      );
    }
    if (cycle !== "All") {
      filterStr.push(`cycles=${cycle}`);
    }
    fetchData({
      filterString: filterStr.join("&"),
    });
  }

  const tableData = React.useMemo(() => {
    if (props.code) {
      const result = get(data, "[0].children", []).slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      );
      if (sortBy.length > 0) {
        return result;
      }
      return orderBy(result, "children", "desc");
    }
    const result = data.map((item) => ({
      ...item,
      children: orderBy(item.children, "children", "desc"),
    }));
    return result.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [data, page, rowsPerPage, sortBy]);

  React.useEffect(() => {
    if ((props.code && cycle) || !props.code) {
      reloadData();
    }
  }, [props.code, appliedFilters, sortBy, cycle]);

  const [,] = useDebounce(
    () => {
      if (search.length > 0) {
        reloadData();
      }
    },
    500,
    [search]
  );

  return (
    <div
      css={`
        position: relative;
        overflow: hidden;
        padding: 10px;
      `}
    >
      {isLoading && <PageLoader inLoader />}
      <div
        role="button"
        tabIndex={-1}
        css={`
          top: 32%;
          color: #fff;
          width: 16px;
          height: 133px;
          z-index: 1;
          display: flex;
          cursor: pointer;
          position: absolute;
          background: #262c34;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          border-radius: 10px 0px 0px 10px;
          transition: all 0.2s ease-in-out;

          right: ${openToolboxPanel ? "49.4%" : 0};

          &:hover {
            background: #13183f;
          }

          > svg {
            transform: rotate(${!openToolboxPanel ? "-" : ""}90deg);
            > path {
              fill: #fff;
            }
          }
        `}
        onClick={() => setOpenToolboxPanel(!openToolboxPanel)}
      >
        <TriangleXSIcon />
      </div>
      <div
        css={`
          z-index: 4;
          right: -8px;
          width: 600px;
          margin-right: ${openToolboxPanel ? "15px" : "-600px"};
          margin-top: 0.1%;
          height: 95%;
          overflow-y: auto;
          transition: all 0.2s ease-in-out;
          position: absolute;
          background: #f5f5f7;
          border-radius: 20px;
          visibility: visible !important;
          box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
          ::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 767px) {
            width: 100vw;
            box-shadow: none;
            overflow-y: auto;
          }
        `}
      >
        <div
          css={`
            width: 100%;

            display: flex;

            flex-direction: column;
          `}
        >
          <ToolBoxPanelFilters
            groups={filterGroups}
            expandedGroup={expandedGroup}
            appliedFilters={appliedFilters}
            setExpandedGroup={setExpandedGroup}
            setAppliedFilters={setAppliedFilters}
            defaultAppliedFilters={{
              components: [],
              trpWindows: [],
            }}
            groupAppliedFiltersPathKey={groupAppliedFiltersPathKey}
          />
        </div>
      </div>
      <Table
        forceExpand
        search={search}
        sortBy={sortBy}
        data={tableData}
        setSearch={setSearch}
        setSortBy={setSortBy}
        columns={
          props.code ? fundingRequestColumns[0].col : fundingRequestColumns
        }
        title={cycle ? "Funding Requests" : ""}
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
    </div>
  );
}
