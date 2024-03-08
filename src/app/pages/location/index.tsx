import React from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { DetailPageTabs } from "app/components/detail-page-tabs";
import { LocationOverview } from "app/pages/location/views/overview";
import { LOCATION_TABS } from "app/components/detail-page-tabs/data";
import { GrantImplementation } from "app/pages/location/views/grant-implementation";

export const Location: React.FC = () => {
  const params = useParams<{ id: string; tab: string }>();

  const view = React.useMemo(() => {
    switch (params.tab) {
      case "overview":
        return <LocationOverview />;
      case "grant-implementation":
        return <GrantImplementation />;
      case "targets-results":
        return <div>Targets & Results</div>;
      case "documents":
        return <div>Documents</div>;
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
        baseRoute={`/grant`}
        activeTab={params.tab}
      />
      <Box marginTop="24px">{view}</Box>
    </Box>
  );
};
