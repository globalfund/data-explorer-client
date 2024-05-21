import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Results } from "app/pages/location/views/results";
import CircularProgress from "@mui/material/CircularProgress";
import { DetailPageTabs } from "app/components/detail-page-tabs";
import { LocationOverview } from "app/pages/location/views/overview";
import { RESULT_YEARS } from "app/pages/location/views/results/data";
import { LOCATION_TABS } from "app/components/detail-page-tabs/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { AccessToFunding } from "app/pages/location/views/access-to-funding";
import { GrantImplementation } from "app/pages/location/views/grant-implementation";
import { ResourceMobilization } from "app/pages/location/views/resource-mobilization";

export const Location: React.FC = () => {
  const params = useParams<{ id: string; tab: string }>();

  const [grantsTablePage, setGrantsTablePage] = React.useState(1);
  const [resultsYear, setResultsYear] = React.useState(
    RESULT_YEARS[RESULT_YEARS.length - 1]
  );

  const dataOverview = useStoreState((state) =>
    get(state.GeographyOverview, "data.data[0]", {
      name: "",
      region: "",
      description: "",
      FPMName: "",
      FPMEmail: "",
      currentPrincipalRecipients: [],
      formerPrincipalRecipients: [],
    })
  );
  const loadingOverview = useStoreState(
    (state) => state.GeographyOverview.loading
  );
  const fetchOverview = useStoreActions(
    (actions) => actions.GeographyOverview.fetch
  );
  const clearOverview = useStoreActions(
    (actions) => actions.GeographyOverview.clear
  );
  const fetchCCMContacts = useStoreActions(
    (actions) => actions.GeographyOverviewCoordinatingMechanismsContacts.fetch
  );
  const loadingCCMContacts = useStoreState(
    (state) => state.GeographyOverviewCoordinatingMechanismsContacts.loading
  );
  const clearCCMContacts = useStoreActions(
    (actions) => actions.GeographyOverviewCoordinatingMechanismsContacts.clear
  );
  const fetchRMBarChart = useStoreActions(
    (actions) => actions.GeographyResourceMobilizationBarChart.fetch
  );
  const loadingRMBarChart = useStoreState(
    (state) => state.GeographyResourceMobilizationBarChart.loading
  );
  const clearRMBarChart = useStoreActions(
    (actions) => actions.GeographyResourceMobilizationBarChart.clear
  );
  const fetchAllocationsRadialChart = useStoreActions(
    (actions) => actions.GeographyAllocationsRadialChart.fetch
  );
  const loadingAllocationsRadialChart = useStoreState(
    (state) => state.GeographyAllocationsRadialChart.loading
  );
  const clearAllocationsRadialChart = useStoreActions(
    (actions) => actions.GeographyAllocationsRadialChart.clear
  );
  const fetchFundingRequestsTable = useStoreActions(
    (actions) => actions.GeographyFundingRequestsTable.fetch
  );
  const loadingFundingRequestsTable = useStoreState(
    (state) => state.GeographyFundingRequestsTable.loading
  );
  const clearFundingRequestsTable = useStoreActions(
    (actions) => actions.GeographyFundingRequestsTable.clear
  );
  const fetchEligibilityHeatmap = useStoreActions(
    (actions) => actions.GeographyEligibilityHeatmap.fetch
  );
  const loadingEligibilityHeatmap = useStoreState(
    (state) => state.GeographyEligibilityHeatmap.loading
  );
  const clearEligibilityHeatmap = useStoreActions(
    (actions) => actions.GeographyEligibilityHeatmap.clear
  );
  const fetchDocumentsTable = useStoreActions(
    (actions) => actions.GeographyDocumentsTable.fetch
  );
  const loadingDocumentsTable = useStoreState(
    (state) => state.GeographyDocumentsTable.loading
  );
  const clearDocumentsTable = useStoreActions(
    (actions) => actions.GeographyDocumentsTable.clear
  );
  const fetchDisbursementsLineChart = useStoreActions(
    (actions) => actions.GeographyDisbursementsLineChart.fetch
  );
  const loadingDisbursementsLineChart = useStoreState(
    (state) => state.GeographyDisbursementsLineChart.loading
  );
  const clearDisbursementsLineChart = useStoreActions(
    (actions) => actions.GeographyDisbursementsLineChart.clear
  );
  const fetchBudgetSankeyChart = useStoreActions(
    (actions) => actions.GeographyBudgetSankeyChart.fetch
  );
  const loadingBudgetSankeyChart = useStoreState(
    (state) => state.GeographyBudgetSankeyChart.loading
  );
  const clearBudgetSanketChart = useStoreActions(
    (actions) => actions.GeographyBudgetSankeyChart.clear
  );
  const fetchExpendituresHeatmap = useStoreActions(
    (actions) => actions.GeographyExpendituresHeatmap.fetch
  );
  const loadingExpendituresHeatmap = useStoreState(
    (state) => state.GeographyExpendituresHeatmap.loading
  );
  const clearExpendituresHeatmap = useStoreActions(
    (actions) => actions.GeographyExpendituresHeatmap.clear
  );
  const fetchGrantsPieCharts = useStoreActions(
    (actions) => actions.GeographyGrantsPieCharts.fetch
  );
  const loadingGrantsPieCharts = useStoreState(
    (state) => state.GeographyGrantsPieCharts.loading
  );
  const clearGrantsPieCharts = useStoreActions(
    (actions) => actions.GeographyGrantsPieCharts.clear
  );
  const fetchGrantsTable = useStoreActions(
    (actions) => actions.GeographyGrantsTable.fetch
  );
  const loadingGrantsTable = useStoreState(
    (state) => state.GeographyGrantsTable.loading
  );
  const clearGrantsTable = useStoreActions(
    (actions) => actions.GeographyGrantsTable.clear
  );
  const fetchResultStats = useStoreActions(
    (actions) => actions.GeographyResultStats.fetch
  );
  const loadingResultStats = useStoreState(
    (state) => state.GeographyResultStats.loading
  );
  const clearResultStats = useStoreActions(
    (actions) => actions.GeographyResultStats.clear
  );
  const fetchResultsTable = useStoreActions(
    (actions) => actions.GeographyResultsTable.fetch
  );
  const loadingResultsTable = useStoreState(
    (state) => state.GeographyResultsTable.loading
  );
  const clearResultsTable = useStoreActions(
    (actions) => actions.GeographyResultsTable.clear
  );
  const fetchResultsDocumentsTable = useStoreActions(
    (actions) => actions.GeographyResultsDocumentsTable.fetch
  );
  const loadingResultsDocumentsTable = useStoreState(
    (state) => state.GeographyResultsDocumentsTable.loading
  );
  const clearResultsDocumentsTable = useStoreActions(
    (actions) => actions.GeographyResultsDocumentsTable.clear
  );

  const loading = React.useMemo(() => {
    switch (`/${params.tab}`) {
      case LOCATION_TABS[0].link:
        return loadingOverview || loadingCCMContacts;
      case LOCATION_TABS[1].link:
        return loadingRMBarChart;
      case LOCATION_TABS[2].link:
        return (
          loadingAllocationsRadialChart ||
          loadingFundingRequestsTable ||
          loadingEligibilityHeatmap ||
          loadingDocumentsTable
        );
      case LOCATION_TABS[3].link:
        return (
          loadingDisbursementsLineChart ||
          loadingBudgetSankeyChart ||
          loadingExpendituresHeatmap ||
          loadingGrantsPieCharts ||
          loadingGrantsTable
        );
      case LOCATION_TABS[4].link:
        return (
          loadingResultStats ||
          loadingResultsTable ||
          loadingResultsDocumentsTable
        );
      default:
        return false;
    }
  }, [
    params.tab,
    loadingOverview,
    loadingCCMContacts,
    loadingRMBarChart,
    loadingAllocationsRadialChart,
    loadingFundingRequestsTable,
    loadingEligibilityHeatmap,
    loadingDocumentsTable,
    loadingDisbursementsLineChart,
    loadingBudgetSankeyChart,
    loadingExpendituresHeatmap,
    loadingGrantsPieCharts,
    loadingGrantsTable,
    loadingResultStats,
    loadingResultsTable,
    loadingResultsDocumentsTable,
  ]);

  const view = React.useMemo(() => {
    switch (params.tab) {
      case "overview":
        return <LocationOverview />;
      case "financial-insights":
        return (
          <GrantImplementation
            page={grantsTablePage}
            setPage={setGrantsTablePage}
          />
        );
      case "resource-mobilization":
        return <ResourceMobilization />;
      case "access-to-funding":
        return <AccessToFunding />;
      case "results":
        return (
          <Results resultsYear={resultsYear} setResultsYear={setResultsYear} />
        );
      default:
        return <div />;
    }
  }, [params.tab, grantsTablePage, resultsYear]);

  React.useEffect(() => {
    if (params.id) {
      fetchOverview({
        routeParams: {
          code: params.id,
        },
      });
      fetchCCMContacts({
        routeParams: {
          code: params.id,
        },
      });
      fetchRMBarChart({
        filterString: `donorGeographies=${params.id}`,
      });
      fetchAllocationsRadialChart({
        filterString: `geographies=${params.id}`,
      });
      fetchFundingRequestsTable({
        routeParams: {
          code: params.id,
        },
      });
      fetchEligibilityHeatmap({
        routeParams: {
          code: params.id,
        },
      });
      fetchDisbursementsLineChart({
        filterString: `geographies=${params.id}`,
      });
      fetchBudgetSankeyChart({
        filterString: `geographies=${params.id}`,
      });
      fetchExpendituresHeatmap({
        filterString: `geographies=${params.id}`,
        routeParams: {
          row: "principalRecipientType,principalRecipient",
          column: "component",
        },
      });
      fetchGrantsPieCharts({
        routeParams: {
          code: params.id,
        },
      });
      fetchResultStats({
        filterString: `geographies=${params.id}&cycle=${RESULT_YEARS[RESULT_YEARS.length - 1]}`,
      });
      fetchDocumentsTable({
        filterString: `types=Application&geographies=${params.id}`,
      });
      fetchResultsDocumentsTable({
        filterString: `types=Profile&geographies=${params.id}`,
      });
    }
  }, [params.id]);

  React.useEffect(() => {
    if (params.id) {
      fetchGrantsTable({
        filterString: `geographies=${params.id}`,
        routeParams: {
          page: grantsTablePage.toString(),
          pageSize: "10",
        },
      });
    }
  }, [params.id, grantsTablePage]);

  React.useEffect(() => {
    if (params.id) {
      fetchResultsTable({
        routeParams: {
          code: params.id,
          cycle: resultsYear,
        },
      });
    }
  }, [params.id, resultsYear]);

  React.useEffect(() => {
    return () => {
      clearOverview();
      clearCCMContacts();
      clearRMBarChart();
      clearAllocationsRadialChart();
      clearFundingRequestsTable();
      clearEligibilityHeatmap();
      clearDocumentsTable();
      clearDisbursementsLineChart();
      clearBudgetSanketChart();
      clearExpendituresHeatmap();
      clearGrantsPieCharts();
      clearGrantsTable();
      clearResultStats();
      clearResultsTable();
      clearResultsDocumentsTable();
    };
  }, []);

  const fullWidthDivider = (
    <Divider
      sx={{
        left: "-50vw",
        width: "200vw",
        position: "relative",
        borderTopColor: "#868E96",
      }}
    />
  );

  return (
    <Box padding="50px 0">
      <Typography variant="h1" lineHeight={1.2}>
        {dataOverview.name}
        {loading && <CircularProgress sx={{ marginLeft: "16px" }} />}
      </Typography>
      <Typography variant="h5" lineHeight={1} marginBottom="50px">
        {dataOverview.region}
      </Typography>
      {fullWidthDivider}
      <Box height="20px" />
      <DetailPageTabs
        tabs={LOCATION_TABS}
        activeTab={params.tab}
        baseRoute={`/location`}
      />
      <Box height="20px" />
      {fullWidthDivider}
      <Box marginTop="40px">{view}</Box>
    </Box>
  );
};
