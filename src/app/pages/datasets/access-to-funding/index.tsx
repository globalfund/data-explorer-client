import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import { appColors } from "app/theme";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import Info from "@mui/icons-material/InfoOutlined";
import { Treemap } from "app/components/charts/treemap";
import { DatasetPage } from "app/pages/datasets/common/page";
import CircularProgress from "@mui/material/CircularProgress";
import { SunburstChart } from "app/components/charts/sunburst";
import { TableContainer } from "app/components/table-container";
import { BarSeriesChart } from "app/components/charts/bar-series";
import { FilterGroupModel } from "app/components/filters/list/data";
import { TreemapDataItem } from "app/components/charts/treemap/data";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { BarSeriesChartDataItem } from "app/components/charts/bar-series/data";
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
import {
  FullWidthDivider,
  dropdownItemsAllocations,
} from "app/pages/datasets/access-to-funding/data";
import {
  cellBGColorFormatter,
  TABLE_VARIATION_6_COLUMNS as DOCUMENTS_TABLE_COLUMNS,
  TABLE_VARIATION_10_COLUMNS as ELIGIBILITY_TABLE_COLUMNS,
  TABLE_VARIATION_11_COLUMNS as ALLOCATIONS_TABLE_COLUMNS,
  TABLE_VARIATION_12_COLUMNS as FUNDING_REQUESTS_TABLE_COLUMNS,
} from "app/components/table/data";

export const AccessToFundingPage: React.FC = () => {
  useTitle("The Data Explorer - Access to Funding");
  const location = useLocation();

  const [dropdownSelected, setDropdownSelected] = React.useState(
    dropdownItemsAllocations[0].value
  );
  const [chart1AppliedFilters, setChart1AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart1AppliedFiltersData, setChart1AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });
  const [chart2AppliedFilters, setChart2AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart2AppliedFiltersData, setChart2AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });
  const [chart3AppliedFilters, setChart3AppliedFilters] = React.useState<
    string[]
  >([]);
  const [chart3AppliedFiltersData, setChart3AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });

  const dataStats = useStoreState(
    (state) =>
      get(state.AccessToFundingStats, "data.data", []) as {
        name: string;
        value: string;
      }[]
  );
  const loadingStats = useStoreState(
    (state) => state.AccessToFundingStats.loading
  );
  const fetchStats = useStoreActions(
    (actions) => actions.AccessToFundingStats.fetch
  );
  const dataEligibilityTable = useStoreState((state) =>
    get(state.AccessToFundingEligibilityTable, "data.data", []).map(
      (item: any, index) => {
        if (index === 0) {
          return {
            ...item,
            top: true,
            _children: item._children.map((item: any) => ({
              ...item,
              top: true,
            })),
          };
        }
        return item;
      }
    )
  );
  const dataEligibilityTableYears = useStoreState((state) =>
    get(state.AccessToFundingEligibilityTable, "data.years", [])
  );
  const loadingEligibilityTable = useStoreState(
    (state) => state.AccessToFundingEligibilityTable.loading
  );
  const fetchEligibilityTable = useStoreActions(
    (actions) => actions.AccessToFundingEligibilityTable.fetch
  );
  const keysAllocationsBarSeries = useStoreState(
    (state) =>
      get(state.AccessToFundingAllocationBarSeries, "data.keys", []) as string[]
  );
  const dataAllocationsBarSeries = useStoreState(
    (state) =>
      get(
        state.AccessToFundingAllocationBarSeries,
        "data.data",
        []
      ) as BarSeriesChartDataItem[]
  );
  const fetchAllocationsBarSeries = useStoreActions(
    (actions) => actions.AccessToFundingAllocationBarSeries.fetch
  );
  const loadingAllocationsBarSeries = useStoreState(
    (state) => state.AccessToFundingAllocationBarSeries.loading
  );
  const dataAllocationsSunburst = useStoreState((state) =>
    get(state.AccessToFundingAllocationSunburst, "data.data", [])
  );
  const fetchAllocationsSunburst = useStoreActions(
    (actions) => actions.AccessToFundingAllocationSunburst.fetch
  );
  const dataAllocationsTreemap = useStoreState(
    (state) =>
      get(
        state.AccessToFundingAllocationTreemap,
        "data.data",
        []
      ) as TreemapDataItem[]
  );
  const fetchAllocationsTreemap = useStoreActions(
    (actions) => actions.AccessToFundingAllocationTreemap.fetch
  );
  const dataAllocationsTable = useStoreState((state) =>
    get(state.AccessToFundingAllocationTable, "data.data", [])
  );
  const fetchAllocationsTable = useStoreActions(
    (actions) => actions.AccessToFundingAllocationTable.fetch
  );
  const loadingAllocations = useStoreState((state) => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return state.AccessToFundingAllocationSunburst.loading;
      case dropdownItemsAllocations[1].value:
        return state.AccessToFundingAllocationTreemap.loading;
      case dropdownItemsAllocations[2].value:
        return state.AccessToFundingAllocationTable.loading;
      default:
        return false;
    }
  });
  const dataFundingRequestsTable = useStoreState((state) =>
    get(state.AccessToFundingFundingRequestsTable, "data.data", []).map(
      (item: any, index) => {
        if (index === 0) {
          return {
            ...item,
            top: true,
            _children: item._children.map((item: any) => ({
              ...item,
              top: true,
            })),
          };
        }
        return item;
      }
    )
  );
  const loadingFundingRequestsTable = useStoreState(
    (state) => state.AccessToFundingFundingRequestsTable.loading
  );
  const fetchFundingRequestsTable = useStoreActions(
    (actions) => actions.AccessToFundingFundingRequestsTable.fetch
  );
  const dataDocumentsTable = useStoreState((state) =>
    get(state.AccessToFundingDocumentsTable, "data.data", []).map(
      (item: any, index) => {
        if (index === 0) {
          return {
            ...item,
            top: true,
            _children: item._children.map((item: any) => ({
              ...item,
              top: true,
              _children: item._children.map((subitem: any) => ({
                ...subitem,
                top: true,
              })),
            })),
          };
        }
        return item;
      }
    )
  );
  const loadingDocumentsTable = useStoreState(
    (state) => state.AccessToFundingDocumentsTable.loading
  );
  const fetchDocumentsTable = useStoreActions(
    (actions) => actions.AccessToFundingDocumentsTable.fetch
  );
  const dataLocationFilterOptions = useStoreState(
    (state) =>
      get(state.LocationFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataComponentFilterOptions = useStoreState(
    (state) =>
      get(state.ComponentFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataCycleFilterOptions = useStoreState((state) => ({
    id: "cycle",
    name: "Cycle",
    options: get(state.AllocationsCycles, "data.data", []).map(
      (item: { value: string }) => ({
        name: item.value,
        value: item.value,
      })
    ),
  }));
  const pageAppliedFilters = useStoreState((state) => [
    ...state.AppliedFiltersState.components,
    ...state.AppliedFiltersState.locations,
    ...state.AppliedFiltersState.cycles,
  ]);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );
  const eligibilityYears = useStoreState(
    (state) =>
      get(state.EligibilityCycles, "data.data", []).map((item) => ({
        label: item,
        value: item,
      })) as { label: string; value: string }[]
  );

  const [eligibilityYear, setEligibilityYear] = React.useState(
    eligibilityYears[0].value
  );
  const [allocationCycleDropdownSelected, setAllocationCycleDropdownSelected] =
    React.useState<string | null>(null);

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  const handleEligibilityYearChange = (value: string) => {
    setEligibilityYear(value);
  };

  const handleResetFilters = () => {
    appliedFiltersActions.setAll({
      ...appliedFiltersData,
      cycles: [],
      locations: [],
      components: [],
    });
  };

  const handleResetChartFilters = (index: number) => () => {
    switch (index) {
      case 1:
        setChart1AppliedFiltersData({
          ...chart1AppliedFiltersData,
          locations: [],
          components: [],
        });
        setChart1AppliedFilters([]);
        break;
      case 2:
        setChart2AppliedFiltersData({
          ...chart2AppliedFiltersData,
          locations: [],
          components: [],
        });
        setChart2AppliedFilters([]);
        break;
      case 3:
        setChart3AppliedFiltersData({
          ...chart3AppliedFiltersData,
          locations: [],
          components: [],
        });
        setChart3AppliedFilters([]);
        break;
      default:
        break;
    }
  };

  const handleToggleChartFilter =
    (index: number) => (checked: boolean, value: string, type: string) => {
      let state = { ...chart1AppliedFiltersData };
      let action1 = setChart1AppliedFiltersData;
      let action2 = setChart1AppliedFilters;
      if (index === 2) {
        state = { ...chart2AppliedFiltersData };
        action1 = setChart2AppliedFiltersData;
        action2 = setChart2AppliedFilters;
      }
      if (index === 3) {
        state = { ...chart3AppliedFiltersData };
        action1 = setChart3AppliedFiltersData;
        action2 = setChart3AppliedFilters;
      }
      switch (type) {
        case "geography":
        case "geographyType":
        case "geographySubType":
          if (checked) {
            state.locations.push(value);
          } else {
            state.locations = state.locations.filter((item) => item !== value);
          }
          break;
        case "component":
          if (checked) {
            state.components.push(value);
          } else {
            state.components = state.components.filter(
              (item) => item !== value
            );
          }
          break;
        default:
          break;
      }
      action1(state);
      action2([...state.locations, ...state.components]);
    };

  const handleRemoveChartFilter =
    (index: number) => (value: string, types: string[]) => {
      let state = { ...chart1AppliedFiltersData };
      let action1 = setChart1AppliedFiltersData;
      let action2 = setChart1AppliedFilters;
      if (index === 2) {
        state = { ...chart2AppliedFiltersData };
        action1 = setChart2AppliedFiltersData;
        action2 = setChart2AppliedFilters;
      }
      if (index === 3) {
        state = { ...chart3AppliedFiltersData };
        action1 = setChart3AppliedFiltersData;
        action2 = setChart3AppliedFilters;
      }
      types.forEach((type) => {
        switch (type) {
          case "geography":
          case "geographyType":
          case "geographySubType":
            state.locations = state.locations.filter((item) => item !== value);
            break;
          case "component":
            state.components = state.components.filter(
              (item) => item !== value
            );
            break;
          default:
            break;
        }
      });
      action1(state);
      action2([...state.locations, ...state.components]);
    };

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return (
          <SunburstChart
            tooltipLabel="Allocation"
            data={dataAllocationsSunburst}
            centerLabel="Total Allocation"
          />
        );
      case dropdownItemsAllocations[1].value:
        return <Treemap data={dataAllocationsTreemap} />;
      case dropdownItemsAllocations[2].value:
        return (
          <Table
            dataTree
            id="allocations-table"
            data={dataAllocationsTable}
            columns={ALLOCATIONS_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [
    dropdownSelected,
    dataAllocationsSunburst,
    dataAllocationsTreemap,
    dataAllocationsTable,
  ]);

  const chartEmpty = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return dataAllocationsSunburst.length === 0;
      case dropdownItemsAllocations[1].value:
        return dataAllocationsTreemap.length === 0;
      case dropdownItemsAllocations[2].value:
        return dataAllocationsTable.length === 0;
      default:
        return false;
    }
  }, [
    dropdownSelected,
    dataAllocationsSunburst,
    dataAllocationsTreemap,
    dataAllocationsTable,
  ]);

  const filterGroups = React.useMemo(() => {
    return [
      // dataCycleFilterOptions,
      dataLocationFilterOptions,
      dataComponentFilterOptions,
    ];
  }, [
    dataLocationFilterOptions,
    dataComponentFilterOptions,
    // dataCycleFilterOptions,
  ]);

  const filterString = React.useMemo(() => {
    let filterString = "";
    if (
      appliedFiltersData.locations.length > 0 &&
      location.search.includes("locations=")
    ) {
      filterString += `geographies=${encodeURIComponent(
        appliedFiltersData.locations.join(",")
      )}`;
    }
    if (
      appliedFiltersData.components.length > 0 &&
      location.search.includes("components=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }components=${encodeURIComponent(
        appliedFiltersData.components.join(",")
      )}`;
    }
    return filterString;
  }, [appliedFiltersData, location.search]);

  const chart1FilterString = React.useMemo(() => {
    let filterString = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart1AppliedFiltersData.locations.length > 0
    ) {
      filterString += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart1AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart1AppliedFiltersData.components.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart1AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.cycles.length > 0 &&
        location.search.includes("cycles=")) ||
      chart1AppliedFiltersData.cycles.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }cycles=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.cycles,
          ...chart1AppliedFiltersData.cycles,
        ]).join(",")
      )}`;
    }
    return filterString;
  }, [appliedFiltersData, chart1AppliedFiltersData, location.search]);

  const chart2FilterString = React.useMemo(() => {
    let filterString = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart2AppliedFiltersData.locations.length > 0
    ) {
      filterString += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart2AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart2AppliedFiltersData.components.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart2AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (allocationCycleDropdownSelected) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }cycles=${encodeURIComponent(allocationCycleDropdownSelected)}`;
    }
    return filterString;
  }, [
    location.search,
    appliedFiltersData,
    chart2AppliedFiltersData,
    allocationCycleDropdownSelected,
  ]);

  const chart3FilterString = React.useMemo(() => {
    let filterString = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart3AppliedFiltersData.locations.length > 0
    ) {
      filterString += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart3AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart3AppliedFiltersData.components.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart3AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.cycles.length > 0 &&
        location.search.includes("cycles=")) ||
      chart3AppliedFiltersData.cycles.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }periods=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.cycles.map((c) => c.split("-")[0]),
          ...chart3AppliedFiltersData.cycles.map((c) => c.split("-")[0]),
        ]).join(",")
      )}`;
    }
    return filterString;
  }, [appliedFiltersData, chart3AppliedFiltersData, location.search]);

  const range = React.useMemo(() => {
    const values: {
      value: number;
    }[] = [];
    dataAllocationsBarSeries.forEach((item) => {
      item.values.forEach((value) => {
        values.push({ value });
      });
    });
    return getRange(values, ["value"]);
  }, [dataAllocationsBarSeries]);

  const eligibilityTableColumns = React.useMemo(() => {
    return [
      ELIGIBILITY_TABLE_COLUMNS[0],
      ...dataEligibilityTableYears.map((year) => ({
        width: 60,
        title: year,
        field: year,
        headerSort: false,
        formatter: cellBGColorFormatter,
      })),
    ];
  }, [dataEligibilityTable]);

  const allocationCycleDropdown = React.useMemo(() => {
    if (!allocationCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={dataCycleFilterOptions.options.map((item) => ({
          label: item.name,
          value: item.value,
        }))}
        dropdownSelected={allocationCycleDropdownSelected}
        handleDropdownChange={setAllocationCycleDropdownSelected}
      />
    );
  }, [dataCycleFilterOptions, allocationCycleDropdownSelected]);

  React.useEffect(() => {
    if (
      dataCycleFilterOptions.options.length > 0 &&
      !allocationCycleDropdownSelected
    ) {
      setAllocationCycleDropdownSelected(
        dataCycleFilterOptions.options[
          dataCycleFilterOptions.options.length - 1
        ].value
      );
    }
  }, [dataCycleFilterOptions]);

  React.useEffect(() => {
    fetchAllocationsBarSeries({ filterString });
    fetchDocumentsTable({
      filterString: `types=Application${
        filterString.length > 0 ? `&${filterString}` : ""
      }`,
    });
  }, [filterString]);

  React.useEffect(() => {
    fetchStats({
      filterString,
      routeParams: {
        year: eligibilityYear,
      },
    });
  }, [filterString, eligibilityYear]);

  React.useEffect(() => {
    fetchEligibilityTable({ filterString: chart1FilterString });
  }, [chart1FilterString]);

  React.useEffect(() => {
    if (allocationCycleDropdownSelected) {
      fetchAllocationsSunburst({ filterString: chart2FilterString });
      fetchAllocationsTreemap({ filterString: chart2FilterString });
      fetchAllocationsTable({ filterString: chart2FilterString });
    }
  }, [chart2FilterString]);

  React.useEffect(() => {
    fetchFundingRequestsTable({ filterString: chart3FilterString });
  }, [chart3FilterString]);

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
      title="Access to Funding"
      subtitle=""
      filterGroups={filterGroups}
      appliedFilters={pageAppliedFilters}
      handleResetFilters={handleResetFilters}
      breadcrumbs={[{ label: "Datasets" }, { label: "Access to Funding" }]}
    >
      <Box width="100%" marginTop="50px">
        <Box>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              "@media (max-width: 767px)": {
                flexDirection: "column",
                gap: "20px",
              },
            }}
          >
            <Box>
              <Typography variant="h5">
                Eligible Countries by Numbers
              </Typography>
              <Typography variant="body2" fontWeight="700">
                Segmented by Components.
              </Typography>
            </Box>
            <Box
              gap="10px"
              display="flex"
              flexDirection="row"
              alignItems="center"
              sx={{
                "@media (max-width: 767px)": {
                  width: "100%",
                  justifyContent: "flex-end",
                },
              }}
            >
              <Typography fontSize="12px" fontWeight="700">
                Eligibility Year
              </Typography>
              <Dropdown
                width={100}
                dropdownItems={eligibilityYears}
                dropdownSelected={eligibilityYear}
                handleDropdownChange={handleEligibilityYearChange}
              />
            </Box>
          </Box>
          <Grid
            container
            spacing={2}
            position="relative"
            margin="4px 0 50px 0"
            sx={{
              marginLeft: "-16px",
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
            {dataStats.map((item) => (
              <Grid item key={item.name} xs={12} sm={6} md={3}>
                <Box padding="15px" bgcolor="#F1F3F5">
                  <Typography variant="h5">{item.value}</Typography>
                  <Typography fontSize="12px">
                    Countries Eligible for {item.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
            "@media (max-width: 767px)": {
              padding: "20px 0",
            },
          }}
        >
          <DatasetChartBlock
            id="eligibility"
            title="Eligibility"
            subtitle="Country eligibility for funding over time."
            dropdownItems={[]}
            disableCollapse
            loading={loadingEligibilityTable}
            empty={dataEligibilityTable.length === 0}
            filterGroups={filterGroups}
            appliedFilters={chart1AppliedFilters}
            toggleFilter={handleToggleChartFilter(1)}
            removeFilter={handleRemoveChartFilter(1)}
            handleResetFilters={handleResetChartFilters(1)}
            appliedFiltersData={chart1AppliedFiltersData}
            infoType="global"
          >
            <Box
              gap="20px"
              width="100%"
              display="flex"
              marginBottom="20px"
              flexDirection="row"
              justifyContent="flex-end"
              sx={{
                "> div": {
                  display: "flex",
                  flexDirection: "column",
                  "> div": {
                    gap: "10px",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    "> div": {
                      gap: "5px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      "#rectangle": {
                        width: "11px",
                        height: "11px",
                        borderRadius: "2px",
                      },
                    },
                  },
                },
                "@media (max-width: 767px)": {
                  gap: "16px",
                  flexDirection: "column",
                },
              }}
            >
              <Box>
                <Typography fontSize="12px" fontWeight="700">
                  Disease Burden
                </Typography>
                <Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[0]}
                    />
                    <Typography fontSize="12px">Extreme</Typography>
                  </Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[1]}
                    />
                    <Typography fontSize="12px">Severe</Typography>
                  </Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[2]}
                    />
                    <Typography fontSize="12px">High</Typography>
                  </Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[3]}
                    />
                    <Typography fontSize="12px">Moderate</Typography>
                  </Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[4]}
                    />
                    <Typography fontSize="12px">Not High</Typography>
                  </Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor={appColors.ELIGIBILITY.DISEASE_BURDEN_COLORS[5]}
                    />
                    <Typography fontSize="12px">Low</Typography>
                  </Box>
                  <Box>
                    <Box
                      id="rectangle"
                      bgcolor="#FFFFFF"
                      border="1px solid #ccc"
                    />
                    <Typography fontSize="12px">NA</Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography fontSize="12px" fontWeight="700">
                  Eligibility Status
                </Typography>
                <Box>
                  <Box>
                    <Box id="rectangle" bgcolor="#013E77" />
                    <Typography fontSize="12px">Eligible</Typography>
                  </Box>
                  <Box>
                    <Box id="rectangle" bgcolor="#00B5AE" />
                    <Typography fontSize="12px">Transition Funding</Typography>
                  </Box>
                  <Box>
                    <Box id="rectangle" bgcolor="#D9D9D9" />
                    <Typography fontSize="12px">Not Eligible</Typography>
                  </Box>
                </Box>
              </Box>
              <Tooltip title="">
                <Info
                  fontSize="small"
                  sx={{
                    "@media (max-width: 920px)": {
                      display: "none",
                    },
                  }}
                />
              </Tooltip>
            </Box>
            <TableContainer
              dataTree
              id="eligibility-table"
              data={dataEligibilityTable}
              columns={eligibilityTableColumns}
              dataTreeStartExpandedFn={(row) => row.getData().top}
            />
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
            "@media (max-width: 767px)": {
              padding: "20px 0",
            },
          }}
        >
          <DatasetChartBlock
            id="allocation"
            title="Allocation"
            subtitle="Allocations amounts for countries."
            dropdownItems={dropdownItemsAllocations}
            dropdownSelected={dropdownSelected}
            handleDropdownChange={handleSelectionChange}
            loading={loadingAllocations}
            empty={chartEmpty}
            disableCollapse={
              dropdownSelected === dropdownItemsAllocations[2].value
            }
            filterGroups={filterGroups}
            appliedFilters={chart2AppliedFilters}
            toggleFilter={handleToggleChartFilter(2)}
            removeFilter={handleRemoveChartFilter(2)}
            handleResetFilters={handleResetChartFilters(2)}
            appliedFiltersData={chart2AppliedFiltersData}
            extraDropdown={allocationCycleDropdown}
            infoType="global"
          >
            {chartContent}
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "@media (max-width: 767px)": {
              padding: "20px 0",
            },
          }}
        >
          <Typography variant="h5">Cumulative Allocation by Cycles</Typography>
          <Typography fontSize="14px" fontWeight="700">
            Accompanied by the Component Breakdown.
          </Typography>
          <Box marginTop="25px" position="relative">
            {!loadingAllocationsBarSeries ? (
              <React.Fragment>
                <Typography
                  left="10px"
                  bottom="40px"
                  fontSize="10px"
                  fontWeight="700"
                  position="absolute"
                  sx={{
                    transformOrigin: "left",
                    transform: "rotate(-90deg)",
                  }}
                >
                  Allocated Amount (USD {range.abbr})
                </Typography>
                <BarSeriesChart
                  data={dataAllocationsBarSeries}
                  keys={keysAllocationsBarSeries}
                />
                <Info
                  htmlColor="#373D43"
                  sx={{
                    top: "4px",
                    width: "14px",
                    height: "14px",
                    right: "-25px",
                    position: "absolute",
                  }}
                />
              </React.Fragment>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  height: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
            "@media (max-width: 767px)": {
              padding: "20px 0",
            },
          }}
        >
          <DatasetChartBlock
            id="funding-requests"
            title="Funding Requests"
            subtitle="Funding request applications by countries."
            disableCollapse
            dropdownItems={[]}
            loading={loadingFundingRequestsTable}
            empty={dataFundingRequestsTable.length === 0}
            filterGroups={filterGroups}
            appliedFilters={chart3AppliedFilters}
            toggleFilter={handleToggleChartFilter(3)}
            removeFilter={handleRemoveChartFilter(3)}
            handleResetFilters={handleResetChartFilters(3)}
            appliedFiltersData={chart3AppliedFiltersData}
            infoType="global"
          >
            <TableContainer
              dataTree
              id="funding-requests-table"
              data={dataFundingRequestsTable}
              columns={FUNDING_REQUESTS_TABLE_COLUMNS}
              dataTreeStartExpandedFn={(row) => row.getData().top}
            />
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          id="documents"
          padding="50px 0"
          sx={{
            "@media (max-width: 767px)": {
              padding: "20px 0",
            },
          }}
        >
          <Typography variant="h3" lineHeight={1.2}>
            Documents
          </Typography>
          <Divider
            sx={{
              margin: "20px 0",
              "@media (max-width: 767px)": {
                display: "none",
              },
            }}
          />
          {loadingDocumentsTable && (
            <Box
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          )}
          {!loadingDocumentsTable && dataDocumentsTable.length > 0 ? (
            <React.Fragment>
              <Box
                height="40px"
                sx={{
                  "@media (max-width: 767px)": {
                    display: "none",
                  },
                }}
              />
              <TableContainer
                dataTree
                id="documents-table"
                data={dataDocumentsTable}
                columns={DOCUMENTS_TABLE_COLUMNS}
                dataTreeStartExpandedFn={(row) => row.getData().top}
              />
            </React.Fragment>
          ) : (
            <Box
              width="100%"
              height="100%"
              minHeight="250px"
              alignItems="center"
              justifyContent="center"
              display={!loadingDocumentsTable ? "flex" : "none"}
            >
              <Typography>No data available</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </DatasetPage>
  );
};
