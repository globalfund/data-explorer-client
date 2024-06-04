import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
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
  const loadingResultsTable = useStoreState(
    (state) => state.GeographyResultsTable.loading
  );
  const dataDocumentsTable = useStoreState((state) =>
    get(state.GeographyResultsDocumentsTable, "data.data", [])
  );

  const fullWidthDivider = (
    <React.Fragment>
      <Box height="2px" />
      <Divider
        sx={{
          left: "-50vw",
          width: "200vw",
          position: "relative",
          borderTopColor: "#868E96",
        }}
      />
      <Box height="2px" />
    </React.Fragment>
  );

  const showStats = dataResultStats.length > 0;
  const showResults = dataResultsTable.length > 0;
  const showDocuments = dataDocumentsTable.length > 0;

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      {showStats && <HomeResultsStats stats={dataResultStats} />}
      {showStats && fullWidthDivider}
      <ChartBlock
        title="Results"
        noBottomToolbar
        empty={!showResults}
        cycles={RESULT_YEARS}
        loading={loadingResultsTable}
        subtitle="Based on achievements"
        selectedCycle={props.resultsYear}
        handleCycleChange={props.setResultsYear}
        text="Description of Pledges & Contributions: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <TableContainer
          withCycles
          id="results-table"
          data={dataResultsTable}
          columns={TABLE_VARIATION_7_COLUMNS}
        />
      </ChartBlock>
      {showResults && fullWidthDivider}
      <ChartBlock
        noBottomToolbar
        title="Documents"
        empty={!showDocuments}
        subtitle="Country Profiles & others"
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
