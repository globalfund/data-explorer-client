import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { ChartBlock } from "app/components/chart-block";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import { CellComponent, Tabulator } from "tabulator-tables";
import { TableContainer } from "app/components/table-container";
import { TABS } from "app/pages/grant/views/targets-results/data";
import { TABLE_VARIATION_4_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { useCMSData } from "app/hooks/useCMSData";

export const GrantTargetsResults: React.FC = () => {
  const cmsData = useCMSData({ returnData: true });
  const params = useParams<{ id: string; ip: string }>();

  const [tab, setTab] = React.useState(TABS[0]);

  const dataTable = useStoreState((state) =>
    get(state.GrantTargetsResultsTable, "data.data", [])
  );
  const years = useStoreState((state) =>
    get(state.GrantTargetsResultsTable, "data.years", [])
  );
  const loading = useStoreState(
    (state) => state.GrantTargetsResultsTable.loading
  );
  const fetchTable = useStoreActions(
    (actions) => actions.GrantTargetsResultsTable.fetch
  );

  const handleTabChange = (tab: string) => {
    setTab(TABS.find((t) => t.name === tab) || TABS[0]);
  };

  useUpdateEffect(() => {
    if (params.id && params.ip) {
      fetchTable({
        routeParams: {
          code: params.id,
          ip: params.ip.toString(),
        },
        filterString: `type=${tab.value}`,
      });
    }
  }, [params.id, params.ip, tab]);

  const columns = React.useMemo(() => {
    let res = TABLE_VARIATION_4_COLUMNS.slice(0, 5);
    years.forEach((year) => {
      res.push({
        title: year,
        field: year,
        formatter: (cell: CellComponent) => {
          var tableEl = document.createElement("div");
          cell.getElement().appendChild(tableEl);
          const data = cell.getValue();

          if (!cell.getValue()) {
            return "";
          }

          new Tabulator(tableEl, {
            data,
            layout: "fitDataTable",
            height: "fit-content",
            columns: [
              { title: "Target", field: "target" },
              { title: "Result", field: "result" },
              { title: "Achievement", field: "achievement" },
            ],
          });

          // cell.getElement().style.height = "max-content";
          cell.getElement().style.padding = "0";

          return tableEl;
        },
      });
    });
    return res;
  }, [years]);

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
    <Box marginTop="24px">
      <Typography
        variant="body2"
        dangerouslySetInnerHTML={{
          __html: get(
            cmsData,
            "pagesGrantTargetResults.description",
            `This page provides an overview of the IATI ('open') data currently
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
        meeting the data publication commitment of the Grand Bargain.`
          ),
        }}
      />
      <Box height="50px" />
      {fullWidthDivider}
      <Box height="50px" />
      <ChartBlock
        loading={loading}
        title={get(cmsData, "pagesGrantTargetResults.title", "Indicators")}
        id="grant-targets-results"
        subtitle={get(
          cmsData,
          "pagesGrantTargetResults.subtitle",
          "Targets & Results"
        )}
        text={get(
          cmsData,
          "pagesGrantTargetResults.text",
          "Description of Impact indicators: We unite the world to find solutions that have the most impact, and we take them to scale worldwide. It’s working. We won’t stop until the job is finished."
        )}
      >
        <Box width="100%" height="32px" />
        <TableContainer
          dataTree
          data={dataTable}
          columns={columns}
          dataTreeStartExpanded
          id="grant-targets-results-table"
          tabsView={{
            tabs: TABS.map((t) => t.name),
            selectedTab: tab.name,
            onTabChange: handleTabChange,
          }}
        />
      </ChartBlock>
      <Box height="40px" />
    </Box>
  );
};
