import React from "react";
import maxBy from "lodash/maxBy";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { BarChart } from "app/components/charts/bar";
import { LineChart } from "app/components/charts/line";
import { DatasetPage } from "app/pages/datasets/common/page";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { STORY_DATA_VARIANT_3 as DISBURSEMENTS_BAR_DATA } from "app/components/charts/bar/data";
import { STORY_DATA_VARIANT_2 as DISBURSEMENTS_LINE_DATA } from "app/components/charts/line/data";
import {
  TABLE_VARIATION_13_DATA as DISBURSEMENTS_TABLE_DATA,
  TABLE_VARIATION_13_COLUMNS as DISBURSEMENTS_TABLE_COLUMNS,
} from "app/components/table/data";
import {
  FullWidthDivider,
  geographyGroupingOptions,
  componentsGroupingOptions,
  dropdownItemsDisbursements,
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

  const handleDisbursementsSelectionChange = (value: string) => {
    setDisbursementsDropdownSelected(value);
  };

  const handleGeographyGroupingChange = (value: string) => {
    setGeographyGrouping(value);
  };

  const handleComponentsGroupingChange = (value: string) => {
    setComponentsGrouping(value);
  };

  const chartContent = React.useMemo(() => {
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
            {chartContent}
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
      </Box>
    </DatasetPage>
  );
};
