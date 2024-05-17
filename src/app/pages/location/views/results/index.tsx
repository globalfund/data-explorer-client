import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useStoreState } from "app/state/store/hooks";
import { ChartBlock } from "app/components/chart-block";
import { TableContainer } from "app/components/table-container";
import { HomeResultsStats } from "app/pages/home/components/results-stats";
import { StatCompProps } from "app/pages/home/components/results-stats/data";
import {
  RESULT_YEARS,
  ResultsProps,
} from "app/pages/location/views/results/data";
import {
  TABLE_VARIATION_6_COLUMNS,
  TABLE_VARIATION_7_COLUMNS,
} from "app/components/table/data";

export const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const dataResultStats = useStoreState(
    (state) =>
      get(state.GeographyResultStats, "data.stats", []) as StatCompProps[]
  );
  const dataResultsTable = useStoreState((state) =>
    get(state.GeographyResultsTable, "data.data", [])
  );
  const dataDocumentsTable = useStoreState((state) =>
    get(state.GeographyResultsDocumentsTable, "data.data", [])
  );

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      <HomeResultsStats stats={dataResultStats} />
      <Box height="62px" />
      <ChartBlock
        title="Results"
        noBottomToolbar
        cycles={RESULT_YEARS}
        subtitle="Based on achievements"
        selectedCycle={props.resultsYear}
        handleCycleChange={(value) => props.setResultsYear(value)}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <TableContainer
          withCycles
          id="results-table"
          data={dataResultsTable}
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
          dataTreeStartExpanded
          id="documnents-table"
          data={dataDocumentsTable}
          columns={TABLE_VARIATION_6_COLUMNS}
        />
      </ChartBlock>
    </Box>
  );
};
