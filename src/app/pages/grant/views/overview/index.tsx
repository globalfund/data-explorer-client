import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useStoreState } from "app/state/store/hooks";
import { RaceBarChart } from "app/components/charts/race-bar";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";

export const GrantOverview: React.FC = () => {
  const dataGrant = useStoreState(
    (state) =>
      get(state.GrantInfo, "data.data[0]", {
        code: "",
        title: "",
        periods: [],
        countryName: "",
        countryCode: "",
        principalRecipientId: "",
        principalRecipientName: "",
        principalRecipientShortrName: "",
        component: "",
        FPMName: "",
        FPMEmail: "",
      }) as {
        code: string;
        title: string;
        periods: {
          code: string | number;
          name: string;
        }[];
        countryName: string;
        countryCode: string;
        principalRecipientId: string;
        principalRecipientName: string;
        principalRecipientShortrName: string;
        component: string;
        FPMName: string;
        FPMEmail: string;
      }
  );
  const dataOverview = useStoreState((state) =>
    get(state.GrantOverview, "data.data[0]", {
      goals: [],
      status: "",
      objectives: [],
      disbursement: 0,
      commitment: 0,
      signed: 0,
    })
  );

  const statusColor = React.useMemo(() => {
    switch (dataOverview.status) {
      case "Active":
        return "#00A343";
      case "Closed":
        return "#FF0000";
      case "Financially Closed":
        return "#FFA500";
      default:
        return "#000";
    }
  }, [dataOverview.status]);

  const raceBarChartData = React.useMemo(() => {
    return [
      {
        name: "Disbursed",
        value: dataOverview.disbursement,
        color: "#0A2840",
        percentage: (dataOverview.disbursement / dataOverview.commitment) * 100,
      },
      {
        name: "Committed",
        value: dataOverview.commitment,
        color: "#013E77",
        percentage: (dataOverview.commitment / dataOverview.signed) * 100,
      },
      {
        name: "Signed",
        value: dataOverview.signed,
        color: "#00B5AE",
        percentage: 100,
      },
    ];
  }, [dataOverview.disbursement, dataOverview.commitment, dataOverview.signed]);

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <Box>
        <Typography variant="body2" fontWeight="700">
          Goals
        </Typography>
        <Typography variant="body2">
          {dataOverview.goals.map((goal: string, index: number) => (
            <React.Fragment key={index}>
              {goal}
              <br />
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </Box>
      <Box marginBottom="32px">
        <Typography variant="body2" fontWeight="700">
          Objectives
        </Typography>
        <Typography variant="body2">
          {dataOverview.objectives.map((objective: string, index: number) => (
            <React.Fragment key={index}>
              {objective}
              <br />
              <br />
            </React.Fragment>
          ))}
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
        <Grid item xs={6} md={4} lg={3}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Fund Portfolio Manager
            </Typography>
            <Typography variant="overline">
              {dataGrant.FPMName}
              <br />
              <a href={`mailto:${dataGrant.FPMEmail}`}>{dataGrant.FPMEmail}</a>
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
                borderRadius="50%"
                bgcolor={statusColor}
              />
              {dataOverview.status}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Country
            </Typography>
            <Typography variant="overline">{dataGrant.countryName}</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Component
            </Typography>
            <Typography variant="overline">{dataGrant.component}</Typography>
          </Box>
        </Grid>
        {/* <Grid item xs={6} md={4} lg={2}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Rating
            </Typography>
            <Typography variant="overline">-</Typography>
          </Box>
        </Grid> */}
        <Grid item xs={6} md={4} lg={3}>
          <Box gap="10px" display="flex" flexDirection="column">
            <Typography variant="body2" fontWeight="700">
              Principal Recipient
            </Typography>
            <Typography variant="overline">
              {dataGrant.principalRecipientName}{" "}
              {dataGrant.principalRecipientShortrName}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "#000" }} />
      <RaceBarChart data={raceBarChartData} />
      <ChartBlockButtonToolbar />
    </Box>
  );
};
