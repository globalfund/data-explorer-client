import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { useTitle } from "react-use";
import { useParams } from "react-router-dom";
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

  useTitle(`The Data Explorer - ${params.id} Targets & Results`);

  const [tab, setTab] = React.useState(TABS[0]);

  const dataTable = useStoreState((state) =>
    get(state.GrantTargetsResultsTable, "data.data", [])
  );
  const years = useStoreState((state) =>
    get(state.GrantTargetsResultsTable, "data.years", [])
  );
  const dates = useStoreState((state) =>
    get(state.GrantTargetsResultsTable, "data.dates", [])
  );
  const loading = useStoreState(
    (state) => state.GrantTargetsResultsTable.loading
  );
  const fetchTable = useStoreActions(
    (actions) => actions.GrantTargetsResultsTable.fetch
  );

  const handleTabChange = (value: string) => {
    setTab(TABS.find((t) => t.name === value) || TABS[0]);
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
          const tableEl = document.createElement("div");
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
        minWidth: 250,
      });
    });
    if (years.length === 0) {
      dates.forEach((date) => {
        res.push({
          title: date,
          field: date,
          formatter: (cell: CellComponent) => {
            const tableEl = document.createElement("div");
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
          minWidth: 250,
        });
      });
    }
    res[0].title = tab.name;
    return res;
  }, [tab, years]);

  return (
    <Box marginTop="24px">
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
        infoType="global"
      >
        <Box width="100%" height="32px" />
        <TableContainer
          dataTree
          data={dataTable}
          columns={columns}
          dataTreeStartExpanded
          noColumnVisibilitySelection
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
