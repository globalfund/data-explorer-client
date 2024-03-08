import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { CYCLES } from "app/pages/home/data";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import { Heatmap } from "app/components/charts/heatmap";
import { RadialChart } from "app/components/charts/radial";
import { SankeyChart } from "app/components/charts/sankey";
import { RaceBarChart } from "app/components/charts/race-bar";
import { STORY_DATA_VARIANT_1 as BAR_CHART_DATA } from "app/components/charts/bar/data";
import { STORY_DATA_VARIANT_1 as RACE_BAR_DATA } from "app/components/charts/race-bar/data";
import { STORY_DATA_VARIANT_4 as RADIAL_CHART_DATA } from "app/components/charts/radial/data";
import { STORY_DATA_VARIANT_1 as SANKEY_CHART_DATA } from "app/components/charts/sankey/data";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";
import {
  CHART_1_DROPDOWN_ITEMS,
  CHART_2_DROPDOWN_ITEMS,
} from "app/pages/grant/views/grant-implementation/data";
import {
  getPercentageColor,
  STORY_DATA_VARIANT_1 as HEATMAP_DATA,
} from "app/components/charts/heatmap/data";

export const GrantImplementation: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);
  const [chart2Cycle, setChart2Cycle] = React.useState(CYCLES[0]);

  const [chart1Dropdown, setChart1Dropdown] = React.useState(
    CHART_1_DROPDOWN_ITEMS[0].value
  );
  const [chart2Dropdown, setChart2Dropdown] = React.useState(
    CHART_2_DROPDOWN_ITEMS[0].value
  );

  const [chart2Unit, setChart2Unit] = React.useState<"amount" | "percentage">(
    "percentage"
  );

  const handleChartCycleChange = (cycle: string, index: number) => {
    switch (index) {
      case 1:
        setChart1Cycle(cycle);
        break;
      case 2:
        setChart2Cycle(cycle);
        break;
      default:
        break;
    }
  };
  const chart2UnitButtons = React.useMemo(
    () => (
      <Box
        gap="8px"
        display="flex"
        flexDirection="row"
        sx={{
          "& > button": {
            padding: "0",
            width: "32px",
            height: "32px",
            fontSize: "12px",
            borderRadius: "8px",
            "&:hover": {
              color: "#fff",
              background: "#000",
            },
          },
        }}
      >
        <IconButton
          onClick={() => setChart2Unit("percentage")}
          sx={{
            color: chart2Unit === "percentage" ? "#fff" : "#000",
            background: chart2Unit === "percentage" ? "#000" : "#F1F3F4",
          }}
        >
          %
        </IconButton>
        <IconButton
          onClick={() => setChart2Unit("amount")}
          sx={{
            color: chart2Unit === "amount" ? "#fff" : "#000",
            background: chart2Unit === "amount" ? "#000" : "#F1F3F4",
          }}
        >
          $
        </IconButton>
      </Box>
    ),
    [chart2Unit]
  );

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <ChartBlock
        title="$59.26 Million"
        subtitle="Disbursed"
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <RadialChart
          data={RADIAL_CHART_DATA}
          itemLabelFormatterType="name-value-percent"
        />
        <Box
          top="55%"
          display="flex"
          alignItems="center"
          position="absolute"
          flexDirection="column"
          justifyContent="center"
          right="calc(50% - 33px)"
        >
          <Box
            width="17px"
            height="17px"
            bgcolor="#00B5AE"
            borderRadius="50%"
          />
          <Typography variant="body2" fontWeight="700">
            Signed
          </Typography>
          <Typography variant="body2">$10.6 mln</Typography>
        </Box>
      </ChartBlock>
      <Divider sx={{ borderColor: "#000" }} />
      <RaceBarChart data={RACE_BAR_DATA} />
      <ChartBlockButtonToolbar />
      <Divider sx={{ borderColor: "#000" }} />
      <Grid
        container
        spacing={2}
        sx={{
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
        <Grid item xs={6} md={4}>
          <Box
            gap="10px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2" fontWeight="700">
              Board Approved Date
            </Typography>
            <Typography variant="overline">1/05/2010 - 12:00am</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            gap="10px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2" fontWeight="700">
              Program Start Date
            </Typography>
            <Typography
              gap="4px"
              display="flex"
              variant="overline"
              alignItems="center"
            >
              1/07/2010 - 12:00am
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={4}>
          <Box
            gap="10px"
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="body2" fontWeight="700">
              Program End Date
            </Typography>
            <Typography variant="overline">30/06/2015 - 12:00am</Typography>
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ borderColor: "#000" }} />
      <Box height="64px" />
      <ChartBlock
        title="Disbursements"
        subtitle="Overtime"
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <BarChart data={BAR_CHART_DATA} valueLabels={{ value: "" }} />
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        title="Budget"
        cycles={CYCLES}
        selectedCycle={chart1Cycle}
        dropdownSelected={chart1Dropdown}
        subtitle="Investments and Modules"
        dropdownItems={CHART_1_DROPDOWN_ITEMS}
        handleDropdownChange={setChart1Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 1)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Grid
          container
          spacing={4}
          sx={{
            color: "#464646",
            fontSize: "10px",
            fontWeight: "700",
          }}
        >
          <Grid item xs={3}>
            Total budget
          </Grid>
          <Grid item xs={3}>
            Component
          </Grid>
          <Grid item xs={3}>
            Modules
          </Grid>
          <Grid item xs={3}>
            Interventions
          </Grid>
        </Grid>
        <Box
          sx={{
            "#sankey-chart": {
              height: "1000px",
            },
          }}
        >
          <SankeyChart data={SANKEY_CHART_DATA} />
        </Box>
      </ChartBlock>
      <Box height="64px" />
      <ChartBlock
        cycles={CYCLES}
        subtitle="To date"
        title="Expenditures"
        selectedCycle={chart2Cycle}
        dropdownSelected={chart2Dropdown}
        dropdownItems={CHART_2_DROPDOWN_ITEMS}
        handleDropdownChange={setChart2Dropdown}
        handleCycleChange={(value) => handleChartCycleChange(value, 2)}
        text="Our Grant Implementation programs are developed meticulously, each Grant follows a well executed plan, always supervised by TGF Implementation team."
        unitButtons={chart2UnitButtons}
      >
        <Heatmap
          valueType="amount"
          data={HEATMAP_DATA}
          contentProp="value"
          hoveredLegend={null}
          columnCategory="cycle"
          rowCategory="component"
          getItemColor={getPercentageColor}
        />
      </ChartBlock>
    </Box>
  );
};
