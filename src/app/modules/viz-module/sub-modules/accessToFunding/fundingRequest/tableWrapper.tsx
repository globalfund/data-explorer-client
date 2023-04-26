/* third-party */
import React from "react";
import get from "lodash/get";
import { useDebounce } from "react-use";
import { useRecoilValue } from "recoil";
import Slide from "@material-ui/core/Slide";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
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
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  const data = useStoreState(
    (state) =>
      get(
        state.LocationAccessToFunding.FundingRequestsTable.data,
        "data",
        []
      ) as SimpleTableRow[]
  );

  const fetchData = useStoreActions(
    (store) => store.LocationAccessToFunding.FundingRequestsTable.fetch
  );

  const isLoading = useStoreState(
    (state) => state.LocationAccessToFunding.FundingRequestsTable.loading
  );

  const cycle = useRecoilValue(locationAccessToFundingCycleAtom);

  const [appliedFilters, setAppliedFilters] = React.useState<{
    [key: string]: string[];
  }>({
    components: [],
    trpWindows: [],
  });
  const [expandedGroup, setExpandedGroup] =
    React.useState<FilterGroupProps | null>(null);

  const filterGroups = [
    {
      name: "Components",
    },
    {
      name: "TRP Window",
    },
  ];

  const groupAppliedFiltersPathKey = {
    Components: "components",
    "TRP Window": "trpWindows",
  };

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
    if (cycle !== "All") {
      filterStr.push(`cycles=${cycle}`);
    }
    fetchData({
      filterString: filterStr.join("&"),
    });
  }

  React.useEffect(
    () => reloadData(),
    [props.code, appliedFilters, sortBy, cycle]
  );

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
    <>
      <div
        css={`
          position: relative;
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

            right: ${openToolboxPanel ? "48%" : 0};

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
        <Slide direction="left" in={openToolboxPanel}>
          <div
            css={`
              z-index: 4;
              right: -8px;
              width: 600px;
              height: 400px;
              position: absolute;
              background: #f5f5f7;
              visibility: visible !important;
              overflow-y: auto;

              box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
              border-radius: 20px;
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
        </Slide>
        <Table
          forceExpand
          search={search}
          sortBy={sortBy}
          data={data}
          setSearch={setSearch}
          setSortBy={setSortBy}
          columns={fundingRequestColumns}
          title={cycle || ""}
        />
      </div>
    </>
  );
}
