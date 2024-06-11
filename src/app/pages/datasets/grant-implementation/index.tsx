import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { BarChart } from "app/components/charts/bar";
import { LineChart } from "app/components/charts/line";
import { Treemap } from "app/components/charts/treemap";
import { Heatmap } from "app/components/charts/heatmap";
import { SankeyChart } from "app/components/charts/sankey";
import { DatasetPage } from "app/pages/datasets/common/page";
import CircularProgress from "@mui/material/CircularProgress";
import { BarChartDataItem } from "app/components/charts/bar/data";
import { LineChartDataItem } from "app/components/charts/line/data";
import { FilterGroupModel } from "app/components/filters/list/data";
import { TreemapDataItem } from "app/components/charts/treemap/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { FinancialMetric } from "app/components/charts/financial-metric";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { ExpandableHorizontalBarChartDataItem } from "app/components/charts/expandable-horizontal-bar/data";
import {
  HeatmapDataItem,
  getPercentageColor,
} from "app/components/charts/heatmap/data";
import {
  STORY_DATA_VARIANT_1 as FINANCIAL_METRICS_DATA_1,
  STORY_DATA_VARIANT_2 as FINANCIAL_METRICS_DATA_2,
  STORY_DATA_VARIANT_3 as FINANCIAL_METRICS_DATA_3,
  FinancialMetricExpandableItemProps,
} from "app/components/charts/financial-metric/data";
import {
  TABLE_VARIATION_14_COLUMNS as BUDGET_TABLE_COLUMNS,
  TABLE_VARIATION_15_COLUMNS as EXPENDITURES_TABLE_COLUMNS,
  TABLE_VARIATION_13_COLUMNS as DISBURSEMENTS_TABLE_COLUMNS,
} from "app/components/table/data";
import {
  FullWidthDivider,
  dropdownItemsBudgets,
  geographyGroupingOptions,
  componentsGroupingOptions,
  dropdownItemsDisbursements,
  dropdownItemsExpenditures,
} from "app/pages/datasets/grant-implementation/data";
import Grid from "@mui/material/Grid";

export const GrantImplementationPage: React.FC = () => {
  const [geographyGrouping, setGeographyGrouping] = React.useState(
    geographyGroupingOptions[0].value
  );
  const [componentsGrouping, setComponentsGrouping] = React.useState(
    componentsGroupingOptions[0].value
  );
  const [disbursementsDropdownSelected, setDisbursementsDropdownSelected] =
    React.useState(dropdownItemsDisbursements[0].value);
  const [budgetsDropdownSelected, setBudgetsDropdownSelected] = React.useState(
    dropdownItemsBudgets[0].value
  );
  const [expendituresDropdownSelected, setExpendituresDropdownSelected] =
    React.useState(dropdownItemsExpenditures[0].value);

  const dataFinancialInsightsStats = useStoreState((state) =>
    get(state.FinancialInsightsStats, "data.data[0]", {
      signed: 0,
      committed: 0,
      disbursed: 0,
    })
  );
  const loadingStats = useStoreState(
    (state) => state.FinancialInsightsStats.loading
  );
  const fetchFinancialInsightsStats = useStoreActions(
    (actions) => actions.FinancialInsightsStats.fetch
  );
  const dataFinancialInsightsDisbursementsBarChart = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsDisbursementsBarChart,
        "data.data",
        []
      ) as BarChartDataItem[]
  );
  const fetchFinancialInsightsDisbursementsBarChart = useStoreActions(
    (actions) => actions.FinancialInsightsDisbursementsBarChart.fetch
  );
  const dataFinancialInsightsDisbursementsLineChart = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsDisbursementsLineChart,
        "data.data",
        []
      ) as LineChartDataItem[]
  );
  const keysFinancialInsightsDisbursementsLineChart = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsDisbursementsLineChart,
        "data.keys",
        []
      ) as string[]
  );
  const fetchFinancialInsightsDisbursementsLineChart = useStoreActions(
    (actions) => actions.FinancialInsightsDisbursementsLineChart.fetch
  );
  const dataFinancialInsightsDisbursementsTable = useStoreState(
    (state) =>
      get(state.FinancialInsightsDisbursementsTable, "data.data", []) as {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | object
          | Array<object>;
      }[]
  );
  const fetchFinancialInsightsDisbursementsTable = useStoreActions(
    (actions) => actions.FinancialInsightsDisbursementsTable.fetch
  );
  const loadingFinancialInsightsDisbursements = useStoreState((state) => {
    switch (disbursementsDropdownSelected) {
      case dropdownItemsDisbursements[0].value:
        return state.FinancialInsightsDisbursementsBarChart.loading;
      case dropdownItemsDisbursements[1].value:
        return state.FinancialInsightsDisbursementsLineChart.loading;
      case dropdownItemsDisbursements[2].value:
        return state.FinancialInsightsDisbursementsTable.loading;
      default:
        return false;
    }
  });
  const dataBudgetBreakdown = useStoreState(
    (state) =>
      get(state.FinancialInsightsBudgetBreakdown, "data.data", []) as {
        name: string;
        value: number;
        color: string;
      }[]
  );
  const fetchBudgetBreakdown = useStoreActions(
    (actions) => actions.FinancialInsightsBudgetBreakdown.fetch
  );
  const dataBudgetUtilisation = useStoreState(
    (state) =>
      get(state.FinancialInsightsBudgetUtilisation, "data.data[0]", {
        value: 0,
        items: [],
      }) as {
        value: number;
        items: FinancialMetricExpandableItemProps[];
      }
  );
  const fetchBudgetUtilisation = useStoreActions(
    (actions) => actions.FinancialInsightsBudgetUtilisation.fetch
  );
  const dataInCountryAbsorption = useStoreState(
    (state) =>
      get(state.FinancialInsightsCountryAbsorption, "data.data[0]", {
        value: 0,
        items: [],
      }) as {
        value: number;
        items: FinancialMetricExpandableItemProps[];
      }
  );
  const fetchInCountryAbsorption = useStoreActions(
    (actions) => actions.FinancialInsightsCountryAbsorption.fetch
  );
  const dataDisbursementUtilisation = useStoreState(
    (state) =>
      get(state.FinancialInsightsDisbursementUtilisation, "data.data[0]", {
        value: 0,
        items: [],
      }) as {
        value: number;
        items: FinancialMetricExpandableItemProps[];
      }
  );
  const fetchDisbursementUtilisation = useStoreActions(
    (actions) => actions.FinancialInsightsDisbursementUtilisation.fetch
  );
  const loadingFinancialMetrics = useStoreState((state) => {
    return (
      state.FinancialInsightsBudgetUtilisation.loading ||
      state.FinancialInsightsCountryAbsorption.loading ||
      state.FinancialInsightsDisbursementUtilisation.loading
    );
  });
  const dataBudgetSankey = useStoreState((state) => {
    const nodes = get(
      state.FinancialInsightsBudgetSankey,
      "data.data.nodes",
      []
    );
    const links = get(
      state.FinancialInsightsBudgetSankey,
      "data.data.links",
      []
    );
    return {
      nodes,
      links,
    };
  });
  const fetchBudgetSankey = useStoreActions(
    (actions) => actions.FinancialInsightsBudgetSankey.fetch
  );
  const dataBudgetTreemap = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsBudgetTreemap,
        "data.data",
        []
      ) as TreemapDataItem[]
  );
  const fetchBudgetTreemap = useStoreActions(
    (actions) => actions.FinancialInsightsBudgetTreemap.fetch
  );
  const dataBudgetTable = useStoreState(
    (state) =>
      get(state.FinancialInsightsBudgetTable, "data.data", []) as {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | object
          | Array<object>;
      }[]
  );
  const fetchBudgetTable = useStoreActions(
    (actions) => actions.FinancialInsightsBudgetTable.fetch
  );
  const loadingBudget = useStoreState((state) => {
    switch (budgetsDropdownSelected) {
      case dropdownItemsBudgets[0].value:
        return state.FinancialInsightsBudgetSankey.loading;
      case dropdownItemsBudgets[1].value:
        return state.FinancialInsightsBudgetTreemap.loading;
      case dropdownItemsBudgets[2].value:
        return state.FinancialInsightsBudgetTable.loading;
      default:
        return false;
    }
  });
  const dataExpendituresHeatmap = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsExpendituresHeatmap,
        "data.data",
        []
      ) as HeatmapDataItem[]
  );
  const fetchExpendituresHeatmap = useStoreActions(
    (actions) => actions.FinancialInsightsExpendituresHeatmap.fetch
  );
  const loadingExpenditures = useStoreState((state) => {
    switch (expendituresDropdownSelected) {
      case dropdownItemsExpenditures[0].value:
        return state.FinancialInsightsExpendituresHeatmap.loading;
      case dropdownItemsExpenditures[1].value:
        return state.FinancialInsightsExpendituresBarChart.loading;
      case dropdownItemsExpenditures[2].value:
        return state.FinancialInsightsExpendituresTable.loading;
      default:
        return false;
    }
  });
  const dataExpendituresBarChart = useStoreState(
    (state) =>
      get(
        state.FinancialInsightsExpendituresBarChart,
        "data.data",
        []
      ) as ExpandableHorizontalBarChartDataItem[]
  );
  const fetchExpendituresBarChart = useStoreActions(
    (actions) => actions.FinancialInsightsExpendituresBarChart.fetch
  );
  const dataExpendituresTable = useStoreState(
    (state) =>
      get(state.FinancialInsightsExpendituresTable, "data.data", []) as {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | object
          | Array<object>;
      }[]
  );
  const fetchExpendituresTable = useStoreActions(
    (actions) => actions.FinancialInsightsExpendituresTable.fetch
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
  const dataPartnerTypeFilterOptions = useStoreState(
    (state) =>
      get(state.PartnerTypeFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const dataStatusFilterOptions = useStoreState(
    (state) =>
      get(state.StatusFilterOptions, "data.data", {
        id: "",
        name: "",
        options: [],
      }) as FilterGroupModel
  );
  const cycles = useStoreState((state) =>
    get(state.BudgetsCycles, "data.data", []).map((cycle: any) => ({
      label: cycle.value,
      value: cycle.value,
    }))
  );
  const pageAppliedFilters = useStoreState((state) => [
    ...state.AppliedFiltersState.components,
    ...state.AppliedFiltersState.locations,
    ...state.AppliedFiltersState.principalRecipientTypes,
    ...state.AppliedFiltersState.principalRecipients,
    ...state.AppliedFiltersState.status,
  ]);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const [budgetBreakdownDropdownSelected, setBudgetBreakdownDropdownSelected] =
    React.useState(cycles[0].value);

  const handleDisbursementsSelectionChange = (value: string) => {
    setDisbursementsDropdownSelected(value);
  };

  const handleBudgetBreakdownSelectionChange = (value: string) => {
    setBudgetBreakdownDropdownSelected(value);
  };

  const handleGeographyGroupingChange = (value: string) => {
    setGeographyGrouping(value);
  };

  const handleComponentsGroupingChange = (value: string) => {
    setComponentsGrouping(value);
  };

  const handleResetFilters = () => {
    appliedFiltersActions.setAll({
      ...appliedFiltersData,
      components: [],
      locations: [],
      principalRecipients: [],
      principalRecipientTypes: [],
      status: [],
    });
  };

  const disbursementsChartContent = React.useMemo(() => {
    let range;
    let maxValue = 0;
    switch (disbursementsDropdownSelected) {
      case dropdownItemsDisbursements[0].value:
        range = getRange(dataFinancialInsightsDisbursementsBarChart, ["value"]);
        maxValue =
          maxBy(dataFinancialInsightsDisbursementsBarChart, "value")?.value ||
          0;
        return (
          <Box position="relative">
            <Typography
              left="-5px"
              bottom="20px"
              fontSize="10px"
              padding="7px 12px"
              borderRadius="4px"
              position="absolute"
              border="1px solid #DFE3E5"
              sx={{
                transformOrigin: "left",
                transform: "rotate(-90deg)",
              }}
            >
              Y Axis/<b>Disbursed Amount (US$ {range.abbr})</b>
            </Typography>
            <BarChart
              data={dataFinancialInsightsDisbursementsBarChart}
              valueLabels={{
                value: "disbursement",
              }}
              itemStyle={{
                color: (params: any) => {
                  if (maxValue === params.data)
                    return appColors.TIME_CYCLE.BAR_COLOR_3;
                  return appColors.TIME_CYCLE.BAR_COLOR_2;
                },
              }}
            />
            <Typography
              left="40px"
              bottom="-20px"
              fontSize="10px"
              padding="7px 12px"
              borderRadius="4px"
              position="absolute"
              border="1px solid #DFE3E5"
            >
              X Axis/<b>Components</b>
            </Typography>
          </Box>
        );
      case dropdownItemsDisbursements[1].value:
        const values: { value: number }[] = [];
        dataFinancialInsightsDisbursementsLineChart.forEach((item) => {
          item.data.forEach((value) => {
            values.push({ value });
          });
        });
        range = getRange(values, ["value"]);
        maxValue = maxBy(values, "value")?.value || 0;
        return (
          <Box position="relative">
            <Typography
              left="-5px"
              bottom="20px"
              fontSize="10px"
              padding="7px 12px"
              borderRadius="4px"
              position="absolute"
              border="1px solid #DFE3E5"
              sx={{
                transformOrigin: "left",
                transform: "rotate(-90deg)",
              }}
            >
              Y Axis/<b>Disbursed Amount (US$ {range.abbr})</b>
            </Typography>
            <LineChart
              data={dataFinancialInsightsDisbursementsLineChart}
              xAxisKeys={keysFinancialInsightsDisbursementsLineChart}
            />
            <Typography
              left="40px"
              bottom="-20px"
              fontSize="10px"
              padding="7px 12px"
              borderRadius="4px"
              position="absolute"
              border="1px solid #DFE3E5"
            >
              X Axis/<b>Years</b>
            </Typography>
          </Box>
        );
      case dropdownItemsDisbursements[2].value:
        return (
          <Table
            dataTree
            id="disbursements-table"
            columns={DISBURSEMENTS_TABLE_COLUMNS}
            data={dataFinancialInsightsDisbursementsTable}
          />
        );
      default:
        return null;
    }
  }, [
    disbursementsDropdownSelected,
    dataFinancialInsightsDisbursementsBarChart,
    dataFinancialInsightsDisbursementsLineChart,
    keysFinancialInsightsDisbursementsLineChart,
    dataFinancialInsightsDisbursementsTable,
  ]);

  const disbursementsChartEmpty = React.useMemo(() => {
    switch (disbursementsDropdownSelected) {
      case dropdownItemsDisbursements[0].value:
        return !dataFinancialInsightsDisbursementsBarChart.length;
      case dropdownItemsDisbursements[1].value:
        return !dataFinancialInsightsDisbursementsLineChart.length;
      case dropdownItemsDisbursements[2].value:
        return !dataFinancialInsightsDisbursementsTable.length;
      default:
        return false;
    }
  }, [
    disbursementsDropdownSelected,
    dataFinancialInsightsDisbursementsBarChart,
    dataFinancialInsightsDisbursementsLineChart,
    dataFinancialInsightsDisbursementsTable,
  ]);

  const financialMetricsContent = React.useMemo(() => {
    return (
      <Box gap="40px" width="100%" display="flex" flexDirection="column">
        <FinancialMetric
          {...FINANCIAL_METRICS_DATA_1}
          donutChart={{
            ...FINANCIAL_METRICS_DATA_1.donutChart,
            value: dataBudgetUtilisation.value,
          }}
          items={dataBudgetUtilisation.items}
        />
        <FinancialMetric
          {...FINANCIAL_METRICS_DATA_2}
          donutChart={{
            ...FINANCIAL_METRICS_DATA_2.donutChart,
            value: dataInCountryAbsorption.value,
          }}
          items={dataInCountryAbsorption.items}
        />
        <FinancialMetric
          {...FINANCIAL_METRICS_DATA_3}
          donutChart={{
            ...FINANCIAL_METRICS_DATA_3.donutChart,
            value: dataDisbursementUtilisation.value,
          }}
          items={dataDisbursementUtilisation.items}
        />
      </Box>
    );
  }, [
    dataBudgetUtilisation,
    dataInCountryAbsorption,
    dataDisbursementUtilisation,
  ]);

  const financialMetricsEmpty = React.useMemo(() => {
    return (
      !dataBudgetUtilisation.items.length ||
      !dataInCountryAbsorption.items.length ||
      !dataDisbursementUtilisation.items.length
    );
  }, [
    dataBudgetUtilisation,
    dataInCountryAbsorption,
    dataDisbursementUtilisation,
  ]);

  const budgetsChartContent = React.useMemo(() => {
    switch (budgetsDropdownSelected) {
      case dropdownItemsBudgets[0].value:
        return (
          <React.Fragment>
            <Grid
              container
              spacing={4}
              sx={{
                color: "#464646",
                fontSize: "10px",
                fontWeight: "700",
              }}
            >
              <Grid item xs={3}>
                Total budget
              </Grid>
              <Grid item xs={3}>
                Investement Landscape 1
              </Grid>
              <Grid item xs={3}>
                Investement Landscape 2
              </Grid>
              <Grid item xs={3}>
                Cost Category
              </Grid>
            </Grid>
            <SankeyChart data={dataBudgetSankey} />
          </React.Fragment>
        );
      case dropdownItemsBudgets[1].value:
        return <Treemap data={dataBudgetTreemap} />;
      case dropdownItemsBudgets[2].value:
        return (
          <Table
            dataTree
            id="budgets-table"
            data={dataBudgetTable}
            columns={BUDGET_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [
    budgetsDropdownSelected,
    dataBudgetSankey,
    dataBudgetTreemap,
    dataBudgetTable,
  ]);

  const budgetsChartEmpty = React.useMemo(() => {
    switch (budgetsDropdownSelected) {
      case dropdownItemsBudgets[0].value:
        return !dataBudgetSankey.nodes.length;
      case dropdownItemsBudgets[1].value:
        return !dataBudgetTreemap.length;
      case dropdownItemsBudgets[2].value:
        return !dataBudgetTable.length;
      default:
        return false;
    }
  }, [
    budgetsDropdownSelected,
    dataBudgetSankey,
    dataBudgetTreemap,
    dataBudgetTable,
  ]);

  const expendituresChartContent = React.useMemo(() => {
    switch (expendituresDropdownSelected) {
      case dropdownItemsExpenditures[0].value:
        return (
          <Heatmap
            valueType="amount"
            contentProp="value"
            hoveredLegend={null}
            columnCategory="cycle"
            rowCategory="component"
            data={dataExpendituresHeatmap}
            getItemColor={getPercentageColor}
            columnHeader="Principal Recipients"
            rowHeader="Components"
          />
        );
      case dropdownItemsExpenditures[1].value:
        return (
          <ExpandableHorizontalBar
            data={dataExpendituresBarChart}
            yAxisLabel="Investment Landscapes & Analytical Group Name"
            xAxisLabel="Cumulative Expenditure"
            valueLabels={{
              value: "amount",
            }}
            itemStyle={{
              color: () => appColors.TIME_CYCLE.BAR_COLOR_1,
            }}
          />
        );
      case dropdownItemsExpenditures[2].value:
        return (
          <Table
            dataTree
            id="expenditures-table"
            data={dataExpendituresTable}
            columns={EXPENDITURES_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [
    expendituresDropdownSelected,
    dataExpendituresHeatmap,
    dataExpendituresBarChart,
    dataExpendituresTable,
  ]);

  const expendituresChartEmpty = React.useMemo(() => {
    switch (expendituresDropdownSelected) {
      case dropdownItemsExpenditures[0].value:
        return !dataExpendituresHeatmap.length;
      case dropdownItemsExpenditures[1].value:
        return !dataExpendituresBarChart.length;
      case dropdownItemsExpenditures[2].value:
        return !dataExpendituresTable.length;
      default:
        return false;
    }
  }, [
    expendituresDropdownSelected,
    dataExpendituresHeatmap,
    dataExpendituresBarChart,
    dataExpendituresTable,
  ]);

  const toolbarRightContent = React.useMemo(() => {
    return (
      <Box gap="20px" display="flex" flexDirection="row" alignItems="center">
        <Box gap="10px" display="flex" flexDirection="row" alignItems="center">
          <Typography variant="body2" fontWeight="700">
            Geography grouping
          </Typography>
          <Dropdown
            width={150}
            dropdownSelected={geographyGrouping}
            dropdownItems={geographyGroupingOptions}
            handleDropdownChange={handleGeographyGroupingChange}
          />
        </Box>
        <Box gap="10px" display="flex" flexDirection="row" alignItems="center">
          <Typography variant="body2" fontWeight="700">
            Components grouping
          </Typography>
          <Dropdown
            width={120}
            dropdownSelected={componentsGrouping}
            dropdownItems={componentsGroupingOptions}
            handleDropdownChange={handleComponentsGroupingChange}
          />
        </Box>
      </Box>
    );
  }, [componentsGrouping, geographyGrouping]);

  const totalBudget = React.useMemo(() => {
    return formatFinancialValue(sumBy(dataBudgetTreemap, "value"));
  }, [dataBudgetTreemap]);

  const totalExpenditure = React.useMemo(() => {
    return formatFinancialValue(sumBy(dataExpendituresHeatmap, "value"));
  }, [dataExpendituresHeatmap]);

  const filterGroups = React.useMemo(() => {
    return [
      dataLocationFilterOptions,
      dataComponentFilterOptions,
      dataPartnerTypeFilterOptions,
      dataStatusFilterOptions,
    ];
  }, [
    dataLocationFilterOptions,
    dataComponentFilterOptions,
    dataPartnerTypeFilterOptions,
    dataStatusFilterOptions,
  ]);

  const filterString = React.useMemo(() => {
    let filterString = "";
    if (appliedFiltersData.locations.length > 0) {
      filterString += `geographies=${encodeURIComponent(appliedFiltersData.locations.join(","))}`;
    }
    if (appliedFiltersData.components.length > 0) {
      filterString += `${filterString.length > 0 ? "&" : ""}components=${encodeURIComponent(appliedFiltersData.components.join(","))}`;
    }
    if (appliedFiltersData.principalRecipientTypes.length > 0) {
      filterString += `${filterString.length > 0 ? "&" : ""}principalRecipientTypes=${encodeURIComponent(appliedFiltersData.principalRecipientTypes.join(","))}`;
    }
    if (appliedFiltersData.principalRecipients.length > 0) {
      filterString += `${filterString.length > 0 ? "&" : ""}principalRecipients=${encodeURIComponent(appliedFiltersData.principalRecipients.join(","))}`;
    }
    if (appliedFiltersData.status.length > 0) {
      filterString += `${filterString.length > 0 ? "&" : ""}status=${encodeURIComponent(appliedFiltersData.status.join(","))}`;
    }
    return filterString;
  }, [appliedFiltersData]);

  React.useEffect(() => {
    fetchFinancialInsightsStats({ filterString });
    fetchBudgetSankey({ filterString });
    fetchBudgetTable({ filterString });
    fetchBudgetUtilisation({ filterString });
    fetchInCountryAbsorption({ filterString });
    fetchDisbursementUtilisation({ filterString });
  }, [filterString]);

  React.useEffect(() => {
    fetchFinancialInsightsDisbursementsBarChart({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
    fetchFinancialInsightsDisbursementsLineChart({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
    fetchFinancialInsightsDisbursementsTable({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
    fetchBudgetTreemap({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
    fetchExpendituresHeatmap({
      filterString,
      routeParams: {
        row: "principalRecipientType,principalRecipient",
        column: "component",
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
    fetchExpendituresBarChart({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
    fetchExpendituresTable({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  }, [filterString, componentsGrouping]);

  React.useEffect(() => {
    fetchBudgetBreakdown({
      filterString,
      routeParams: {
        year: budgetBreakdownDropdownSelected.replace(/ /g, ""),
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
      },
    });
  }, [budgetBreakdownDropdownSelected, filterString, componentsGrouping]);

  return (
    <DatasetPage
      title="Financial Insights"
      filterGroups={filterGroups}
      appliedFilters={pageAppliedFilters}
      handleResetFilters={handleResetFilters}
      subtitle="See the disbursements, budgets and expenditures datasets and relating insights."
      breadcrumbs={[{ label: "Datasets" }, { label: "Financial Insights" }]}
      toolbarRightContent={toolbarRightContent}
    >
      <Box width="100%" marginTop="50px">
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          marginBottom="50px"
          position="relative"
          sx={{
            "> div": {
              width: "calc(100% / 3)",
              padding: "0 20px",
              "&:not(:last-child)": {
                borderRight: "1px solid #DFE3E5",
              },
              "&:first-of-type": {
                paddingLeft: 0,
              },
            },
          }}
        >
          {loadingStats && (
            <Box
              height="100%"
              display="flex"
              position="absolute"
              alignItems="center"
              justifyContent="center"
              bgcolor="rgba(255, 255, 255, 0.8)"
              sx={{
                width: "100% !important",
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Box>
            <Typography variant="h5">
              {formatFinancialValue(dataFinancialInsightsStats.signed)}
            </Typography>
            <Typography fontSize="14px" fontWeight="700">
              Total Signed Amount
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              {formatFinancialValue(dataFinancialInsightsStats.committed)}
            </Typography>
            <Typography fontSize="14px" fontWeight="700">
              Total Committed Amount
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              {formatFinancialValue(dataFinancialInsightsStats.disbursed)}
            </Typography>
            <Typography fontSize="14px" fontWeight="700">
              Total Disbursed Amount
            </Typography>
          </Box>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
          }}
        >
          <DatasetChartBlock
            title="Disbursements"
            subtitle="Disbursement transactions for all grants across the porfolio."
            dropdownItems={dropdownItemsDisbursements}
            dropdownSelected={disbursementsDropdownSelected}
            handleDropdownChange={handleDisbursementsSelectionChange}
            loading={loadingFinancialInsightsDisbursements}
            disableCollapse={
              disbursementsDropdownSelected ===
              dropdownItemsDisbursements[2].value
            }
            empty={disbursementsChartEmpty}
          >
            {disbursementsChartContent}
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          gap="20px"
          width="100%"
          display="flex"
          padding="50px 0"
          position="relative"
          flexDirection="column"
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
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5">Budget Breakdown</Typography>
              <Typography fontSize="14px" fontWeight="700">
                By grant component
              </Typography>
            </Box>
            <Box>
              <Dropdown
                dropdownItems={cycles}
                dropdownSelected={budgetBreakdownDropdownSelected}
                handleDropdownChange={handleBudgetBreakdownSelectionChange}
              />
            </Box>
          </Box>
          <Box
            width="100%"
            height="45px"
            display="flex"
            marginTop="40px"
            flexDirection="row"
          >
            {dataBudgetBreakdown.map((i) => (
              <Box
                key={i.name}
                display="flex"
                bgcolor={i.color}
                width={`${i.value}%`}
                flexDirection="column"
                alignItems="center"
                position="relative"
              >
                <Box
                  top="-25px"
                  fontSize="12px"
                  fontWeight="400"
                  position="absolute"
                >
                  {i.name} ({i.value.toFixed(2).replace(".00", "")}%)
                </Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    marginTop: "-5px",
                    borderColor: i.color,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
          }}
        >
          <DatasetChartBlock
            title="Financial Metrics"
            subtitle=""
            dropdownItems={[]}
            empty={financialMetricsEmpty}
            loading={loadingFinancialMetrics}
          >
            {financialMetricsContent}
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
          }}
        >
          <DatasetChartBlock
            title="Budgets"
            subtitle={`${totalBudget} total budget.`}
            dropdownItems={dropdownItemsBudgets}
            dropdownSelected={budgetsDropdownSelected}
            handleDropdownChange={(value) => setBudgetsDropdownSelected(value)}
            loading={loadingBudget}
            disableCollapse={
              budgetsDropdownSelected === dropdownItemsBudgets[2].value
            }
            empty={budgetsChartEmpty}
          >
            {budgetsChartContent}
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          padding="50px 0"
          sx={{
            "#content": {
              padding: 0,
            },
          }}
        >
          <DatasetChartBlock
            title="Expenditures"
            subtitle={`${totalExpenditure} reported expenditure.`}
            dropdownItems={dropdownItemsExpenditures}
            dropdownSelected={expendituresDropdownSelected}
            loading={loadingExpenditures}
            handleDropdownChange={(value) =>
              setExpendituresDropdownSelected(value)
            }
            disableCollapse={
              expendituresDropdownSelected ===
              dropdownItemsExpenditures[2].value
            }
            empty={expendituresChartEmpty}
          >
            {expendituresChartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
