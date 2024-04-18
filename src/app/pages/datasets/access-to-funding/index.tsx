import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import Info from "@mui/icons-material/InfoOutlined";
import { Treemap } from "app/components/charts/treemap";
import { DatasetPage } from "app/pages/datasets/common/page";
import { SunburstChart } from "app/components/charts/sunburst";
import { BarSeriesChart } from "app/components/charts/bar-series";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { STORY_DATA_VARIANT_2 as TREEMAP_DATA } from "app/components/charts/treemap/data";
import { STORY_DATA_VARIANT_2 as SUNBURST_CHART_DATA } from "app/components/charts/sunburst/data";
import {
  KEYS,
  STORY_DATA_VARIANT_1 as BAR_SERIES_DATA,
} from "app/components/charts/bar-series/data";
import {
  BOXES,
  eligibilityYears,
  FullWidthDivider,
  geographyGroupingOptions,
  dropdownItemsAllocations,
  componentsGroupingOptions,
} from "app/pages/datasets/access-to-funding/data";
import {
  TABLE_VARIATION_10_DATA as ELIGIBILITY_TABLE_DATA,
  TABLE_VARIATION_10_COLUMNS as ELIGIBILITY_TABLE_COLUMNS,
  TABLE_VARIATION_11_DATA as ALLOCATIONS_TABLE_DATA,
  TABLE_VARIATION_11_COLUMNS as ALLOCATIONS_TABLE_COLUMNS,
  TABLE_VARIATION_12_DATA as FUNDING_REQUESTS_TABLE_DATA,
  TABLE_VARIATION_12_COLUMNS as FUNDING_REQUESTS_TABLE_COLUMNS,
} from "app/components/table/data";

export const AccessToFundingPage: React.FC = () => {
  const [geographyGrouping, setGeographyGrouping] = React.useState(
    geographyGroupingOptions[0].value
  );
  const [componentsGrouping, setComponentsGrouping] = React.useState(
    componentsGroupingOptions[0].value
  );
  const [eligibilityYear, setEligibilityYear] = React.useState(
    eligibilityYears[0].value
  );
  const [dropdownSelected, setDropdownSelected] = React.useState(
    dropdownItemsAllocations[0].value
  );

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  const handleGeographyGroupingChange = (value: string) => {
    setGeographyGrouping(value);
  };

  const handleComponentsGroupingChange = (value: string) => {
    setComponentsGrouping(value);
  };

  const handleEligibilityYearChange = (value: string) => {
    setEligibilityYear(value);
  };

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItemsAllocations[0].value:
        return (
          <SunburstChart
            data={SUNBURST_CHART_DATA}
            centerLabel="Total Allocation"
          />
        );
      case dropdownItemsAllocations[1].value:
        return <Treemap data={TREEMAP_DATA.slice(2, 5)} />;
      case dropdownItemsAllocations[2].value:
        return (
          <Table
            dataTree
            id="allocations-table"
            data={ALLOCATIONS_TABLE_DATA}
            columns={ALLOCATIONS_TABLE_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [dropdownSelected]);

  const range = React.useMemo(() => {
    const values: {
      value: number;
    }[] = [];
    BAR_SERIES_DATA.forEach((item) => {
      item.values.forEach((value) => {
        values.push({ value });
      });
    });
    return getRange(values, ["value"]);
  }, [BAR_SERIES_DATA]);

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
      title="Access to Funding"
      subtitle="Lorem ipsum."
      breadcrumbs={[{ label: "Datasets" }, { label: "Access to Funding" }]}
      toolbarRightContent={toolbarRightContent}
    >
      <Box width="100%" marginTop="50px">
        <Box>
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography fontSize="10px">Eligibility</Typography>
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
          <Grid container spacing={2} margin="4px 0 50px 0">
            <Grid item sm={6} md={3} style={{ paddingLeft: 0 }}>
              <Box padding="15px" bgcolor="#F1F3F5">
                <Typography variant="h5">67</Typography>
                <Typography fontSize="12px">
                  Countries Eligible for HIV.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6} md={3}>
              <Box padding="15px" bgcolor="#F1F3F5">
                <Typography variant="h5">58</Typography>
                <Typography fontSize="12px">
                  Countries Eligible for Malaria.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6} md={3}>
              <Box padding="15px" bgcolor="#F1F3F5">
                <Typography variant="h5">78</Typography>
                <Typography fontSize="12px">
                  Countries Eligible for Tuberculosis.
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6} md={3}>
              <Box padding="15px" bgcolor="#F1F3F5">
                <Typography variant="h5">59</Typography>
                <Typography fontSize="12px">
                  Countries Eligible for RSSH.
                </Typography>
              </Box>
            </Grid>
          </Grid>
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
            title="Eligibility"
            subtitle="Country eligibility for funding over time."
            dropdownItems={[]}
            disableCollapse
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
                    flexDirection: "row",
                    "> div": {
                      gap: "5px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      "#rectangle": {
                        width: "11px",
                        height: "11px",
                      },
                    },
                  },
                },
              }}
            >
              <Box>
                <Typography fontSize="12px" fontWeight="700">
                  Disease Burden
                </Typography>
                <Box>
                  <Box>
                    <Box id="rectangle" bgcolor="#FA7355" />
                    <Typography fontSize="12px">High</Typography>
                  </Box>
                  <Box>
                    <Box id="rectangle" bgcolor="#FFD646" />
                    <Typography fontSize="12px">Not High</Typography>
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
                <Info fontSize="small" />
              </Tooltip>
            </Box>
            <Table
              dataTree
              dataTreeStartExpanded
              id="eligibility-table"
              data={ELIGIBILITY_TABLE_DATA}
              columns={ELIGIBILITY_TABLE_COLUMNS}
            />
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box padding="50px 0">
          <Typography fontSize="10px">Allocations</Typography>
          <Typography variant="h5">Cumulative Allocation by Cycles</Typography>
          <Typography fontSize="14px" fontWeight="700">
            Cumulative Allocation by Cycles
          </Typography>
          <Box marginTop="25px" position="relative">
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
            <BarSeriesChart data={BAR_SERIES_DATA} keys={KEYS} />
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
            title="Allocations"
            subtitle="Allocations amounts for countries."
            dropdownItems={dropdownItemsAllocations}
            dropdownSelected={dropdownSelected}
            handleDropdownChange={handleSelectionChange}
            disableCollapse={
              dropdownSelected === dropdownItemsAllocations[2].value
            }
          >
            {chartContent}
          </DatasetChartBlock>
        </Box>
        <FullWidthDivider />
        <Box
          gap="20px"
          display="flex"
          padding="50px 0"
          flexDirection="row"
          justifyContent="space-between"
          sx={{
            "> div": {
              display: "flex",
              flexDirection: "column",
            },
          }}
        >
          {BOXES.map((b, i) => (
            <React.Fragment key={b.datasetName}>
              <Box key={b.datasetName}>
                <Typography fontSize="10px" marginBottom="5px">
                  {b.datasetName}
                </Typography>
                <Typography
                  fontSize="14px"
                  marginBottom="2px"
                  lineHeight="normal"
                >
                  {b.title}
                </Typography>
                <img src={b.image} alt={`${b.datasetName} img`} height={250} />
              </Box>
              {i !== BOXES.length - 1 && (
                <Divider orientation="vertical" sx={{ height: "323px" }} />
              )}
            </React.Fragment>
          ))}
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
            title="Funding Requests"
            subtitle="Funding request applications by countries."
            disableCollapse
            dropdownItems={[]}
          >
            <Table
              dataTree
              id="funding-requests-table"
              data={FUNDING_REQUESTS_TABLE_DATA}
              columns={FUNDING_REQUESTS_TABLE_COLUMNS.slice(0, 7)}
              extraColumns={FUNDING_REQUESTS_TABLE_COLUMNS.slice(
                7,
                FUNDING_REQUESTS_TABLE_COLUMNS.length - 1
              )}
            />
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};