import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { DatasetPage } from "app/pages/datasets/common/page";

export const ResourceMobilizationPage: React.FC = () => {
  return (
    <DatasetPage
      title="Resource Mobilization"
      subtitle="Government, private sector, non-government and other donor pledges and contributions"
      breadcrumbs={[{ label: "Datasets" }, { label: "Resource Mobilization" }]}
    >
      <Box width="100%" marginTop="50px">
        <Grid container>
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
      </Box>
    </DatasetPage>
  );
};
