import React from "react";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { GrantOverview } from "app/pages/grant/views/overview";
import { DetailPageTabs } from "app/components/detail-page-tabs";
import { splitStringInMiddle } from "app/utils/splitStringInMiddle";
import { GrantImplementation } from "app/pages/grant/views/grant-implementation";
import {
  GRANT_TABS,
  GRANT_DROPDOWN_ITEMS,
} from "app/components/detail-page-tabs/data";

export const Grant: React.FC = () => {
  const params = useParams<{ id: string; tab: string }>();

  const [dropdownSelected, setDropdownSelected] = React.useState(
    GRANT_DROPDOWN_ITEMS[0].value
  );

  const titleSplits = splitStringInMiddle(
    "Accelerated HIV Response Through Active Prevention, Linking To Care And Retention Interventions For PWID And Their Partners In Pakistan"
  );

  const handleDropdownChange = (value: string) => {
    setDropdownSelected(value);
  };

  const view = React.useMemo(() => {
    switch (params.tab) {
      case "overview":
        return <GrantOverview />;
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
        {params.id}
      </Typography>
      <Typography
        variant="h6"
        color="#CFD4DA"
        lineHeight={1.2}
        marginBottom="24px"
      >
        {titleSplits.map((s) => (
          <React.Fragment key={s}>
            {s}
            <br />
          </React.Fragment>
        ))}
      </Typography>
      <DetailPageTabs
        tabs={GRANT_TABS}
        baseRoute={`/grant`}
        activeTab={params.tab}
        dropdown={{
          dropdownSelected,
          handleDropdownChange,
          dropdownItems: GRANT_DROPDOWN_ITEMS,
        }}
      />
      <Box marginTop="24px">{view}</Box>
    </Box>
  );
};
