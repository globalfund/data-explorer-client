import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DatasetPage } from "app/pages/datasets/common/page";
import CircularProgress from "@mui/material/CircularProgress";
import { FilterGroupModel } from "app/components/filters/list/data";
import { TABLE_VARIATION_8_COLUMNS } from "app/components/table/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import { ReactComponent as BarChartIcon } from "app/assets/vectors/Select_BarChart.svg";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { ExpandableHorizontalBarChartDataItem } from "app/components/charts/expandable-horizontal-bar/data";
import { useCMSData } from "app/hooks/useCMSData";

const dropdownItems = [
  { label: "Bar Chart", value: "Bar Chart", icon: <BarChartIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

export const ResourceMobilizationPage: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
  useTitle("The Data Explorer - Resource Mobilization");
  const location = useLocation();
  const tabletScreen = useMediaQuery(
    "(min-width: 768px) and (max-width:920px)"
  );

  const [dropdownSelected, setDropdownSelected] = React.useState(
    dropdownItems[0].value
  );
  const [chartAppliedFilters, setChartAppliedFilters] = React.useState<
    string[]
  >([]);
  const [chartAppliedFiltersData, setChartAppliedFiltersData] = React.useState({
    ...defaultAppliedFilters,
  });

  const dataStats = useStoreState(
    (state) =>
      get(state.ResourceMobilizationStats, "data.data", {
        totalPledges: 0,
        totalContributions: 0,
        percentage: 0,
        donorTypesCount: [],
      }) as {
        totalPledges: number;
        totalContributions: number;
        percentage: number;
        donorTypesCount: { name: string; value: number }[];
      }
  );
  const loadingStats = useStoreState(
    (state) => state.ResourceMobilizationStats.loading
  );
  const fetchStats = useStoreActions(
    (actions) => actions.ResourceMobilizationStats.fetch
  );
  const dataBarChart = useStoreState(
    (state) =>
      get(
        state.ResourceMobilizationExpandableBarChart,
        "data.data",
        []
      ) as ExpandableHorizontalBarChartDataItem[]
  );
  const fetchBarChart = useStoreActions(
    (actions) => actions.ResourceMobilizationExpandableBarChart.fetch
  );
  const dataTable = useStoreState((state) =>
    get(state.ResourceMobilizationTable, "data.data", [])
  );
  const fetchTable = useStoreActions(
    (actions) => actions.ResourceMobilizationTable.fetch
  );
  const dataChartLoading = useStoreState((state) => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return state.ResourceMobilizationExpandableBarChart.loading;
      case dropdownItems[1].value:
        return state.ResourceMobilizationTable.loading;
      default:
        return false;
    }
  });
  const dataDonorFilterOptions = useStoreState(
    (state) =>
      get(state.DonorFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataReplenishmentPeriodFilterOptions = useStoreState(
    (state) =>
      get(state.ReplenishmentPeriodFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const pageAppliedFilters = useStoreState((state) => [
    ...state.AppliedFiltersState.donorTypes,
    ...state.AppliedFiltersState.donors,
    ...state.AppliedFiltersState.replenishmentPeriods,
  ]);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  const handleResetFilters = () => {
    appliedFiltersActions.setAll({
      ...appliedFiltersData,
      donorTypes: [],
      donors: [],
      replenishmentPeriods: [],
    });
  };

  const handleResetChartFilters = () => {
    setChartAppliedFiltersData({
      ...chartAppliedFiltersData,
      donorTypes: [],
      donors: [],
      replenishmentPeriods: [],
    });
    setChartAppliedFilters([]);
  };

  const handleToggleChartFilter = (
    checked: boolean,
    value: string,
    type: string
  ) => {
    const state = { ...chartAppliedFiltersData };
    switch (type) {
      case "donor":
        if (checked) {
          state.donors.push(value);
        } else {
          state.donors = state.donors.filter((item) => item !== value);
        }
        break;
      case "donorType":
        if (checked) {
          state.donorTypes.push(value);
        } else {
          state.donorTypes = state.donorTypes.filter((item) => item !== value);
        }
        break;
      case "replenishmentPeriod":
        if (checked) {
          state.replenishmentPeriods.push(value);
        } else {
          state.replenishmentPeriods = state.replenishmentPeriods.filter(
            (item) => item !== value
          );
        }
        break;
      default:
        break;
    }
    setChartAppliedFiltersData(state);
    setChartAppliedFilters([
      ...state.donorTypes,
      ...state.donors,
      ...state.replenishmentPeriods,
    ]);
  };

  const handleRemoveChartFilter = (value: string, types: string[]) => {
    const state = { ...chartAppliedFiltersData };
    types.forEach((type) => {
      switch (type) {
        case "donor":
        case "donorType":
          state.donors = state.donors.filter((item) => item !== value);
          state.donorTypes = state.donorTypes.filter((item) => item !== value);
          break;
        case "replenishmentPeriod":
          state.replenishmentPeriods = state.replenishmentPeriods.filter(
            (item) => item !== value
          );
          break;
        default:
          break;
      }
    });
    setChartAppliedFiltersData(state);
    setChartAppliedFilters([
      ...state.donorTypes,
      ...state.donors,
      ...state.replenishmentPeriods,
    ]);
  };

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return (
          <ExpandableHorizontalBar
            data={dataBarChart}
            yAxisLabel={get(
              cmsData,
              "pagesDatasetsResourceMobilization.barchartYLabel",
              "Donor Types & Donors"
            )}
            xAxisLabel={get(
              cmsData,
              "pagesDatasetsResourceMobilization.barchartXLabel",
              "Amount"
            )}
            valueLabels={{
              value: get(
                cmsData,
                "pagesDatasetsResourceMobilization.barchartValueLabel1",
                "Pledge"
              ),
              value1: get(
                cmsData,
                "pagesDatasetsResourceMobilization.barchartValueLabel2",
                "Contribution"
              ),
            }}
          />
        );
      case dropdownItems[1].value:
        return (
          <Table
            dataTree
            data={dataTable}
            id="pledges-contributions-table"
            columns={TABLE_VARIATION_8_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [dropdownSelected, dataBarChart, dataTable]);

  const chartEmpty = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return !dataBarChart || !dataBarChart.length;
      case dropdownItems[1].value:
        return !dataTable || !dataTable.length;
      default:
        return false;
    }
  }, [dropdownSelected, dataBarChart, dataTable]);

  const filterGroups = React.useMemo(() => {
    return [dataDonorFilterOptions, dataReplenishmentPeriodFilterOptions];
  }, [dataDonorFilterOptions, dataReplenishmentPeriodFilterOptions]);

  const filterString = React.useMemo(() => {
    let filterString = "";
    if (
      appliedFiltersData.donorTypes.length > 0 &&
      location.search.includes("donorTypes=")
    ) {
      filterString += `donorTypes=${encodeURIComponent(
        appliedFiltersData.donorTypes.join(",")
      )}`;
    }
    if (
      appliedFiltersData.donors.length > 0 &&
      location.search.includes("donors=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }donors=${encodeURIComponent(appliedFiltersData.donors.join(","))}`;
    }
    if (
      appliedFiltersData.replenishmentPeriods.length > 0 &&
      location.search.includes("periods=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }periods=${encodeURIComponent(
        appliedFiltersData.replenishmentPeriods.join(",")
      )}`;
    }
    return filterString;
  }, [appliedFiltersData, location.search]);

  const chartFilterString = React.useMemo(() => {
    let filterString = "";
    if (
      (appliedFiltersData.donorTypes.length > 0 &&
        location.search.includes("donorTypes=")) ||
      chartAppliedFiltersData.donorTypes.length > 0
    ) {
      filterString += `donorTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.donorTypes,
          ...chartAppliedFiltersData.donorTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.donors.length > 0 &&
        location.search.includes("donors=")) ||
      chartAppliedFiltersData.donors.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }donors=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.donors,
          ...chartAppliedFiltersData.donors,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.replenishmentPeriods.length > 0 &&
        location.search.includes("periods=")) ||
      chartAppliedFiltersData.replenishmentPeriods.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }periods=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.replenishmentPeriods,
          ...chartAppliedFiltersData.replenishmentPeriods,
        ]).join(",")
      )}`;
    }
    return filterString;
  }, [appliedFiltersData, chartAppliedFiltersData, location.search]);

  React.useEffect(() => {
    fetchStats({ filterString });
  }, [filterString]);

  React.useEffect(() => {
    fetchBarChart({ filterString: chartFilterString });
    fetchTable({ filterString: chartFilterString });
  }, [chartFilterString]);

  React.useEffect(() => {
    if (location.hash) {
      const blockId = location.hash.slice(1).split("|")[0];
      const blockChartType = location.hash.slice(1).split("|")[1];
      if (blockId && blockChartType) {
        switch (blockId) {
          case "disbursements":
            setDropdownSelected(decodeURIComponent(blockChartType));
            break;
          default:
            break;
        }
      }
    }
  }, [location.hash]);

  return (
    <DatasetPage
      title={get(
        cmsData,
        "pagesDatasetsResourceMobilization.title",
        "Resource Mobilization"
      )}
      filterGroups={filterGroups}
      appliedFilters={pageAppliedFilters}
      handleResetFilters={handleResetFilters}
      breadcrumbs={[{ label: "Datasets" }, { label: "Resource Mobilization" }]}
      subtitle={get(
        cmsData,
        "pagesDatasetsResourceMobilization.subtitle",
        "Government, private sector, non-government and other donor pledges and contributions"
      )}
    >
      <Box width="100%" marginTop="50px">
        <Grid
          container
          marginBottom="50px"
          position="relative"
          sx={{
            "@media (max-width: 767px)": {
              marginBottom: "16px",
            },
          }}
        >
          {loadingStats && (
            <Box
              width="100%"
              height="100%"
              display="flex"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255, 255, 255, 0.8)"
            >
              <CircularProgress />
            </Box>
          )}
          <Grid
            item
            sm={12}
            md={4}
            // gap="20px"
            display="flex"
            flexDirection="column"
            sx={{
              paddingRight: "21px",
              borderRight: "1px solid #CFD4DA",
              "> div": {
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              },
              "@media (max-width: 920px)": {
                paddingRight: "0px",
                flexDirection: "row",
                marginBottom: "50px",
                borderRightStyle: "none",
                justifyContent: "space-around",
              },
              "@media (max-width: 767px)": {
                gap: "16px",
                width: "100%",
                marginBottom: "64px",
                flexDirection: "column",
              },
            }}
          >
            {/* <Box>
              <Typography variant="h5">
                {get(dataStats, "percentage", 0).toFixed(2).replace(".00", "")}%
              </Typography>
              <Typography fontSize="14px" fontWeight="700">
                {get(
                  cmsData,
                  "pagesDatasetsResourceMobilization.statsText1",
                  "Pledge Conversion based on the announce pledge"
                )}
              </Typography>
            </Box>
            <Divider /> */}
            <Box>
              <Typography variant="h5">
                {formatFinancialValue(get(dataStats, "totalPledges", 0))}
              </Typography>
              <Typography fontSize="14px" fontWeight="700">
                {get(
                  cmsData,
                  "pagesDatasetsResourceMobilization.statsText2",
                  "Total Pledged"
                )}
              </Typography>
            </Box>
            <Divider orientation={tabletScreen ? "vertical" : "horizontal"} />
            <Box>
              <Typography variant="h5">
                {formatFinancialValue(get(dataStats, "totalContributions", 0))}
              </Typography>
              <Typography fontSize="14px" fontWeight="700">
                {get(
                  cmsData,
                  "pagesDatasetsResourceMobilization.statsText3",
                  "Total Contributed"
                )}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={8}
            sx={{
              paddingLeft: "21px",
              "@media (max-width: 920px)": {
                paddingLeft: "0px",
              },
            }}
          >
            <Box marginBottom="20px">
              <Typography variant="h5">
                {get(
                  cmsData,
                  "pagesDatasetsResourceMobilization.statsText4Title",
                  "Number of Donors Mobilized"
                )}
              </Typography>
              <Typography variant="body2" fontWeight="700">
                {get(
                  cmsData,
                  "pagesDatasetsResourceMobilization.statsText4Subtitle",
                  "Grouped by their Donor types"
                )}
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                minHeight: "200px",
              }}
            >
              <Grid item xs={4} sm={4} md={3} lg={2}>
                <Box
                  height="100%"
                  bgcolor="#F1F3F5"
                  padding="5px 10px"
                  borderRadius="5px"
                >
                  <Typography fontSize="40px" fontWeight="700">
                    {sumBy(get(dataStats, "donorTypesCount", []), "value")}
                  </Typography>
                  <Typography variant="body2">
                    {get(
                      cmsData,
                      "pagesDatasetsResourceMobilization.statsText5",
                      "Total number of donors"
                    )}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                xs={8}
                sm={8}
                md={9}
                lg={10}
                height="100%"
                sx={{
                  "> div": {
                    "> div": {
                      height: "84px",
                      borderRadius: "5px",
                      "> *": {
                        lineHeight: "normal",
                      },
                      "@media (max-width: 920px)": {
                        height: "104px",
                      },
                      "@media (max-width: 767px)": {
                        height: "auto",
                        padding: "10px",
                      },
                    },
                  },
                }}
              >
                {get(dataStats, "donorTypesCount", []).map((item) => (
                  <Grid item xs={12} sm={3} md={3} lg={3} key={item.name}>
                    <Box bgcolor="#F1F3F5" padding="5px 10px">
                      <Typography variant="h5">{item.value}</Typography>
                      <Typography fontSize="12px">{item.name}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider
          sx={{
            left: 0,
            width: "100vw",
            position: "absolute",
            borderColor: "#CFD4DA",
            "@media (max-width: 767px)": {
              display: "none",
            },
          }}
        />
        <Box
          paddingTop="50px"
          sx={
            dropdownSelected === dropdownItems[1].value
              ? {
                  "#content": {
                    padding: 0,
                  },
                }
              : {}
          }
        >
          <DatasetChartBlock
            id="pledges-contributions"
            title={get(
              cmsData,
              "pagesDatasetsResourceMobilization.pledgesTitle",
              "Pledges & Contributions"
            )}
            subtitle={get(
              cmsData,
              "pagesDatasetsResourceMobilization.pledgesSubtitle",
              "Government, private sector, non-government and other donor pledges and contributions."
            )}
            dropdownItems={dropdownItems}
            dropdownSelected={dropdownSelected}
            handleDropdownChange={handleSelectionChange}
            disableCollapse={dropdownSelected === dropdownItems[1].value}
            loading={dataChartLoading}
            empty={chartEmpty}
            filterGroups={filterGroups}
            appliedFilters={chartAppliedFilters}
            toggleFilter={handleToggleChartFilter}
            removeFilter={handleRemoveChartFilter}
            handleResetFilters={handleResetChartFilters}
            appliedFiltersData={chartAppliedFiltersData}
            infoType="pledges_contributions"
          >
            {chartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
