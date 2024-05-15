import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Results } from "app/pages/location/views/results";
import CircularProgress from "@mui/material/CircularProgress";
import { DetailPageTabs } from "app/components/detail-page-tabs";
import { LocationOverview } from "app/pages/location/views/overview";
import { LOCATION_TABS } from "app/components/detail-page-tabs/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { AccessToFunding } from "app/pages/location/views/access-to-funding";
import { GrantImplementation } from "app/pages/location/views/grant-implementation";
import { ResourceMobilization } from "app/pages/location/views/resource-mobilization";

export const Location: React.FC = () => {
  const params = useParams<{ id: string; tab: string }>();

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
      state.GeographyEligibilityHeatmap.loading
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

  const view = React.useMemo(() => {
    switch (params.tab) {
      case "overview":
        return <LocationOverview />;
      case "financial-insights":
        return <GrantImplementation />;
      case "resource-mobilization":
        return <ResourceMobilization />;
      case "access-to-funding":
        return <AccessToFunding />;
      case "results":
        return <Results />;
      default:
        return <div />;
    }
  }, [params.tab]);

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
    }
  }, [params.id]);

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
