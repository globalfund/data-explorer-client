import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import Info from "@mui/icons-material/InfoOutlined";
import { DatasetPage } from "app/pages/datasets/common/page";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import {
  geographyGroupingOptions,
  componentsGroupingOptions,
  eligibilityYears,
} from "app/pages/datasets/access-to-funding/data";
import {
  TABLE_VARIATION_10_DATA as ELIGIBILITY_TABLE_DATA,
  TABLE_VARIATION_10_COLUMNS as ELIGIBILITY_TABLE_COLUMNS,
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

  const handleGeographyGroupingChange = (value: string) => {
    setGeographyGrouping(value);
  };

  const handleComponentsGroupingChange = (value: string) => {
    setComponentsGrouping(value);
  };

  const handleEligibilityYearChange = (value: string) => {
    setEligibilityYear(value);
  };

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
      </Box>
    </DatasetPage>
  );
};
