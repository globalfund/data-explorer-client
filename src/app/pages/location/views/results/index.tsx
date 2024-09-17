import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useCMSData } from "app/hooks/useCMSData";
import { ChartBlock } from "app/components/chart-block";
import { getCMSDataField } from "app/utils/getCMSDataField";
import { TableContainer } from "app/components/table-container";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { HomeResultsStats } from "app/pages/home/components/results-stats";
import { StatCompProps } from "app/pages/home/components/results-stats/data";
import { useGetDatasetLatestUpdate } from "app/hooks/useGetDatasetLatestUpdate";
import {
  RESULT_YEARS,
  ResultsProps,
} from "app/pages/location/views/results/data";
import {
  TABLE_VARIATION_6_COLUMNS,
  TABLE_VARIATION_7_COLUMNS,
} from "app/components/table/data";

export const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const cmsData = useCMSData({ returnData: true });
  const latestUpdateDate = useGetDatasetLatestUpdate({
    dataset: "results",
  });

  const params = useParams<{ id: string; tab: string }>();
  const paramsId = params.id?.replace("|", "%2F");

  const locationName = useStoreState((state) =>
    get(state.GeographyOverview, "data.data[0].name", params.id)
  );
  useTitle(`The Data Explorer - ${locationName}`);

  const [tableSearch, setTableSearch] = React.useState("");
  const [tableSearch2, setTableSearch2] = React.useState("");

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
  const fetchResultsTable = useStoreActions(
    (actions) => actions.GeographyResultsTable.fetch
  );
  const fetchResultsDocumentsTable = useStoreActions(
    (actions) => actions.GeographyResultsDocumentsTable.fetch
  );

  const onSearchChange = (search: string) => {
    setTableSearch(search);
    let filterString;
    if (search) {
      filterString = `&q=${search}`;
    }
    if (paramsId) {
      fetchResultsTable({
        filterString,
        routeParams: {
          code: paramsId,
          cycle: props.resultsYear.value,
        },
      });
    }
  };

  const onSearchChange2 = (search: string) => {
    setTableSearch(search);
    let filterString = `types=Profile&geographies=${paramsId}`;
    if (search) {
      filterString += `&q=${search}`;
    }
    if (paramsId) {
      fetchResultsDocumentsTable({ filterString });
    }
  };

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
  const showResults = dataResultsTable.length > 0 || tableSearch.length > 0;
  const showDocuments =
    dataDocumentsTable.length > 0 || tableSearch2.length > 0;

  return (
    <Box gap="24px" display="flex" flexDirection="column">
      {showStats && <HomeResultsStats stats={dataResultStats} />}
      {showStats && fullWidthDivider}
      <ChartBlock
        id="results"
        title={getCMSDataField(
          cmsData,
          "pagesLocationResults.title",
          "Annual Results"
        )}
        noBottomToolbar
        empty={!showResults}
        cycles={RESULT_YEARS}
        loading={loadingResultsTable}
        subtitle=""
        selectedCycles={[props.resultsYear]}
        handleCycleChange={props.setResultsYear}
        latestUpdate={latestUpdateDate}
        infoType="global"
      >
        <TableContainer
          withCycles
          id="results-table"
          search={tableSearch}
          data={dataResultsTable}
          onSearchChange={onSearchChange}
          columns={TABLE_VARIATION_7_COLUMNS}
        />
      </ChartBlock>
      {showResults && fullWidthDivider}
      <ChartBlock
        id="documents"
        noBottomToolbar
        title={getCMSDataField(
          cmsData,
          "pagesLocationResults.documentTitle",
          "Documents"
        )}
        empty={!showDocuments}
        subtitle=""
        infoType="global"
      >
        <TableContainer
          dataTree
          dataTreeStartExpanded
          search={tableSearch2}
          id="documnents-table"
          data={dataDocumentsTable}
          onSearchChange={onSearchChange2}
          columns={TABLE_VARIATION_6_COLUMNS}
        />
      </ChartBlock>
    </Box>
  );
};
