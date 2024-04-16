import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { DatasetPage } from "app/pages/datasets/common/page";
import {
  geographyGroupingOptions,
  componentsGroupingOptions,
  eligibilityYears,
} from "app/pages/datasets/access-to-funding/data";

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
      </Box>
    </DatasetPage>
  );
};
