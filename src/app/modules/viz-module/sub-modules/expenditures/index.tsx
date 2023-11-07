import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import parse from "html-react-parser";
import useTitle from "react-use/lib/useTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Info from "@material-ui/icons/InfoOutlined";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { PageLoader } from "app/modules/common/page-loader";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { ExpendituresChart } from "app/components/Charts/Expenditures";
import { getAPIFormattedFilters } from "app/utils/getAPIFormattedFilters";
import { formatLargeAmountsWithPrefix } from "app/utils/getFinancialValueWithMetricPrefix";

export const StyledMenu = withStyles({
  paper: {
    minWidth: 180,
    boxShadow: "none",
    borderRadius: "12px",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background: appColors.APPBAR.DATASETS_MENU_SCROLLBAR_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background:
        appColors.APPBAR.DATASETS_MENU_SCROLLBAR_TRACK_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background:
        appColors.APPBAR.DATASETS_MENU_SCROLLBAR_THUMB_BACKGROUND_COLOR,
    },
  },
  list: {
    padding: 0,
    maxHeight: 500,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 38,
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
));

export const StyledMenuItem = withStyles({
  root: {
    width: "100%",
    fontSize: "14px",
    padding: "5px 8px",
    background: "#e9eaea",
    textDecoration: "none",
    color: appColors.APPBAR.DATASETS_MENU_ITEM_COLOR,
    "&:hover": {
      fontWeight: 700,
      color: appColors.COMMON.WHITE,
      background: appColors.APPBAR.DATASETS_MENU_ITEM_COLOR,
    },
  },
})(MenuItem);

const options = {
  moduleInterventions: [
    {
      label: "Years",
      value: "period",
    },
    {
      label: "Component",
      value: "component",
    },
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Grant Cycle",
      value: "grantCycle",
    },
    {
      label: "Principal Recipient",
      value: "principalRecipient",
    },
    {
      label: "Modules",
      value: "modules",
    },
  ],
  investmentLandscapes: [
    {
      label: "Years",
      value: "period",
    },
    {
      label: "Component",
      value: "component",
    },
    {
      label: "Location",
      value: "location",
    },
    {
      label: "Grant Cycle",
      value: "grantCycle",
    },
    {
      label: "Principal Recipient",
      value: "principalRecipient",
    },
    {
      label: "Investment Landscape",
      value: "investmentLandscape",
    },
  ],
};

export function ExpendituresModule() {
  useTitle("The Data Explorer - Expenditures");

  const dataset = useStoreState(
    (state) => state.ToolBoxPanelExpendituresDataBySelector.selectedOption
  );

  const optionsList: {
    label: string;
    value: string;
  }[] = React.useMemo(() => {
    return get(options, dataset, options.moduleInterventions);
  }, [dataset]);

  const [rowsAnchorEl, setRowsAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [columnsAnchorEl, setColumnsAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [selectedRowOption, setSelectedRowOption] = React.useState(
    optionsList[0]
  );
  const [selectedColumnOption, setSelectedColumnOption] = React.useState(
    optionsList[1]
  );
  const [valueType, setValueType] = React.useState<"percentage" | "amount">(
    "percentage"
  );
  const [hoveredLegend, setHoveredLegend] = React.useState<string | null>(null);

  const fetchVizData = useStoreActions((actions) => actions.Expenditures.fetch);
  const fetchStats = useStoreActions(
    (actions) => actions.ExpenditureStats.fetch
  );

  const notesDisclaimersCMSAction = useStoreActions(
    (actions) => actions.cms.notesAndDisclaimers.post
  );
  const notesDisclaimersCMSData = useStoreState((state) =>
    get(state.cms.notesAndDisclaimers, "data.entries[0].content", null)
  );

  const vizData = useStoreState((state) =>
    get(state.Expenditures, "data.vizData", [])
  );
  const viewTotal: number = useStoreState((state) =>
    get(state.ExpenditureStats, "data.view", 0)
  );
  const total = useStoreState((state) =>
    get(state.ExpenditureStats, "data.total", 0)
  );
  const loading = useStoreState(
    (state) => state.Expenditures.loading || state.ExpenditureStats.loading
  );
  const appliedFilters = useStoreState((state) => state.AppliedFiltersState);

  function handleRowsBtnClick(event: React.MouseEvent<HTMLElement>) {
    setRowsAnchorEl(event.currentTarget);
  }

  function handleCloseRows() {
    setRowsAnchorEl(null);
  }

  function handleColumnsBtnClick(event: React.MouseEvent<HTMLElement>) {
    setColumnsAnchorEl(event.currentTarget);
  }

  function handleCloseColumns() {
    setColumnsAnchorEl(null);
  }

  React.useEffect(() => {
    notesDisclaimersCMSAction({
      values: {
        filter: { type: "EXPENDITURES" },
      },
    });
  }, []);

  React.useEffect(() => {
    setSelectedRowOption(optionsList[0]);
    setSelectedColumnOption(optionsList[1]);
  }, [dataset]);

  React.useEffect(() => {
    let filterString = getAPIFormattedFilters(appliedFilters);
    const aggregationString = `dataset=${dataset}&rowDimension=${selectedRowOption.value}&columnDimension=${selectedColumnOption.value}`;
    if (filterString) {
      filterString += "&";
    }
    filterString += aggregationString;
    fetchVizData({ filterString });
    fetchStats({ filterString });
  }, [appliedFilters, dataset, selectedRowOption, selectedColumnOption]);

  const view = React.useMemo(() => {
    if (loading) {
      return <PageLoader />;
    }
    return (
      <React.Fragment>
        <div
          css={`
            width: 100%;
            display: flex;
            flex-direction: row;
            padding-bottom: 7px;
            margin-bottom: 16px;
            justify-content: space-between;
            border-bottom: 1px solid ${appColors.COMMON.PRIMARY_COLOR_1};

            > div {
              display: flex;
              flex-direction: column;
            }
          `}
        >
          <div>
            <div
              css={`
                font-size: 14px;
                color: ${appColors.COMMON.SECONDARY_COLOR_2};
              `}
            >
              Expenditure to date:
            </div>
            <div
              css={`
                font-size: 24px;
                font-weight: 700;
                font-family: "GothamNarrow-Bold";
                color: ${appColors.COMMON.PRIMARY_COLOR_1};
              `}
            >
              {formatLargeAmountsWithPrefix(total)
                .replace("$", "")
                .replace("bln", "billion")
                .replace("mln", "million")}{" "}
              USD
            </div>
          </div>
          <div>
            <div
              css={`
                font-size: 14px;
                text-align: right;
                color: ${appColors.COMMON.SECONDARY_COLOR_2};
              `}
            >
              Search result:
            </div>
            <div
              css={`
                display: flex;
                align-items: baseline;
              `}
            >
              <div
                css={`
                  font-size: 24px;
                  font-weight: 700;
                  padding-right: 8px;
                  font-family: "GothamNarrow-Bold";
                  color: ${appColors.COMMON.PRIMARY_COLOR_1};
                  border-right: 2px solid ${appColors.COMMON.PRIMARY_COLOR_1};
                `}
              >
                {formatLargeAmountsWithPrefix(viewTotal)
                  .replace("$", "")
                  .replace("bln", "billion")
                  .replace("mln", "million")}{" "}
                USD
              </div>
              <div
                css={`
                  font-size: 18px;
                  font-weight: 700;
                  padding-left: 8px;
                  color: ${appColors.COMMON.PRIMARY_COLOR_1};
                `}
              >
                {((viewTotal / total) * 100).toFixed(2).replace(".00", "")}%{" "}
                <span
                  css={`
                    font-size: 14px;
                  `}
                >
                  of total
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            margin-bottom: 16px;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <div
            css={`
              gap: 8px;
              display: flex;

              > div {
                > div {
                  gap: 2px;
                  display: flex;
                  font-size: 12px;
                  align-items: center;
                  color: ${appColors.COMMON.SECONDARY_COLOR_3};
                  > svg {
                    font-size: 16px;
                  }
                }
                > button {
                  display: flex;
                  outline: none;
                  font-size: 14px;
                  cursor: pointer;
                  padding: 5px 8px;
                  font-weight: 700;
                  border-radius: 40px;
                  align-items: center;
                  border: 1px solid ${appColors.COMMON.PRIMARY_COLOR_1};

                  &:hover {
                    color: ${appColors.COMMON.WHITE};
                    background: ${appColors.COMMON.PRIMARY_COLOR_1};
                  }
                }
              }
            `}
          >
            <div>
              <div>
                Rows{" "}
                <Info
                  fontSize="small"
                  htmlColor={appColors.COMMON.SECONDARY_COLOR_3}
                />
              </div>
              <button
                onClick={handleRowsBtnClick}
                css={
                  rowsAnchorEl
                    ? `color: ${appColors.COMMON.WHITE};background: ${appColors.COMMON.PRIMARY_COLOR_1};`
                    : `color: ${appColors.COMMON.PRIMARY_COLOR_1};background: ${appColors.COMMON.WHITE};`
                }
              >
                {selectedRowOption.label}
                <ChevronRight
                  fontSize="small"
                  css={`
                    transform: rotate(${rowsAnchorEl ? -90 : 90}deg);
                  `}
                />
              </button>
              <StyledMenu
                keepMounted
                disableScrollLock
                anchorEl={rowsAnchorEl}
                onClose={handleCloseRows}
                open={Boolean(rowsAnchorEl)}
              >
                {optionsList.map((option) => (
                  <StyledMenuItem
                    disableRipple
                    key={option.value}
                    disabled={option.value === selectedColumnOption.value}
                    style={
                      option.value === selectedRowOption.value
                        ? {
                            fontWeight: 700,
                            color: appColors.COMMON.WHITE,
                            background:
                              appColors.APPBAR.DATASETS_MENU_ITEM_COLOR,
                          }
                        : {}
                    }
                    onClick={() => {
                      setSelectedRowOption(option);
                      handleCloseRows();
                    }}
                  >
                    {option.label}
                  </StyledMenuItem>
                ))}
              </StyledMenu>
            </div>
            <div>
              <div>
                Columns{" "}
                <Info
                  fontSize="small"
                  htmlColor={appColors.COMMON.SECONDARY_COLOR_3}
                />
              </div>
              <button
                onClick={handleColumnsBtnClick}
                css={
                  columnsAnchorEl
                    ? `color: ${appColors.COMMON.WHITE};background: ${appColors.COMMON.PRIMARY_COLOR_1};`
                    : `color: ${appColors.COMMON.PRIMARY_COLOR_1};background: ${appColors.COMMON.WHITE};`
                }
              >
                {selectedColumnOption.label}
                <ChevronRight
                  fontSize="small"
                  css={`
                    transform: rotate(${columnsAnchorEl ? -90 : 90}deg);
                  `}
                />
              </button>
              <StyledMenu
                keepMounted
                disableScrollLock
                anchorEl={columnsAnchorEl}
                onClose={handleCloseColumns}
                open={Boolean(columnsAnchorEl)}
              >
                {optionsList.map((option) => (
                  <StyledMenuItem
                    disableRipple
                    key={option.value}
                    disabled={option.value === selectedRowOption.value}
                    style={
                      option.value === selectedColumnOption.value
                        ? {
                            fontWeight: 700,
                            color: appColors.COMMON.WHITE,
                            background:
                              appColors.APPBAR.DATASETS_MENU_ITEM_COLOR,
                          }
                        : {}
                    }
                    onClick={() => {
                      setSelectedColumnOption(option);
                      handleCloseColumns();
                    }}
                  >
                    {option.label}
                  </StyledMenuItem>
                ))}
              </StyledMenu>
            </div>
          </div>
          <div
            css={`
              gap: 8px;
              display: flex;

              > button {
                width: 32px;
                height: 32px;
                display: flex;
                outline: none;
                cursor: pointer;
                font-size: 14px;
                font-weight: 700;
                border-radius: 50%;
                align-items: center;
                justify-content: center;
                border: 1px solid ${appColors.COMMON.PRIMARY_COLOR_1};

                &:hover {
                  color: ${appColors.COMMON.WHITE};
                  background: ${appColors.COMMON.PRIMARY_COLOR_1};
                }
              }
            `}
          >
            <button
              css={
                valueType === "percentage"
                  ? `color: ${appColors.COMMON.WHITE};background: ${appColors.COMMON.PRIMARY_COLOR_1};`
                  : `background: ${appColors.COMMON.WHITE};`
              }
              onClick={() => setValueType("percentage")}
            >
              %
            </button>
            <button
              css={
                valueType === "amount"
                  ? `color: ${appColors.COMMON.WHITE};background: ${appColors.COMMON.PRIMARY_COLOR_1};`
                  : `background: ${appColors.COMMON.WHITE};`
              }
              onClick={() => setValueType("amount")}
            >
              $
            </button>
          </div>
        </div>
        <div
          css={`
            gap: 12px;
            width: 100%;
            display: flex;
            margin-bottom: 16px;
            justify-content: flex-end;

            > div {
              gap: 4px;
              display: flex;
              font-size: 12px;
              cursor: pointer;
              flex-direction: row;
              align-items: center;

              > div:first-child {
                width: 8px;
                height: 8px;
                border-radius: 2px;
              }
            }
          `}
        >
          <div
            onMouseEnter={() =>
              setHoveredLegend(
                appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[0]
              )
            }
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              css={`
                background: ${appColors.EXPENDITURES
                  .CHART_PERCENTAGE_COLORS[0]};
              `}
            />
            <div>{">"}85%</div>
          </div>
          <div
            onMouseEnter={() =>
              setHoveredLegend(
                appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[1]
              )
            }
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              css={`
                background: ${appColors.EXPENDITURES
                  .CHART_PERCENTAGE_COLORS[1]};
              `}
            />
            <div>75% - 84%</div>
          </div>
          <div
            onMouseEnter={() =>
              setHoveredLegend(
                appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[2]
              )
            }
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              css={`
                background: ${appColors.EXPENDITURES
                  .CHART_PERCENTAGE_COLORS[2]};
              `}
            />
            <div>65% - 74%</div>
          </div>
          <div
            onMouseEnter={() =>
              setHoveredLegend(
                appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[3]
              )
            }
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              css={`
                background: ${appColors.EXPENDITURES
                  .CHART_PERCENTAGE_COLORS[3]};
              `}
            />
            <div>{"<"}65%</div>
          </div>
          <div
            onMouseEnter={() =>
              setHoveredLegend(
                appColors.EXPENDITURES.CHART_PERCENTAGE_COLORS[4]
              )
            }
            onMouseLeave={() => setHoveredLegend(null)}
          >
            <div
              css={`
                background: ${appColors.EXPENDITURES
                  .CHART_PERCENTAGE_COLORS[4]};
              `}
            />
            <div>{">"}120% outlier</div>
          </div>
        </div>
        <ExpendituresChart
          data={vizData}
          valueType={valueType}
          hoveredLegend={hoveredLegend}
          rowCategory={selectedRowOption.value}
          columnCategory={selectedColumnOption.value}
        />
        <div
          css={`
            width: 100%;
            padding: 16px;
            margin: 16px 0;
            border-radius: 16px;
            background: ${appColors.EXPENDITURES.CHART_BG_COLOR};
          `}
        >
          <div
            css={`
              font-size: 12px;
              font-weight: 700;
            `}
          >
            Note
          </div>
          <div
            css={`
              font-size: 10px;
              margin-top: 8px;
              line-height: 14px;
            `}
          >
            {notesDisclaimersCMSData && parse(notesDisclaimersCMSData)}
          </div>
        </div>
      </React.Fragment>
    );
  }, [
    total,
    loading,
    vizData,
    valueType,
    viewTotal,
    rowsAnchorEl,
    hoveredLegend,
    columnsAnchorEl,
  ]);

  return view;
}
