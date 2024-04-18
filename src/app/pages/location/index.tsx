import React from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Results } from "app/pages/location/views/results";
import { DetailPageTabs } from "app/components/detail-page-tabs";
import { LocationOverview } from "app/pages/location/views/overview";
import { LOCATION_TABS } from "app/components/detail-page-tabs/data";
import { AccessToFunding } from "app/pages/location/views/access-to-funding";
import { GrantImplementation } from "app/pages/location/views/grant-implementation";
import { ResourceMobilization } from "app/pages/location/views/resource-mobilization";

export const Location: React.FC = () => {
  const params = useParams<{ id: string; tab: string }>();

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

  return (
    <Box padding="60px 0">
      <Typography variant="h1" lineHeight={1}>
        Kenya
      </Typography>
      <Typography
        variant="h6"
        color="#CFD4DA"
        lineHeight={1.2}
        marginBottom="24px"
      >
        Eastern Africa
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
