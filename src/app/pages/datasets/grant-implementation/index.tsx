import React from "react";
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
import { RadarChart } from "app/components/charts/radar";
import { DonutChart } from "app/components/charts/donut";
import { RadialChart } from "app/components/charts/radial";
import { SankeyChart } from "app/components/charts/sankey";
import { DatasetPage } from "app/pages/datasets/common/page";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { STORY_DATA_VARIANT_1 as RADAR_CHART_DATA } from "app/components/charts/radar/data";
import { STORY_DATA_VARIANT_3 as BUDGET_RADIAL_DATA } from "app/components/charts/radial/data";
import { STORY_DATA_VARIANT_2 as BUDGET_SANKEY_DATA } from "app/components/charts/sankey/data";
import { STORY_DATA_VARIANT_3 as DISBURSEMENTS_BAR_DATA } from "app/components/charts/bar/data";
import { STORY_DATA_VARIANT_2 as BUDGET_TREEMAP_DATA } from "app/components/charts/treemap/data";
import { STORY_DATA_VARIANT_2 as DISBURSEMENTS_LINE_DATA } from "app/components/charts/line/data";
import { STORY_DATA_VARIANT_2 as EXPENDITURES_BAR_CHART } from "app/components/charts/expandable-horizontal-bar/data";
import {
  getPercentageColor,
  STORY_DATA_VARIANT_1 as EXPENDITURES_HEATMAP_DATA,
} from "app/components/charts/heatmap/data";
import {
  TABLE_VARIATION_14_DATA as BUDGET_TABLE_DATA,
  TABLE_VARIATION_15_DATA as EXPENDITURES_TABLE_DATA,
  TABLE_VARIATION_14_COLUMNS as BUDGET_TABLE_COLUMNS,
  TABLE_VARIATION_13_DATA as DISBURSEMENTS_TABLE_DATA,
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

  const handleDisbursementsSelectionChange = (value: string) => {
    setDisbursementsDropdownSelected(value);
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
        range = getRange(DISBURSEMENTS_BAR_DATA, ["value"]);
        maxValue = maxBy(DISBURSEMENTS_BAR_DATA, "value")?.value || 0;
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
              data={DISBURSEMENTS_BAR_DATA}
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
        DISBURSEMENTS_LINE_DATA.forEach((item) => {
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
              data={DISBURSEMENTS_LINE_DATA}
              xAxisKeys={[
                "2002",
                "2003",
                "2004",
                "2005",
                "2006",
                "2007",
                "2008",
                "2009",
                "2010",
                "2011",
                "2012",
                "2013",
                "2014",
                "2015",
                "2016",
                "2017",
                "2018",
                "2019",
                "2020",
                "2021",
                "2022",
              ]}
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
            data={DISBURSEMENTS_TABLE_DATA}
            columns={DISBURSEMENTS_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [disbursementsDropdownSelected]);

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
            <Typography variant="h5">64,115,766,558 USD</Typography>
            <Typography fontSize="14px" fontWeight="700">
              Total Signed Amount
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">67,807,043,574 USD</Typography>
            <Typography fontSize="14px" fontWeight="700">
              Total Committed Amount
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">75,719,225,185 USD</Typography>
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
          gap="20px"
          width="100%"
          display="flex"
          padding="50px 0"
          flexDirection="row"
        >
          <Box
            sx={{
              gap: "20px",
              width: "40%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box>
              <Typography variant="h5">38,923,078,121 USD</Typography>
              <Typography fontSize="14px" fontWeight="700">
                Total Budget Amount
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="h5">Budget Breakdown</Typography>
              <Typography fontSize="14px" fontWeight="700">
                By grant component
              </Typography>
              <RadialChart
                height="350px"
                data={BUDGET_RADIAL_DATA}
                itemLabelFormatterType="name-percent"
              />
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box
            sx={{
              width: "60%",
            }}
          >
            <Box>
              <Typography variant="h5">Budget Utilization</Typography>
              <Typography fontSize="14px" fontWeight="700" marginBottom="30px">
                By grant component
              </Typography>
              <RadarChart height="350px" data={RADAR_CHART_DATA} />
            </Box>
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
          flexDirection="row"
          sx={{
            "> div": {
              width: "calc(100% / 3)",
            },
          }}
        >
          <Box
            sx={{
              gap: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontSize="10px">Expenditures</Typography>
              <Typography variant="h5">56,678,123,111 USD</Typography>
              <Typography fontSize="14px" fontWeight="700">
                Cumulative Expenditure
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography fontSize="10px">Expenditures</Typography>
              <Typography variant="h5">52,134,005,111 USD</Typography>
              <Typography fontSize="14px" fontWeight="700">
                Reported Expenditure
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Box>
              <Typography fontSize="10px">Expenditures</Typography>
              <Typography variant="h5">In-Country Absorption</Typography>
              <Typography fontSize="14px" fontWeight="700" marginBottom="30px">
                By the current cycle.
              </Typography>
              <Box
                width="100%"
                display="flex"
                alignItems="center"
                flexDirection="column"
              >
                <DonutChart
                  value={84.2}
                  label="reported"
                  valueColor="#013E77"
                />
                <Box
                  width="100%"
                  display="flex"
                  marginTop="20px"
                  flexDirection="row"
                  justifyContent="space-evenly"
                  sx={{
                    "> div": {
                      gap: "5px",
                      display: "flex",
                      alignItems: "baseline",
                      "> div": {
                        width: "15px",
                        height: "9px",
                        borderRadius: "2px",
                      },
                    },
                  }}
                >
                  <Box>
                    <Box bgcolor="#013E77" />
                    <Typography fontSize="12px">
                      Reported Expenditure
                    </Typography>
                  </Box>
                  <Box>
                    <Box bgcolor="#CFD4DA" />
                    <Typography fontSize="12px">
                      Cumulative Expenditure
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box>
            <Box>
              <Typography fontSize="10px">
                Disbursements & Expenditures
              </Typography>
              <Typography variant="h5">Disbursement Utilization</Typography>
              <Typography fontSize="14px" fontWeight="700" marginBottom="30px">
                By the current cycle.
              </Typography>
            </Box>
            <Box
              width="100%"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <DonutChart value={97.8} label="utilized" valueColor="#00B5AE" />
              <Box
                width="100%"
                display="flex"
                marginTop="20px"
                flexDirection="row"
                justifyContent="space-evenly"
                sx={{
                  "> div": {
                    gap: "5px",
                    display: "flex",
                    alignItems: "baseline",
                    "> div": {
                      width: "15px",
                      height: "9px",
                      borderRadius: "2px",
                    },
                  },
                }}
              >
                <Box>
                  <Box bgcolor="#00B5AE" />
                  <Typography fontSize="12px">Disbursement</Typography>
                </Box>
                <Box>
                  <Box bgcolor="#CFD4DA" />
                  <Typography fontSize="12px">
                    Cumulative Expenditure
                  </Typography>
                </Box>
              </Box>
            </Box>
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
