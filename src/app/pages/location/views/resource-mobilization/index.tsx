import React from "react";
import Box from "@mui/material/Box";
import { CYCLES } from "app/pages/home/data";
import { BarChart } from "app/components/charts/bar";
import { ChartBlock } from "app/components/chart-block";
import { STORY_DATA_VARIANT_1 as BAR_CHART_DATA } from "app/components/charts/bar/data";
import Typography from "@mui/material/Typography";

export const ResourceMobilization: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(CYCLES[0]);

  return (
    <Box paddingTop="64px">
      <ChartBlock
        cycles={CYCLES}
        title="$84 Million"
        selectedCycle={chart1Cycle}
        subtitle="Funds Contributed to date"
        handleCycleChange={(value) => setChart1Cycle(value)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <BarChart data={BAR_CHART_DATA} valueLabels={{ value: "" }} />
      </ChartBlock>
      <Box
        width="100%"
        display="flex"
        marginTop="64px"
        flexDirection="row"
        justifyContent="center"
      >
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="900">
            89.97 million
          </Typography>
          <Typography variant="subtitle2">
            Total Pledge{chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle}` : ""}
          </Typography>
        </Box>
        <Box
          width="50%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography variant="h3" fontWeight="900">
            89.9 million
          </Typography>
          <Typography variant="subtitle2">
            Total Contribution
            {chart1Cycle !== CYCLES[0] ? ` ${chart1Cycle}` : ""}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
