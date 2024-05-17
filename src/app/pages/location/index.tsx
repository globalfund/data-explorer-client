import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
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
  const fetchOverview = useStoreActions(
    (actions) => actions.GeographyOverview.fetch
  );
  const fetchCCMContacts = useStoreActions(
    (actions) => actions.GeographyOverviewCoordinatingMechanismsContacts.fetch
  );
  const loading = useStoreState(
    (state) =>
      state.GeographyOverview.loading ||
      state.GeographyOverviewCoordinatingMechanismsContacts.loading ||
      state.GeographyResourceMobilizationBarChart.loading ||
      state.GeographyAllocationsRadialChart.loading ||
      state.AccessToFundingFundingRequestsTable.loading ||
      state.GeographyEligibilityHeatmap.loading ||
      state.GeographyDocumentsTable.loading ||
      state.GeographyDisbursementsLineChart.loading ||
      state.GeographyBudgetSankeyChart.loading ||
      state.GeographyExpendituresHeatmap.loading ||
      state.GeographyGrantsPieCharts.loading ||
      state.GeographyGrantsTable.loading ||
      state.GeographyResultStats.loading ||
      state.GeographyResultsTable.loading
  );
  const fetchRMBarChart = useStoreActions(
    (actions) => actions.GeographyResourceMobilizationBarChart.fetch
  );
  const fetchAllocationsRadialChart = useStoreActions(
    (actions) => actions.GeographyAllocationsRadialChart.fetch
  );
  const fetchFundingRequestsTable = useStoreActions(
    (actions) => actions.GeographyFundingRequestsTable.fetch
  );
  const fetchEligibilityHeatmap = useStoreActions(
    (actions) => actions.GeographyEligibilityHeatmap.fetch
  );
  const fetchDocumentsTable = useStoreActions(
    (actions) => actions.GeographyDocumentsTable.fetch
  );
  const fetchDisbursementsLineChart = useStoreActions(
    (actions) => actions.GeographyDisbursementsLineChart.fetch
  );
  const fetchBudgetSanketChart = useStoreActions(
    (actions) => actions.GeographyBudgetSankeyChart.fetch
  );
  const fetchExpendituresHeatmap = useStoreActions(
    (actions) => actions.GeographyExpendituresHeatmap.fetch
  );
  const fetchGrantsPieCharts = useStoreActions(
    (actions) => actions.GeographyGrantsPieCharts.fetch
  );
  const fetchGrantsTable = useStoreActions(
    (actions) => actions.GeographyGrantsTable.fetch
  );
  const fetchResultStats = useStoreActions(
    (actions) => actions.GeographyResultStats.fetch
  );
  const fetchResultsTable = useStoreActions(
    (actions) => actions.GeographyResultsTable.fetch
  );
  const fetchResultsDocumentsTable = useStoreActions(
    (actions) => actions.GeographyResultsDocumentsTable.fetch
  );

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
        filterString: `donorGeography=${params.id}`,
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
      fetchBudgetSanketChart({
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

  return (
    <Box padding="60px 0">
      <Typography variant="h1" lineHeight={1}>
        {dataOverview.name}
        {loading && <CircularProgress sx={{ marginLeft: "16px" }} />}
      </Typography>
      <Typography
        variant="h6"
        color="#CFD4DA"
        lineHeight={1.2}
        marginBottom="24px"
      >
        {dataOverview.region}
      </Typography>
      <DetailPageTabs
        tabs={LOCATION_TABS}
        activeTab={params.tab}
        baseRoute={`/location`}
      />
      <Box marginTop="40px">{view}</Box>
    </Box>
  );
};
