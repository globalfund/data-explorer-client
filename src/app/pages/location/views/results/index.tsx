import React from "react";
import Box from "@mui/material/Box";
import { ChartBlock } from "app/components/chart-block";
import { TableContainer } from "app/components/table-container";
import { RESULT_YEARS } from "app/pages/location/views/results/data";
import { HomeResultsStats } from "app/pages/home/components/results-stats";
import {
  TABLE_VARIATION_6_DATA,
  TABLE_VARIATION_7_DATA,
  TABLE_VARIATION_6_COLUMNS,
  TABLE_VARIATION_7_COLUMNS,
} from "app/components/table/data";

export const Results: React.FC = () => {
  const [chart1Cycle, setChart1Cycle] = React.useState(RESULT_YEARS[0]);

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <HomeResultsStats />
      <Box height="62px" />
      <ChartBlock
        title="Results"
        noBottomToolbar
        cycles={RESULT_YEARS}
        selectedCycle={chart1Cycle}
        subtitle="Based on achievements"
        handleCycleChange={(value) => setChart1Cycle(value)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <TableContainer
          withCycles
          data={TABLE_VARIATION_7_DATA}
          columns={TABLE_VARIATION_7_COLUMNS}
        />
      </ChartBlock>
      <ChartBlock
        noBottomToolbar
        title="Documents"
        subtitle="Applications & others"
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <TableContainer
          dataTree
          data={TABLE_VARIATION_6_DATA}
          columns={TABLE_VARIATION_6_COLUMNS}
        />
      </ChartBlock>
    </Box>
  );
};
