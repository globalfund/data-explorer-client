import React from "react";
import get from "lodash/get";
import uniq from "lodash/uniq";
import maxBy from "lodash/maxBy";
import sumBy from "lodash/sumBy";
import filter from "lodash/filter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { appColors } from "app/theme";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import { useLocation } from "react-router-dom";
import { useTitle, useUnmount } from "react-use";
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
import { defaultAppliedFilters } from "app/state/api/action-reducers/sync/filters";
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
  dropdownItemsBudgetsTableDataTypes,
} from "app/pages/datasets/grant-implementation/data";

export const GrantImplementationPage: React.FC = () => {
  useTitle("The Data Explorer - Financial Insights");
  const location = useLocation();

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
  const [chart4AppliedFiltersData, setChart4AppliedFiltersData] =
    React.useState({
      ...defaultAppliedFilters,
    });
  const [chart4AppliedFilters, setChart4AppliedFilters] = React.useState<
    string[]
  >([]);

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
        "data.xAxisKeys",
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
  const loadingBudgetBreakdown = useStoreState(
    (state) => state.FinancialInsightsBudgetBreakdown.loading
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
  const dataCycleFilterOptions = useStoreState((state) => ({
    id: "cycle",
    name: "Cycle",
    options: get(state.DisbursementsCycles, "data.data", []).map((o: any) => ({
      name: o.value,
      value: o.value,
    })),
  }));
  const cycles = useStoreState((state) =>
    get(state.BudgetsCycles, "data.data", [])
      .map((cycle: any) => ({
        label: cycle.value,
        value: cycle.value,
      }))
      .reverse()
  );
  const metricsCycles = useStoreState((state) =>
    get(state.FinancialMetricsCycles, "data.data", [])
      .map((cycle: any) => ({
        label: cycle.value,
        value: cycle.value,
      }))
      .reverse()
  );
  const expenditureCycles = useStoreState((state) =>
    get(state.ExpendituresCycles, "data.data", [])
      .map((cycle: any) => ({
        label: cycle.value,
        value: cycle.value,
      }))
      .reverse()
  );
  const fetchComponentFilterOptions = useStoreActions(
    (actions) => actions.ComponentFilterOptions.fetch
  );
  const fetchLocationFilterOptions = useStoreActions(
    (actions) => actions.LocationFilterOptions.fetch
  );
  const pageAppliedFilters = useStoreState((state) => [
    ...state.AppliedFiltersState.components,
    ...state.AppliedFiltersState.locations,
    ...state.AppliedFiltersState.principalRecipientTypes,
    ...state.AppliedFiltersState.principalRecipientSubTypes,
    ...state.AppliedFiltersState.principalRecipients,
    ...state.AppliedFiltersState.status,
    ...state.AppliedFiltersState.cycles,
  ]);
  const appliedFiltersData = useStoreState(
    (state) => state.AppliedFiltersState
  );
  const appliedFiltersActions = useStoreActions(
    (actions) => actions.AppliedFiltersState
  );

  const [budgetBreakdownDropdownSelected, setBudgetBreakdownDropdownSelected] =
    React.useState(cycles.length > 0 ? cycles[0].value : null);
  const [budgetCycleDropdownSelected, setBudgetCycleDropdownSelected] =
    React.useState(cycles.length > 0 ? cycles[0].value : null);
  const [
    financialMetricsCycleDropdownSelected,
    setFinancialMetricsCycleDropdownSelected,
  ] = React.useState(metricsCycles.length > 0 ? metricsCycles[0].value : null);
  const [
    expendituresCycleDropdownSelected,
    setExpendituresCycleDropdownSelected,
  ] = React.useState(
    expenditureCycles.length > 0 ? expenditureCycles[0].value : null
  );

  const [budgetTableDataType, setBudgetTableDataType] = React.useState(
    dropdownItemsBudgetsTableDataTypes[0].value
  );

  const handleDisbursementsSelectionChange = (value: string) => {
    setDisbursementsDropdownSelected(value);
  };

  const handleBudgetBreakdownSelectionChange = (value: string) => {
    setBudgetBreakdownDropdownSelected(value);
  };

  const handleBudgetTableDataTypeChange = (value: string) => {
    setBudgetTableDataType(value);
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
      cycles: [],
      components: [],
      locations: [],
      principalRecipients: [],
      principalRecipientSubTypes: [],
      principalRecipientTypes: [],
      status: [],
    });
  };

  const handleResetChartFilters = (index: number) => () => {
    switch (index) {
      case 1:
        setChart1AppliedFiltersData({
          ...chart1AppliedFiltersData,
          locations: [],
          components: [],
          principalRecipients: [],
          principalRecipientSubTypes: [],
          principalRecipientTypes: [],
          status: [],
          cycles: [],
        });
        setChart1AppliedFilters([]);
        break;
      case 2:
        setChart2AppliedFiltersData({
          ...chart2AppliedFiltersData,
          locations: [],
          components: [],
          principalRecipients: [],
          principalRecipientSubTypes: [],
          principalRecipientTypes: [],
          status: [],
          cycles: [],
        });
        setChart2AppliedFilters([]);
        break;
      case 3:
        setChart3AppliedFiltersData({
          ...chart3AppliedFiltersData,
          locations: [],
          components: [],
          principalRecipients: [],
          principalRecipientSubTypes: [],
          principalRecipientTypes: [],
          status: [],
          cycles: [],
        });
        setChart3AppliedFilters([]);
        break;
      case 4:
        setChart4AppliedFiltersData({
          ...chart4AppliedFiltersData,
          locations: [],
          components: [],
          principalRecipients: [],
          principalRecipientSubTypes: [],
          principalRecipientTypes: [],
          status: [],
          cycles: [],
        });
        setChart4AppliedFilters([]);
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
      if (index === 4) {
        state = { ...chart4AppliedFiltersData };
        action1 = setChart4AppliedFiltersData;
        action2 = setChart4AppliedFilters;
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
        case "principalRecipient":
          if (checked) {
            state.principalRecipients.push(value);
          } else {
            state.principalRecipients = state.principalRecipients.filter(
              (item) => item !== value
            );
          }
          break;
        case "principalRecipientSubType":
          if (checked) {
            state.principalRecipientSubTypes.push(value);
          } else {
            state.principalRecipientSubTypes =
              state.principalRecipientSubTypes.filter((item) => item !== value);
          }
          break;
        case "principalRecipientType":
          if (checked) {
            state.principalRecipientTypes.push(value);
          } else {
            state.principalRecipientTypes =
              state.principalRecipientTypes.filter((item) => item !== value);
          }
          break;
        case "status":
          if (checked) {
            state.status.push(value);
          } else {
            state.status = state.status.filter((item) => item !== value);
          }
          break;
        case "cycle":
          if (checked) {
            state.cycles.push(value);
          } else {
            state.cycles = state.cycles.filter((item) => item !== value);
          }
          break;
        default:
          break;
      }
      action1(state);
      action2([
        ...state.locations,
        ...state.components,
        ...state.principalRecipients,
        ...state.principalRecipientSubTypes,
        ...state.principalRecipientTypes,
        ...state.status,
        ...state.cycles,
      ]);
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
      if (index === 4) {
        state = { ...chart4AppliedFiltersData };
        action1 = setChart4AppliedFiltersData;
        action2 = setChart4AppliedFilters;
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
          case "principalRecipient":
            state.principalRecipients = state.principalRecipients.filter(
              (item) => item !== value
            );
            break;
          case "principalRecipientSubType":
            state.principalRecipientSubTypes =
              state.principalRecipientSubTypes.filter((item) => item !== value);
            break;
          case "principalRecipientType":
            state.principalRecipientTypes =
              state.principalRecipientTypes.filter((item) => item !== value);
            break;
          case "status":
            state.status = state.status.filter((item) => item !== value);
            break;
          case "cycle":
            state.cycles = state.cycles.filter((item) => item !== value);
            break;
          default:
            break;
        }
      });
      action1(state);
      action2([
        ...state.locations,
        ...state.components,
        ...state.principalRecipients,
        ...state.principalRecipientSubTypes,
        ...state.principalRecipientTypes,
        ...state.status,
        ...state.cycles,
      ]);
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
              left="-15px"
              bottom="20px"
              fontSize="10px"
              padding="7px 12px"
              borderRadius="4px"
              position="absolute"
              border="1px solid #DFE3E5"
              sx={{
                transformOrigin: "left",
                transform: "rotate(-90deg)",
                "@media (max-width: 767px)": {
                  left: 0,
                },
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
                color: () => appColors.TIME_CYCLE.BAR_COLOR_2,
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
              sx={{
                "@media (max-width: 767px)": {
                  bottom: 0,
                },
              }}
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
      <Box
        gap="40px"
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{
          "@media (max-width: 767px)": {
            marginTop: "32px",
          },
        }}
      >
        {dataBudgetUtilisation.items.length > 0 && (
          <FinancialMetric
            {...FINANCIAL_METRICS_DATA_1}
            donutChart={{
              ...FINANCIAL_METRICS_DATA_1.donutChart,
              value: dataBudgetUtilisation.value,
            }}
            items={dataBudgetUtilisation.items}
          />
        )}
        {dataInCountryAbsorption.items.length > 0 && (
          <FinancialMetric
            {...FINANCIAL_METRICS_DATA_2}
            donutChart={{
              ...FINANCIAL_METRICS_DATA_2.donutChart,
              value: dataInCountryAbsorption.value,
            }}
            items={dataInCountryAbsorption.items}
          />
        )}
        {dataDisbursementUtilisation.items.length > 0 && (
          <FinancialMetric
            {...FINANCIAL_METRICS_DATA_3}
            donutChart={{
              ...FINANCIAL_METRICS_DATA_3.donutChart,
              value: dataDisbursementUtilisation.value,
            }}
            items={dataDisbursementUtilisation.items}
          />
        )}
      </Box>
    );
  }, [
    dataBudgetUtilisation,
    dataInCountryAbsorption,
    dataDisbursementUtilisation,
  ]);

  const financialMetricsEmpty = React.useMemo(() => {
    return (
      !dataBudgetUtilisation.items.length &&
      !dataInCountryAbsorption.items.length &&
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
                "@media (max-width: 767px)": {
                  marginTop: "16px",
                },
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
        const columns = [...BUDGET_TABLE_COLUMNS];
        if (
          budgetTableDataType === dropdownItemsBudgetsTableDataTypes[1].value
        ) {
          columns[0].title = "Modules & Interventions";
        } else {
          columns[0].title = "Investment Landscapes & Cost Category";
        }
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
    budgetTableDataType,
  ]);

  const budgetsCycleDropdown = React.useMemo(() => {
    if (!budgetCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={cycles}
        dropdownSelected={budgetCycleDropdownSelected}
        handleDropdownChange={setBudgetCycleDropdownSelected}
      />
    );
  }, [cycles, budgetCycleDropdownSelected]);

  const budgetsTableDataTypeDropdown = React.useMemo(() => {
    return (
      <Box gap="10px" display="flex" flexDirection="row">
        {budgetsCycleDropdown}
        <Dropdown
          dropdownSelected={budgetTableDataType}
          dropdownItems={dropdownItemsBudgetsTableDataTypes}
          handleDropdownChange={handleBudgetTableDataTypeChange}
        />
      </Box>
    );
  }, [budgetsDropdownSelected, budgetTableDataType, budgetsCycleDropdown]);

  const financialMetricsCycleDropdown = React.useMemo(() => {
    if (!financialMetricsCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={metricsCycles}
        dropdownSelected={financialMetricsCycleDropdownSelected}
        handleDropdownChange={setFinancialMetricsCycleDropdownSelected}
      />
    );
  }, [metricsCycles, financialMetricsCycleDropdownSelected]);

  const expendituresCycleDropdown = React.useMemo(() => {
    if (!expendituresCycleDropdownSelected) {
      return <React.Fragment />;
    }
    return (
      <Dropdown
        dropdownItems={expenditureCycles}
        dropdownSelected={expendituresCycleDropdownSelected}
        handleDropdownChange={setExpendituresCycleDropdownSelected}
      />
    );
  }, [expenditureCycles, expendituresCycleDropdownSelected]);

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
            yAxisLabel="Modules & Interventions"
            xAxisLabel="Expenditure"
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
      <Box
        gap="20px"
        display="flex"
        flexDirection="row"
        alignItems="center"
        sx={{
          "@media (max-width: 767px)": {
            gap: "16px",
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
      >
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
    return formatFinancialValue(
      sumBy(
        filter(
          dataExpendituresHeatmap,
          (item) => !item.parentRow && !item.parentColumn
        ),
        "value"
      )
    );
  }, [dataExpendituresHeatmap]);

  const filterGroups = React.useMemo(() => {
    return [
      // dataCycleFilterOptions,
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
    // dataCycleFilterOptions,
  ]);
  const filterGroupsDisbursements = React.useMemo(() => {
    return [
      dataCycleFilterOptions,
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
    dataCycleFilterOptions,
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
    if (
      appliedFiltersData.principalRecipientTypes.length > 0 &&
      location.search.includes("principalRecipientTypes=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        appliedFiltersData.principalRecipientTypes.join(",")
      )}`;
    }
    if (
      appliedFiltersData.principalRecipientSubTypes.length > 0 &&
      location.search.includes("principalRecipientSubTypes=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        appliedFiltersData.principalRecipientSubTypes.join(",")
      )}`;
    }
    if (
      appliedFiltersData.principalRecipients.length > 0 &&
      location.search.includes("principalRecipients=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        appliedFiltersData.principalRecipients.join(",")
      )}`;
    }
    if (
      appliedFiltersData.status.length > 0 &&
      location.search.includes("status=")
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }status=${encodeURIComponent(appliedFiltersData.status.join(","))}`;
    }
    if (
      appliedFiltersData.cycles.length > 0 &&
      location.search.includes("cycles=")
    ) {
      // const years = appliedFiltersData.cycles.map(
      //   (cycle) => cycle.replace(/ /g, "").split("-")[0]
      // );
      // const yearsTo = appliedFiltersData.cycles.map(
      //   (cycle) => cycle.replace(/ /g, "").split("-")[1]
      // );
      // filterString += `${
      //   filterString.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(
      //   years.join(",")
      // )}&yearsTo=${encodeURIComponent(yearsTo.join(","))}`;
      filterString += `cycleNames=${appliedFiltersData.cycles.join(",")}`;
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
      (appliedFiltersData.principalRecipients.length > 0 &&
        location.search.includes("principalRecipients=")) ||
      chart1AppliedFiltersData.principalRecipients.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipients,
          ...chart1AppliedFiltersData.principalRecipients,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientSubTypes.length > 0 &&
        location.search.includes("principalRecipientSubTypes=")) ||
      chart1AppliedFiltersData.principalRecipientSubTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientSubTypes,
          ...chart1AppliedFiltersData.principalRecipientSubTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientTypes.length > 0 &&
        location.search.includes("principalRecipientTypes=")) ||
      chart1AppliedFiltersData.principalRecipientTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientTypes,
          ...chart1AppliedFiltersData.principalRecipientTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.status.length > 0 &&
        location.search.includes("status=")) ||
      chart1AppliedFiltersData.status.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }status=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.status,
          ...chart1AppliedFiltersData.status,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.cycles.length > 0 &&
        location.search.includes("cycles=")) ||
      chart1AppliedFiltersData.cycles.length > 0
    ) {
      // const years = uniq([
      //   ...appliedFiltersData.cycles,
      //   ...chart1AppliedFiltersData.cycles,
      // ]).map((cycle) => cycle.replace(/ /g, "").split("-")[0]);
      // const yearsTo = uniq([
      //   ...appliedFiltersData.cycles,
      //   ...chart1AppliedFiltersData.cycles,
      // ]).map((cycle) => cycle.replace(/ /g, "").split("-")[1]);
      // filterString += `${
      //   filterString.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(
      //   years.join(",")
      // )}&yearsTo=${encodeURIComponent(yearsTo.join(","))}`;
      filterString += `cycleNames=${uniq([
        ...appliedFiltersData.cycles,
        ...chart1AppliedFiltersData.cycles,
      ]).join(",")}`;
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
    if (
      (appliedFiltersData.principalRecipients.length > 0 &&
        location.search.includes("principalRecipients=")) ||
      chart2AppliedFiltersData.principalRecipients.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipients,
          ...chart2AppliedFiltersData.principalRecipients,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientSubTypes.length > 0 &&
        location.search.includes("principalRecipientSubTypes=")) ||
      chart2AppliedFiltersData.principalRecipientSubTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientSubTypes,
          ...chart2AppliedFiltersData.principalRecipientSubTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientTypes.length > 0 &&
        location.search.includes("principalRecipientTypes=")) ||
      chart2AppliedFiltersData.principalRecipientTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientTypes,
          ...chart2AppliedFiltersData.principalRecipientTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.status.length > 0 &&
        location.search.includes("status=")) ||
      chart2AppliedFiltersData.status.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }status=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.status,
          ...chart2AppliedFiltersData.status,
        ]).join(",")
      )}`;
    }
    if (budgetCycleDropdownSelected) {
      // const year = budgetCycleDropdownSelected.replace(/ /g, "").split("-")[0];
      // const yearTo = budgetCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[1];
      // filterString += `${
      //   filterString.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(year)}&yearsTo=${encodeURIComponent(yearTo)}`;
      filterString += `cycleNames=${budgetCycleDropdownSelected}`;
    }
    return filterString;
  }, [
    location.search,
    appliedFiltersData,
    chart2AppliedFiltersData,
    budgetCycleDropdownSelected,
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
      (appliedFiltersData.principalRecipients.length > 0 &&
        location.search.includes("principalRecipients=")) ||
      chart3AppliedFiltersData.principalRecipients.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipients,
          ...chart3AppliedFiltersData.principalRecipients,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientSubTypes.length > 0 &&
        location.search.includes("principalRecipientSubTypes=")) ||
      chart3AppliedFiltersData.principalRecipientSubTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientSubTypes,
          ...chart3AppliedFiltersData.principalRecipientSubTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientTypes.length > 0 &&
        location.search.includes("principalRecipientTypes=")) ||
      chart3AppliedFiltersData.principalRecipientTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientTypes,
          ...chart3AppliedFiltersData.principalRecipientTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.status.length > 0 &&
        location.search.includes("status=")) ||
      chart3AppliedFiltersData.status.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }status=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.status,
          ...chart3AppliedFiltersData.status,
        ]).join(",")
      )}`;
    }
    if (financialMetricsCycleDropdownSelected) {
      // const year = financialMetricsCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[0];
      // const yearTo = financialMetricsCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[1];
      // filterString += `${
      //   filterString.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(year)}&yearsTo=${encodeURIComponent(yearTo)}`;
      filterString += `cycleNames=${financialMetricsCycleDropdownSelected}`;
    }
    return filterString;
  }, [
    location.search,
    appliedFiltersData,
    chart3AppliedFiltersData,
    financialMetricsCycleDropdownSelected,
  ]);

  const chart4FilterString = React.useMemo(() => {
    let filterString = "";
    if (
      (appliedFiltersData.locations.length > 0 &&
        location.search.includes("locations=")) ||
      chart4AppliedFiltersData.locations.length > 0
    ) {
      filterString += `geographies=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.locations,
          ...chart4AppliedFiltersData.locations,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.components.length > 0 &&
        location.search.includes("components=")) ||
      chart4AppliedFiltersData.components.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }components=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.components,
          ...chart4AppliedFiltersData.components,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipients.length > 0 &&
        location.search.includes("principalRecipients=")) ||
      chart4AppliedFiltersData.principalRecipients.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipients=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipients,
          ...chart4AppliedFiltersData.principalRecipients,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientSubTypes.length > 0 &&
        location.search.includes("principalRecipientSubTypes=")) ||
      chart4AppliedFiltersData.principalRecipientSubTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientSubTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientSubTypes,
          ...chart4AppliedFiltersData.principalRecipientSubTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.principalRecipientTypes.length > 0 &&
        location.search.includes("principalRecipientTypes=")) ||
      chart4AppliedFiltersData.principalRecipientTypes.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }principalRecipientTypes=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.principalRecipientTypes,
          ...chart4AppliedFiltersData.principalRecipientTypes,
        ]).join(",")
      )}`;
    }
    if (
      (appliedFiltersData.status.length > 0 &&
        location.search.includes("status=")) ||
      chart4AppliedFiltersData.status.length > 0
    ) {
      filterString += `${
        filterString.length > 0 ? "&" : ""
      }status=${encodeURIComponent(
        uniq([
          ...appliedFiltersData.status,
          ...chart4AppliedFiltersData.status,
        ]).join(",")
      )}`;
    }
    if (expendituresCycleDropdownSelected) {
      // const year = expendituresCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[0];
      // const yearTo = expendituresCycleDropdownSelected
      //   .replace(/ /g, "")
      //   .split("-")[1];
      // filterString += `${
      //   filterString.length > 0 ? "&" : ""
      // }years=${encodeURIComponent(year)}&yearsTo=${encodeURIComponent(yearTo)}`;
      filterString += `cycleNames=${expendituresCycleDropdownSelected}`;
    }
    return filterString;
  }, [
    location.search,
    appliedFiltersData,
    chart4AppliedFiltersData,
    expendituresCycleDropdownSelected,
  ]);

  React.useEffect(() => {
    fetchFinancialInsightsStats({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
  }, [filterString, componentsGrouping, geographyGrouping]);

  React.useEffect(() => {
    fetchFinancialInsightsDisbursementsBarChart({
      filterString: chart1FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchFinancialInsightsDisbursementsLineChart({
      filterString: chart1FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchFinancialInsightsDisbursementsTable({
      filterString: chart1FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
  }, [chart1FilterString, componentsGrouping, geographyGrouping]);

  React.useEffect(() => {
    fetchBudgetSankey({
      filterString: chart2FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchBudgetTreemap({
      filterString: chart2FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
  }, [chart2FilterString, componentsGrouping, geographyGrouping]);

  React.useEffect(() => {
    let filterString = chart2FilterString;
    if (budgetTableDataType === dropdownItemsBudgetsTableDataTypes[1].value) {
      filterString += `${filterString.length > 0 ? "&" : ""}var2=${
        componentsGrouping === componentsGroupingOptions[0].value
          ? "activityAreaGroup"
          : "activityArea"
      }`;
    }
    fetchBudgetTable({
      filterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
  }, [chart2FilterString, budgetTableDataType, componentsGrouping]);

  React.useEffect(() => {
    fetchBudgetUtilisation({
      filterString: chart3FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchInCountryAbsorption({
      filterString: chart3FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchDisbursementUtilisation({
      filterString: chart3FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
  }, [chart3FilterString, componentsGrouping, geographyGrouping]);

  React.useEffect(() => {
    fetchExpendituresHeatmap({
      filterString: chart4FilterString,
      routeParams: {
        row: "principalRecipientType,principalRecipientSubType,principalRecipient",
        column: "component",
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchExpendituresBarChart({
      filterString: chart4FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
    fetchExpendituresTable({
      filterString: chart4FilterString,
      routeParams: {
        componentField:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "activityAreaGroup"
            : "activityArea",
        geographyGrouping,
      },
    });
  }, [chart4FilterString, componentsGrouping, geographyGrouping]);

  React.useEffect(() => {
    if (budgetBreakdownDropdownSelected) {
      fetchBudgetBreakdown({
        filterString,
        routeParams: {
          year: budgetBreakdownDropdownSelected,
          // year: budgetBreakdownDropdownSelected.replace(/ /g, ""),
          componentField:
            componentsGrouping === componentsGroupingOptions[0].value
              ? "activityAreaGroup"
              : "activityArea",
          geographyGrouping,
        },
      });
    }
  }, [
    budgetBreakdownDropdownSelected,
    filterString,
    componentsGrouping,
    geographyGrouping,
  ]);

  React.useEffect(() => {
    fetchComponentFilterOptions({
      routeParams: {
        type:
          componentsGrouping === componentsGroupingOptions[0].value
            ? "grouped"
            : "ungrouped",
      },
    });
  }, [componentsGrouping]);

  React.useEffect(() => {
    fetchLocationFilterOptions({
      routeParams: {
        type: geographyGrouping,
      },
    });
  }, [geographyGrouping]);

  React.useEffect(() => {
    if (location.hash) {
      const blockId = location.hash.slice(1).split("|")[0];
      const blockChartType = location.hash.slice(1).split("|")[1];
      if (blockId && blockChartType) {
        switch (blockId) {
          case "disbursements":
            setDisbursementsDropdownSelected(
              decodeURIComponent(blockChartType)
            );
            break;
          case "budgets":
            setBudgetsDropdownSelected(decodeURIComponent(blockChartType));
            break;
          case "expenditures":
            setExpendituresDropdownSelected(decodeURIComponent(blockChartType));
            break;
          default:
            break;
        }
      }
    }
  }, [location.hash]);

  React.useEffect(() => {
    if (cycles.length > 0 && !budgetCycleDropdownSelected) {
      setBudgetCycleDropdownSelected(cycles[cycles.length - 1].value);
    }
    if (cycles.length > 0 && !budgetBreakdownDropdownSelected) {
      setBudgetBreakdownDropdownSelected(cycles[cycles.length - 1].value);
    }
    if (cycles.length > 0 && !financialMetricsCycleDropdownSelected) {
      setFinancialMetricsCycleDropdownSelected(cycles[cycles.length - 1].value);
    }
    if (cycles.length > 0 && !expendituresCycleDropdownSelected) {
      setExpendituresCycleDropdownSelected(cycles[cycles.length - 1].value);
    }
  }, [cycles]);

  React.useEffect(() => {
    if (
      budgetTableDataType === dropdownItemsBudgetsTableDataTypes[1].value &&
      budgetsDropdownSelected !== dropdownItemsBudgets[2].value
    ) {
      setBudgetsDropdownSelected(dropdownItemsBudgets[2].value);
    }
  }, [budgetTableDataType]);

  useUnmount(() => {
    fetchLocationFilterOptions({
      routeParams: {
        type: geographyGroupingOptions[0].value,
      },
    });
  });

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
              "@media (max-width: 920px)": {
                padding: "0 15px",
                h5: {
                  fontSize: "20px",
                },
              },
              "@media (max-width: 767px)": {
                width: "100%",
                padding: "16px 0",
                "&:not(:last-child)": {
                  borderRightStyle: "none",
                  borderBottom: "1px solid #DFE3E5",
                },
              },
            },
            "@media (max-width: 767px)": {
              marginBottom: 0,
              flexDirection: "column",
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
            id="disbursements"
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
            appliedFilters={chart1AppliedFilters}
            filterGroups={filterGroupsDisbursements}
            toggleFilter={handleToggleChartFilter(1)}
            removeFilter={handleRemoveChartFilter(1)}
            handleResetFilters={handleResetChartFilters(1)}
            appliedFiltersData={chart1AppliedFiltersData}
            infoType="global"
          >
            {disbursementsChartContent}
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
            id="budgets"
            title="Budgets"
            subtitle={`${totalBudget} total budget.`}
            dropdownItems={dropdownItemsBudgets}
            dropdownSelected={budgetsDropdownSelected}
            handleDropdownChange={(value) => {
              if (value !== dropdownItemsBudgets[2].value) {
                setBudgetTableDataType(
                  dropdownItemsBudgetsTableDataTypes[0].value
                );
              }
              setBudgetsDropdownSelected(value);
            }}
            loading={loadingBudget}
            disableCollapse={
              budgetsDropdownSelected === dropdownItemsBudgets[2].value
            }
            empty={budgetsChartEmpty}
            filterGroups={filterGroups}
            appliedFilters={chart2AppliedFilters}
            toggleFilter={handleToggleChartFilter(2)}
            removeFilter={handleRemoveChartFilter(2)}
            handleResetFilters={handleResetChartFilters(2)}
            appliedFiltersData={chart2AppliedFiltersData}
            extraDropdown={budgetsTableDataTypeDropdown}
            infoType="budgets"
          >
            {budgetsChartContent}
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
            {dataBudgetBreakdown.map((i, ix) => (
              <Box
                key={i.name}
                display="flex"
                bgcolor={i.color}
                position="relative"
                alignItems="center"
                width={`${i.value}%`}
                flexDirection="column"
              >
                <Box
                  top="-35px"
                  fontSize="12px"
                  fontWeight="400"
                  position="absolute"
                  sx={{
                    "@media (max-width: 767px)": {
                      top: ix % 2 === 0 ? "-35px" : "auto",
                      bottom: ix % 2 === 1 ? "-35px" : "auto",
                    },
                  }}
                >
                  {i.name} ({i.value.toFixed(2).replace(".00", "")}%)
                </Box>
                <Divider
                  orientation="vertical"
                  sx={{
                    marginTop: "-5px",
                    borderColor: i.color,
                    "@media (max-width: 767px)": {
                      display: "none",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
          {loadingBudgetBreakdown && (
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
            id="financial-metrics"
            title="Financial Metrics"
            subtitle=""
            dropdownItems={[]}
            empty={financialMetricsEmpty}
            loading={loadingFinancialMetrics}
            filterGroups={filterGroups}
            appliedFilters={chart3AppliedFilters}
            toggleFilter={handleToggleChartFilter(3)}
            removeFilter={handleRemoveChartFilter(3)}
            handleResetFilters={handleResetChartFilters(3)}
            appliedFiltersData={chart3AppliedFiltersData}
            extraDropdown={financialMetricsCycleDropdown}
            infoType="global"
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
            id="expenditures"
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
            filterGroups={filterGroups}
            appliedFilters={chart4AppliedFilters}
            toggleFilter={handleToggleChartFilter(4)}
            removeFilter={handleRemoveChartFilter(4)}
            handleResetFilters={handleResetChartFilters(4)}
            appliedFiltersData={chart4AppliedFiltersData}
            extraDropdown={expendituresCycleDropdown}
            infoType="expenditures"
          >
            <Box
              sx={{
                width: "100%",
                height: "16px",
                "@media (min-width: 768px)": {
                  display: "none",
                },
              }}
            />
            {expendituresChartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
