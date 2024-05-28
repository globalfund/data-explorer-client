import React from "react";
import get from "lodash/get";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { DatasetPage } from "app/pages/datasets/common/page";
import CircularProgress from "@mui/material/CircularProgress";
import { SunburstChart } from "app/components/charts/sunburst";
import { FilterGroupModel } from "app/components/filters/list/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { SunburstDataItem } from "app/components/charts/sunburst/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { ReactComponent as BarChartIcon } from "app/assets/vectors/Select_BarChart.svg";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { ReactComponent as SunburstChartIcon } from "app/assets/vectors/Select_SunburstChart.svg";
import { ExpandableHorizontalBarChartDataItem } from "app/components/charts/expandable-horizontal-bar/data";
import {
  TABLE_VARIATION_8_DATA,
  TABLE_VARIATION_8_COLUMNS,
} from "app/components/table/data";

const dropdownItems = [
  { label: "Bar Chart", value: "Bar Chart", icon: <BarChartIcon /> },
  {
    label: "Sunburst Chart",
    value: "Sunburst Chart",
    icon: <SunburstChartIcon />,
  },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

export const ResourceMobilizationPage: React.FC = () => {
  const [dropdownSelected, setDropdownSelected] = React.useState(
    dropdownItems[0].value
  );

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
  const dataSunburst = useStoreState(
    (state) =>
      get(
        state.ResourceMobilizationSunburst,
        "data.data",
        []
      ) as SunburstDataItem[]
  );
  const fetchSunburst = useStoreActions(
    (actions) => actions.ResourceMobilizationSunburst.fetch
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
        return state.ResourceMobilizationSunburst.loading;
      case dropdownItems[2].value:
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

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return (
          <ExpandableHorizontalBar
            data={dataBarChart}
            yAxisLabel="Donor Types & Donors"
            xAxisLabel="Amount"
            valueLabels={{
              value: "Pledge",
              value1: "Contribution",
            }}
          />
        );
      case dropdownItems[1].value:
        return <SunburstChart data={dataSunburst} centerLabel="Total Pledge" />;
      case dropdownItems[2].value:
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
  }, [dropdownSelected, dataBarChart, dataSunburst, dataTable]);

  const chartEmpty = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return !dataBarChart || !dataBarChart.length;
      case dropdownItems[1].value:
        return !dataSunburst || !dataSunburst.length;
      case dropdownItems[2].value:
        return !dataTable || !dataTable.length;
      default:
        return false;
    }
  }, [dropdownSelected, dataBarChart, dataSunburst, dataTable]);

  const filterGroups = React.useMemo(() => {
    return [dataDonorFilterOptions, dataReplenishmentPeriodFilterOptions];
  }, [dataDonorFilterOptions, dataReplenishmentPeriodFilterOptions]);

  const filterString = React.useMemo(() => {
    let filterString = "";
    if (appliedFiltersData.donorTypes.length > 0) {
      filterString += `donorTypes=${encodeURIComponent(appliedFiltersData.donorTypes.join(","))}`;
    }
    if (appliedFiltersData.donors.length > 0) {
      filterString += `${filterString.length > 0 ? "&" : ""}donors=${encodeURIComponent(appliedFiltersData.donors.join(","))}`;
    }
    if (appliedFiltersData.replenishmentPeriods.length > 0) {
      filterString += `${filterString.length > 0 ? "&" : ""}periods=${encodeURIComponent(appliedFiltersData.replenishmentPeriods.join(","))}`;
    }
    return filterString;
  }, [appliedFiltersData]);

  React.useEffect(() => {
    fetchStats({ filterString });
    fetchBarChart({ filterString });
    fetchSunburst({
      filterString,
      routeParams: {
        type: "pledge",
      },
    });
    fetchTable({ filterString });
  }, [filterString]);

  return (
    <DatasetPage
      title="Resource Mobilization"
      filterGroups={filterGroups}
      appliedFilters={pageAppliedFilters}
      handleResetFilters={handleResetFilters}
      breadcrumbs={[{ label: "Datasets" }, { label: "Resource Mobilization" }]}
      subtitle="Government, private sector, non-government and other donor pledges and contributions"
    >
      <Box width="100%" marginTop="50px">
        <Grid container marginBottom="50px" position="relative">
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
            gap="20px"
            display="flex"
            flexDirection="column"
            sx={{
              paddingRight: "21px",
              borderRight: "1px solid #CFD4DA",
              "@media (max-width: 600px)": {
                paddingRight: "0px",
                borderRightStyle: "none",
              },
            }}
          >
            <Box>
              <Typography variant="h5">
                {get(dataStats, "percentage", 0).toFixed(2).replace(".00", "")}%
              </Typography>
              <Typography fontSize="14px" fontWeight="700">
                Pledge Conversion based on the announce pledge
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h5">
                {formatFinancialValue(get(dataStats, "totalPledges", 0))}
              </Typography>
              <Typography fontSize="14px" fontWeight="700">
                Total Pledged
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h5">
                {formatFinancialValue(get(dataStats, "totalContributions", 0))}
              </Typography>
              <Typography fontSize="14px" fontWeight="700">
                Total Contributed
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={8}
            sx={{
              paddingLeft: "21px",
              "@media (max-width: 600px)": {
                paddingLeft: "0px",
              },
            }}
          >
            <Box marginBottom="20px">
              <Typography variant="h5">Total Donors Mobilized</Typography>
              <Typography variant="body2" fontWeight="700">
                Grouped by their Donor types
              </Typography>
            </Box>
            <Grid
              container
              spacing={2}
              sx={{
                minHeight: "200px",
              }}
            >
              <Grid item xs={12} sm={4} md={3} lg={2}>
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
                    Total number of donors
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                xs={12}
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
                    },
                  },
                }}
              >
                {get(dataStats, "donorTypesCount", []).map((item) => (
                  <Grid item xs={12} sm={6} md={6} lg={3} key={item.name}>
                    <Box bgcolor="#F1F3F5" padding="5px 10px">
                      <Typography variant="h5">{item.value}</Typography>
                      <Typography fontSize="12px">from {item.name}</Typography>
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
          }}
        />
        <Box
          paddingTop="50px"
          sx={
            dropdownSelected === dropdownItems[2].value
              ? {
                  "#content": {
                    padding: 0,
                  },
                }
              : {}
          }
        >
          <DatasetChartBlock
            title="Pledges & Contributions"
            subtitle="Government, private sector, non-government and other donor pledges and contributions."
            dropdownItems={dropdownItems}
            dropdownSelected={dropdownSelected}
            handleDropdownChange={handleSelectionChange}
            disableCollapse={dropdownSelected === dropdownItems[2].value}
            loading={dataChartLoading}
            empty={chartEmpty}
          >
            {chartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
