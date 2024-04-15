import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { DatasetPage } from "app/pages/datasets/common/page";
import { SunburstChart } from "app/components/charts/sunburst";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { ReactComponent as BarChartIcon } from "app/assets/vectors/Select_BarChart.svg";
import { ExpandableHorizontalBar } from "app/components/charts/expandable-horizontal-bar";
import { ReactComponent as SunburstChartIcon } from "app/assets/vectors/Select_SunburstChart.svg";
import { STORY_DATA_VARIANT_1 as SUNBURST_CHART_DATA } from "app/components/charts/expandable-horizontal-bar/data";
import { STORY_DATA_VARIANT_1 as HORIZONTAL_BAR_CHART_DATA } from "app/components/charts/expandable-horizontal-bar/data";
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

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return (
          <ExpandableHorizontalBar
            data={HORIZONTAL_BAR_CHART_DATA}
            valueLabels={{
              value: "Pledge",
              value1: "Contribution",
            }}
          />
        );
      case dropdownItems[1].value:
        return <SunburstChart data={SUNBURST_CHART_DATA} />;
      case dropdownItems[2].value:
        return (
          <Table
            dataTree
            id="pledges-contributions-table"
            data={TABLE_VARIATION_8_DATA}
            columns={TABLE_VARIATION_8_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [dropdownSelected]);

  return (
    <DatasetPage
      title="Resource Mobilization"
      subtitle="Government, private sector, non-government and other donor pledges and contributions"
      breadcrumbs={[{ label: "Datasets" }, { label: "Resource Mobilization" }]}
    >
      <Box width="100%" marginTop="50px">
        <Grid container marginBottom="50px">
          <Grid
            item
            sm={12}
            md={4}
            xl={3}
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
              <Typography fontSize="10px">Pledges & Contributions</Typography>
              <Typography variant="h5">84% of Pledges Committed</Typography>
              <Typography variant="body2" fontWeight="700">
                in Cumulative Commitments
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography fontSize="10px">Pledges & Contributions</Typography>
              <Typography variant="h5">88,959,272,546 USD</Typography>
              <Typography variant="body2" fontWeight="700">
                Total Pledges
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography fontSize="10px">Pledges & Contributions</Typography>
              <Typography variant="h5">73,703,118,022 USD</Typography>
              <Typography variant="body2" fontWeight="700">
                Total Contributions
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sm={12}
            md={8}
            xl={9}
            sx={{
              paddingLeft: "21px",
              "@media (max-width: 600px)": {
                paddingLeft: "0px",
              },
            }}
          >
            <Box marginBottom="20px">
              <Typography fontSize="10px">Pledges & Contributions</Typography>
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
                    210
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
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">67</Typography>
                    <Typography fontSize="12px">
                      from Affordable Medicines Facility - malaria (AMFm).
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">58</Typography>
                    <Typography fontSize="12px">from corporations.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">34</Typography>
                    <Typography fontSize="12px">from Debt2Health.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">22</Typography>
                    <Typography fontSize="12px">
                      from faith-based organizations.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">20</Typography>
                    <Typography fontSize="12px">from foundations.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">19</Typography>
                    <Typography fontSize="12px">from individuals.</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">15</Typography>
                    <Typography fontSize="12px">
                      from private sector & non-government.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={3}>
                  <Box bgcolor="#F1F3F5" padding="5px 10px">
                    <Typography variant="h5">12</Typography>
                    <Typography fontSize="12px">from public sector.</Typography>
                  </Box>
                </Grid>
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
          >
            {chartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
