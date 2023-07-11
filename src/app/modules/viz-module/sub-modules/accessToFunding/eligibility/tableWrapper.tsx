/* third-party */
import React from "react";
import get from "lodash/get";
import orderBy from "lodash/orderBy";

import { useDebounce } from "react-use";
import { useRecoilValue } from "recoil";
import TablePagination from "@material-ui/core/TablePagination";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { locationAccessToFundingCycleAtom } from "app/state/recoil/atoms";
import { ToolBoxPanelFilters } from "app/components/ToolBoxPanel/components/filters";
import { FilterGroupProps } from "app/components/ToolBoxPanel/components/filters/data";
import { ToolBoxPanelAggregateBy } from "app/components/ToolBoxPanel/components/aggregateby";
import { EligibilityTable } from "app/modules/viz-module/sub-modules/accessToFunding/eligibility/eligibilityTable";

interface Props {
  code?: string;
  forceExpand?: boolean;
}

export function AccessToFundingEligibilityTableWrapper(props: Props) {
  const data = useStoreState(
    (state) =>
      get(
        state.LocationAccessToFunding.EligibilityTable.data,
        "data",
        []
      ) as SimpleTableRow[]
  );

  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState(
    `level1 ${props.code ? "DESC" : "ASC"}`
  );
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);
  const [selectedAggregate, setSelectedAggregate] =
    React.useState("geographicAreaName");
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupProps | null>(null);

  const controlItems = {
    aggregates: [
      { label: "Locations", value: "geographicAreaName" },
      { label: "Components", value: "componentName" },
    ],
  };

  const fetchData = useStoreActions(
    (store) => store.LocationAccessToFunding.EligibilityTable.fetch
  );

  const isLoading = useStoreState(
    (state) => state.LocationAccessToFunding.EligibilityTable.loading
  );
  const selectedAggregation = useStoreState(
    (state) => state.ToolBoxPanelAggregateByState.value
  );

  const cycle = useRecoilValue(locationAccessToFundingCycleAtom);

  const [appliedFilters, setAppliedFilters] = React.useState<{
    [key: string]: string[];
  }>({
    year: [],
    components: [],
    status: [],
    diseaseBurden: [],
  });

  const storedAppliedFilters = useStoreState(
    (state) => state.AppliedFiltersState
  );

  const filterGroups = [
    {
      name: "Eligibility Years",
    },
    {
      name: "Components",
    },
    {
      name: "Eligibility Status",
    },
    {
      name: "Disease Burden",
    },
  ];

  const groupAppliedFiltersPathKey = {
    "Eligibility Years": "year",
    Components: "components",
    "Eligibility Status": "status",
    "Disease Burden": "diseaseBurden",
  };

  function reloadData() {
    const filterStr: string[] = [];
    const appliedFiltersToUse = props.code
      ? appliedFilters
      : storedAppliedFilters;
    if (props.code) {
      filterStr.push(`locations=${props.code}`);
    } else {
      filterStr.push(`locations=${appliedFiltersToUse.locations.join(",")}`);
    }
    if (search.length > 0) {
      filterStr.push(`q=${search}`);
    }
    if (sortBy.length > 0) {
      filterStr.push(`sortBy=${sortBy}`);
    }
    if (appliedFilters.year.length > 0) {
      filterStr.push(`periods=${appliedFilters.year.join(",")}`);
    }
    if (appliedFiltersToUse.components.length > 0) {
      filterStr.push(`components=${appliedFiltersToUse.components.join(",")}`);
    }
    if (appliedFiltersToUse.status.length > 0) {
      filterStr.push(`status=${appliedFiltersToUse.status.join(",")}`);
    }
    if (appliedFilters.diseaseBurden.length > 0) {
      filterStr.push(`diseaseBurden=${appliedFilters.diseaseBurden.join(",")}`);
    }
    if (cycle !== "All" && props.code) {
      filterStr.push(
        `cycles=${(cycle || "").replace("-20", "-")}${
          cycle === "2002-2013" ? ",null" : ""
        }`
      );
    }
    const aggregateBy = props.code ? selectedAggregate : selectedAggregation;
    fetchData({
      filterString: `aggregateBy=${aggregateBy}&${filterStr.join("&")}`,
    });
  }

  React.useEffect(
    () => reloadData(),
    [
      props.code,
      storedAppliedFilters,
      selectedAggregation,
      selectedAggregate,
      appliedFilters,
      sortBy,
      cycle,
    ]
  );

  const [,] = useDebounce(
    () => {
      if (search.length > 0 || search === "") {
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

  React.useEffect(() => {
    if (!props.code) {
      document.title = "The Data Explorer - Eligibility";
    }
  }, []);

  let columns = [
    { name: "Location", key: "level1" },
    { name: "Component", key: "level2" },
    {
      name: "Eligibility Status",
      key: "eligibilityStatus",
      valueToColorMap: {
        Eligible: "#11AD6B",
        "Not Eligible": "#FA7355",
        "Transition Funding": "#F7E248",
      },
    },
    { name: "Disease Burden", key: "diseaseBurden" },
    { name: "Income Level", key: "incomeLevel" },
  ];

  if (
    (props.code ? selectedAggregate : selectedAggregation) === "componentName"
  ) {
    columns = [
      { name: "Component", key: "level1" },
      { name: "Location", key: "level2" },
      {
        name: "Eligibility Status",
        key: "eligibilityStatus",
        valueToColorMap: {
          Eligible: "#11AD6B",
          "Not Eligible": "#FA7355",
          "Transition Funding": "#F7E248",
        },
      },
      { name: "Disease Burden", key: "diseaseBurden" },
      { name: "Income Level", key: "incomeLevel" },
    ];
  }

  let formattedData: SimpleTableRow[] = [];
  if (props.code && props.forceExpand) {
    if (selectedAggregate === "componentName") {
      data.forEach((row) => {
        formattedData.push({
          ...row,
          children: row.children?.map((child) => ({
            level1: child.level1,
            ...child.children?.[0],
          })),
        });
      });
    } else {
      columns[0] = { name: "Year", key: "level1" };
      data.forEach((row) => {
        row.children?.forEach((child) => {
          formattedData.push(child);
        });
      });
    }
  } else {
    formattedData = data;
  }
  const sortedData = formattedData.map((fdata) => {
    const sort = orderBy(fdata.children, ["level1"], ["desc"]);
    return { ...fdata, children: sort };
  });

  return (
    <div
      css={`
        position: relative;
        overflow: hidden;
        padding: 10px;
      `}
    >
      {isLoading && <PageLoader inLoader />}
      {props.code && (
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
      )}
      {props.code && (
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
              height: 100%;
              display: flex;
              max-height: 100%;
              flex-direction: column;

              #scrollable-div {
                height: calc(100% - 260px);
                max-height: calc(100% - 260px);
              }
            `}
          >
            <ToolBoxPanelAggregateBy
              title="Aggregate by"
              selected={selectedAggregate}
              options={controlItems.aggregates}
              setSelected={setSelectedAggregate}
            />
            <ToolBoxPanelFilters
              groups={filterGroups}
              expandedGroup={expandedGroup}
              appliedFilters={appliedFilters}
              setExpandedGroup={setExpandedGroup}
              setAppliedFilters={setAppliedFilters}
              defaultAppliedFilters={{
                year: [],
                components: [],
                status: [],
                diseaseBurden: [],
              }}
              groupAppliedFiltersPathKey={groupAppliedFiltersPathKey}
            />
          </div>
        </div>
      )}
      <EligibilityTable
        search={search}
        sortBy={sortBy}
        data={sortedData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
        setSearch={setSearch}
        setSortBy={setSortBy}
        isLocation={props.code !== undefined}
        columns={columns}
        title={props.code ? "Eligibility" : ""}
        forceExpand={props.forceExpand}
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
