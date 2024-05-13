import React from "react";
import get from "lodash/get";
import maxBy from "lodash/maxBy";
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
import { BarChartDataItem } from "app/components/charts/bar/data";
import { LineChartDataItem } from "app/components/charts/line/data";
import { formatFinancialValue } from "app/utils/formatFinancialValue";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { FinancialMetric } from "app/components/charts/financial-metric";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { STORY_DATA_VARIANT_2 as BUDGET_SANKEY_DATA } from "app/components/charts/sankey/data";
import { STORY_DATA_VARIANT_2 as BUDGET_TREEMAP_DATA } from "app/components/charts/treemap/data";
import { STORY_DATA_VARIANT_2 as EXPENDITURES_BAR_CHART } from "app/components/charts/expandable-horizontal-bar/data";
import {
  getPercentageColor,
  STORY_DATA_VARIANT_1 as EXPENDITURES_HEATMAP_DATA,
} from "app/components/charts/heatmap/data";
import {
  STORY_DATA_VARIANT_1 as FINANCIAL_METRICS_DATA_1,
  STORY_DATA_VARIANT_2 as FINANCIAL_METRICS_DATA_2,
  STORY_DATA_VARIANT_3 as FINANCIAL_METRICS_DATA_3,
} from "app/components/charts/financial-metric/data";
import {
  TABLE_VARIATION_14_DATA as BUDGET_TABLE_DATA,
  TABLE_VARIATION_15_DATA as EXPENDITURES_TABLE_DATA,
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
  dropdownItemsBudgetBreakdown,
  BUDGET_BREAKDOWN_DATA,
} from "app/pages/datasets/grant-implementation/data";

export const GrantImplementationPage: React.FC = () => {
  const [geographyGrouping, setGeographyGrouping] = React.useState(
    geographyGroupingOptions[0].value
  );
  const [componentsGrouping, setComponentsGrouping] = React.useState(
    componentsGroupingOptions[0].value
  );
  const [disbursementsDropdownSelected, setDisbursementsDropdownSelected] =
    React.useState(dropdownItemsDisbursements[0].value);
  const [budgetBreakdownDropdownSelected, setBudgetBreakdownDropdownSelected] =
    React.useState(dropdownItemsBudgetBreakdown[0].value);
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
              Y Axis/<b>Disbursed Amount (USD {range.abbr})</b>
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
              Y Axis/<b>Disbursed Amount (USD {range.abbr})</b>
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

  const financialMetricsContent = React.useMemo(() => {
    return (
      <Box gap="40px" width="100%" display="flex" flexDirection="column">
        <FinancialMetric {...FINANCIAL_METRICS_DATA_1} />
        <FinancialMetric {...FINANCIAL_METRICS_DATA_2} />
        <FinancialMetric {...FINANCIAL_METRICS_DATA_3} />
      </Box>
    );
  }, []);

  const budgetsChartContent = React.useMemo(() => {
    switch (budgetsDropdownSelected) {
      case dropdownItemsBudgets[0].value:
        return <SankeyChart data={BUDGET_SANKEY_DATA} />;
      case dropdownItemsBudgets[1].value:
        return <Treemap data={BUDGET_TREEMAP_DATA} />;
      case dropdownItemsBudgets[2].value:
        return (
          <Table
            dataTree
            id="budgets-table"
            data={BUDGET_TABLE_DATA}
            columns={BUDGET_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [budgetsDropdownSelected]);

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
            data={EXPENDITURES_HEATMAP_DATA}
            getItemColor={getPercentageColor}
            columnHeader="Principal Recipients"
            rowHeader="Components"
          />
        );
      case dropdownItemsExpenditures[1].value:
        return (
          <ExpandableHorizontalBar
            data={EXPENDITURES_BAR_CHART}
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
            data={EXPENDITURES_TABLE_DATA}
            columns={EXPENDITURES_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [expendituresDropdownSelected]);

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
  }, []);

  React.useEffect(() => {
    fetchFinancialInsightsStats({});
    fetchFinancialInsightsDisbursementsBarChart({});
    fetchFinancialInsightsDisbursementsLineChart({});
    fetchFinancialInsightsDisbursementsTable({});
  }, []);

  return (
    <DatasetPage
      title="Financial Insights"
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
          sx={{
            "> div": {
              width: "calc(100% / 3)",
              padding: "0 20px",
              "&:not(:last-child)": {
                borderRight: "1px solid #DFE3E5",
              },
              "&:first-child": {
                paddingLeft: 0,
              },
            },
          }}
        >
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
            disableCollapse={
              disbursementsDropdownSelected ===
              dropdownItemsDisbursements[2].value
            }
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
            title="Budgets"
            subtitle="Detailed budgets for each implementation period from the 2017-2019 Allocation Period and onwards."
            dropdownItems={dropdownItemsBudgets}
            dropdownSelected={budgetsDropdownSelected}
            handleDropdownChange={(value) => setBudgetsDropdownSelected(value)}
            disableCollapse={
              budgetsDropdownSelected === dropdownItemsBudgets[2].value
            }
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
                dropdownItems={dropdownItemsBudgetBreakdown}
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
            {BUDGET_BREAKDOWN_DATA.map((i) => (
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
            title="Expenditures"
            subtitle="Lorem Ipsum"
            dropdownItems={dropdownItemsExpenditures}
            dropdownSelected={expendituresDropdownSelected}
            handleDropdownChange={(value) =>
              setExpendituresDropdownSelected(value)
            }
            disableCollapse={
              expendituresDropdownSelected ===
              dropdownItemsExpenditures[2].value
            }
          >
            {expendituresChartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
