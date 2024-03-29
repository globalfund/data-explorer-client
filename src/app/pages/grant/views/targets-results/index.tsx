import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChartBlock } from "app/components/chart-block";
import { TableContainer } from "app/components/table-container";
import { TABS } from "app/pages/grant/views/targets-results/data";
import {
  TABLE_VARIATION_4_DATA,
  TABLE_VARIATION_4_COLUMNS,
} from "app/components/table/data";

export const GrantTargetsResults: React.FC = () => {
  const [tab, setTab] = React.useState(TABS[0]);

  return (
    <Box marginTop="24px">
      <Typography variant="body2" marginBottom="64px">
        This page provides an overview of the IATI ('open') data currently
        published by individual Grand Bargain signatories and/or their
        affiliated organisations. Its primary purpose is to enable signatories
        to monitor their own progress in relation to meeting the data
        publication commitment of the Grand Bargain.This page provides an
        overview of the IATI ('open') data currently published by individual
        Grand Bargain signatories and/or their affiliated organisations. Its
        primary purpose is to enable signatories to monitor
        <br />
        <br />
        their own progress in relation to meeting the data publication
        commitment of the Grand Bargain.This page provides an overview of the
        IATI ('open') data currently published by individual Grand Bargain
        signatories and/or their affiliated organisations. Its primary purpose
        is to enable signatories to monitor their own progress in relation to
        meeting the data publication commitment of the Grand Bargain.
      </Typography>
      <ChartBlock
        noBottomToolbar
        title="Indicators"
        subtitle="Targets & Results"
        text="Description of Impact indicators: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
      >
        <Box width="100%" height="32px" />
        <TableContainer
          dataTree
          dataTreeStartExpanded
          data={TABLE_VARIATION_4_DATA}
          id="grant-targets-results-table"
          columns={TABLE_VARIATION_4_COLUMNS}
          tabsView={{
            tabs: TABS,
            selectedTab: tab,
            onTabChange: setTab,
          }}
        />
      </ChartBlock>
    </Box>
  );
};
