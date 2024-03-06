import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { RaceBarChart } from "app/components/charts/race-bar";
import { STORY_DATA_VARIANT_1 } from "app/components/charts/race-bar/data";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";

export const GrantOverview: React.FC = () => {
  //   const statusColor = React.useMemo(() => {
  //     switch (status) {
  //       case "Active":
  //         return "#00A343";
  //       case "Closed":
  //         return "#FF0000";
  //       case "Financially Closed":
  //         return "#FFA500";
  //       default:
  //         return "#000";
  //     }
  //   }, []);

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <Box>
        <Typography variant="body2" fontWeight="700">
          Goals
        </Typography>
        <Typography variant="body2">
          This page provides an overview of the IATI ('open') data currently
          published by individual Grand Bargain signatories and/or their
          affiliated organisations. Its primary purpose is to enable signatories
          to monitor their own progress in relation to meeting the data
          publication commitment of the Grand Bargain.
        </Typography>
      </Box>
      <Box marginBottom="32px">
        <Typography variant="body2" fontWeight="700">
          Objectives
        </Typography>
        <Typography variant="body2">
          This page provides an overview of the IATI ('open') data currently
          published by individual Grand Bargain signatories and/or their
          affiliated organisations. Its primary purpose is to enable signatories
          to monitor their own progress in relation to meeting the data
          publication commitment of the Grand Bargain.
        </Typography>
      </Box>
      <Divider sx={{ borderColor: "#000" }} />
      <Grid
        container
        spacing={2}
        sx={{
          span: {
            lineHeight: 1.2,
          },
          a: {
            color: "#000",
            textDecoration: "none",
          },
          "> div": {
            position: "relative",
            "&:not(:last-of-type):after": {
              right: 0,
              bottom: 0,
              top: "21px",
              width: "1px",
              content: '""',
              height: "38px",
              position: "absolute",
              backgroundColor: "#000",
            },
            "> div > *": {
              maxWidth: "100%",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          },
        }}
      >
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Fund Portfolio Manager
            </Typography>
            <Typography variant="overline">
              Paul MCCARRICK
              <br />
              <a href="mailto:paul.mccarrick@theglobalfund.org">
                paul.mccarrick@theglobalfund.org
              </a>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Grant Status
            </Typography>
            <Typography
              gap="4px"
              display="flex"
              variant="overline"
              alignItems="center"
            >
              <Box
                width="8px"
                height="8px"
                bgcolor="#11AD6B"
                borderRadius="50%"
              />
              Active
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Country
            </Typography>
            <Typography variant="overline">Pakistan</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Component
            </Typography>
            <Typography variant="overline">HIV</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Rating
            </Typography>
            <Typography variant="overline">A2</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Principal Recipient
            </Typography>
            <Typography variant="overline">Nai Zindagi (NZ)</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "#000" }} />
      <RaceBarChart data={STORY_DATA_VARIANT_1} />
      <ChartBlockButtonToolbar />
    </Box>
  );
};
