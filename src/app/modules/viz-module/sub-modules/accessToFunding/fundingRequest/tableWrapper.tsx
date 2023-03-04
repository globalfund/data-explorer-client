/* third-party */
import React from "react";
import get from "lodash/get";
import { useDebounce, useTitle, useUpdateEffect } from "react-use";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
/* project */
import { PageLoader } from "app/modules/common/page-loader";
import { SimpleTableRow } from "app/components/Table/Simple/data";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import {
  diseaseBurdens,
  EligibilityScatterplotDataItemModel,
  incomeLevels,
} from "app/components/Charts/Eligibility/Scatterplot/data";
import {
  fundingRequestData,
  fundingRequestColumns,
} from "../../fundingRequests/table/data-wrappers/data";
import {
  FilterGroupProps,
  fundingRequestFilterGroups,
} from "app/components/ToolBoxPanel/components/filters/data";
import { ClickAwayListener, Slide } from "@material-ui/core";
import { TriangleXSIcon } from "app/assets/icons/TriangleXS";
import { ToolBoxPanelControlRow } from "app/components/ToolBoxPanel/components/controlrow";
import { ViewModel } from "app/components/ToolBoxPanel/utils/getControlItems";
import { ToolBoxPanelFilters } from "app/components/ToolBoxPanel/components/filters";
import { Table } from "./table";

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
  codeParam: string;
  filterGroups: FilterGroupProps[];
}

export function AccessToFundingRequestTableWrapper(props: Props) {
  useTitle("The Data Explorer - Location Eligibility");
  const [openToolboxPanel, setOpenToolboxPanel] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");

  const data = useStoreState(
    (state) =>
      get(
        state.EligibilityCountry.data,
        "data",
        []
      ) as EligibilityScatterplotDataItemModel[]
  );

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

  const [,] = useDebounce(() => reloadData(), 500, [search]);

  const [selectedView, setSelectedView] = React.useState("Table");

  const [controlItems, setControlItems] = React.useState<{
    views: ViewModel[];
    aggregates: ViewModel[];
  }>({
    views: [{ label: "Table", value: "Table", link: location.pathname }],
    aggregates: [{} as ViewModel],
  });

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div
        css={`
          position: relative;
        `}
      >
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
        <ClickAwayListener
          onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
            if (openToolboxPanel) {
              setOpenToolboxPanel(!openToolboxPanel);
            }
          }}
        >
          <>
            <Slide direction="left" in={openToolboxPanel}>
              <div
                css={`
                  right: -8px;
                  z-index: 4;
                  width: 600px;

                  position: absolute;
                  background: #f5f5f7;
                  height: 93%;
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
                  {}
                  <React.Fragment>
                    <ToolBoxPanelControlRow
                      title="Views"
                      selected={selectedView}
                      options={controlItems.views}
                      setSelected={setSelectedView}
                    />

                    <ToolBoxPanelFilters groups={fundingRequestFilterGroups} />
                  </React.Fragment>
                </div>
              </div>
            </Slide>
          </>
        </ClickAwayListener>

        <Table
          search={search}
          sortBy={sortBy}
          data={fundingRequestData}
          isLoading={isLoading}
          setSearch={setSearch}
          setSortBy={setSortBy}
          columns={fundingRequestColumns}
          title="2023-2025"
        />
      </div>
    </>
  );
}
