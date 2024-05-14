import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { DatasetPage } from "app/pages/datasets/common/page";
import { PolylineTree } from "app/components/charts/polyline-tree";
import { TABLE_VARIATION_9_COLUMNS } from "app/components/table/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { applyResultValueFormula } from "app/utils/applyResultValueFormula";
import { PolylineTreeDataItem } from "app/components/charts/polyline-tree/data";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { ReactComponent as BarChartIcon } from "app/assets/vectors/Select_BarChart.svg";
import {
  statsOrder,
  geographyGroupingOptions,
  componentsGroupingOptions,
} from "app/pages/datasets/annual-results/data";

const dropdownItems = [
  { label: "Polyline Tree", value: "Polyline Tree", icon: <BarChartIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

const StatComp: React.FC<{
  label: string;
  value: number;
}> = (props: { label: string; value: number }) => {
  const value = applyResultValueFormula(props.value, 3);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Typography fontSize="10px">Annual Results</Typography>
      <Typography variant="h5" fontWeight="700">
        {value.number} {value.text}
      </Typography>
      <Typography variant="body2" fontWeight="700">
        {props.label}
      </Typography>
    </Box>
  );
};

export const AnnualResultsPage: React.FC = () => {
  const [dropdownSelected, setDropdownSelected] = React.useState(
    dropdownItems[0].value
  );
  const [geographyGrouping, setGeographyGrouping] = React.useState(
    geographyGroupingOptions[0].value
  );
  const [componentsGrouping, setComponentsGrouping] = React.useState(
    componentsGroupingOptions[0].value
  );

  const dataStats = useStoreState(
    (state) =>
      get(state.AnnualResultsStats, "data.stats", []) as {
        label: string;
        value: number;
      }[]
  );
  const fetchStats = useStoreActions(
    (actions) => actions.AnnualResultsStats.fetch
  );
  const dataPolyline = useStoreState(
    (state) =>
      get(state.AnnualResultsPolyline, "data.data", {
        name: "",
      }) as PolylineTreeDataItem
  );
  const fetchPolyline = useStoreActions(
    (actions) => actions.AnnualResultsPolyline.fetch
  );
  const dataTable = useStoreState(
    (state) =>
      get(state.AnnualResultsTable, "data.data", []) as {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | object
          | Array<object>;
      }[]
  );
  const fetchTable = useStoreActions(
    (actions) => actions.AnnualResultsTable.fetch
  );
  const loadingResults = useStoreState((state) => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return state.AnnualResultsPolyline.loading;
      case dropdownItems[1].value:
        return state.AnnualResultsTable.loading;
      default:
        return false;
    }
  });

  const handleSelectionChange = (value: string) => {
    setDropdownSelected(value);
  };

  const handleGeographyGroupingChange = (value: string) => {
    setGeographyGrouping(value);
  };

  const handleComponentsGroupingChange = (value: string) => {
    setComponentsGrouping(value);
  };

  const toolbarRightContent = React.useMemo(() => {
    return (
      <Box gap="20px" display="flex" flexDirection="row" alignItems="center">
        <Box gap="10px" display="flex" flexDirection="row" alignItems="center">
          <Typography variant="body2" fontWeight="700">
            Geography grouping
          </Typography>
          <Dropdown
            width={150}
            dropdownSelected={geographyGrouping}
            dropdownItems={geographyGroupingOptions}
            handleDropdownChange={handleGeographyGroupingChange}
          />
        </Box>
        <Box gap="10px" display="flex" flexDirection="row" alignItems="center">
          <Typography variant="body2" fontWeight="700">
            Components grouping
          </Typography>
          <Dropdown
            width={120}
            dropdownSelected={componentsGrouping}
            dropdownItems={componentsGroupingOptions}
            handleDropdownChange={handleComponentsGroupingChange}
          />
        </Box>
      </Box>
    );
  }, []);

  const chartContent = React.useMemo(() => {
    switch (dropdownSelected) {
      case dropdownItems[0].value:
        return <PolylineTree data={dataPolyline} />;
      case dropdownItems[1].value:
        return (
          <Table
            dataTree
            data={dataTable}
            dataTreeStartExpanded
            id="annual-results-table"
            columns={TABLE_VARIATION_9_COLUMNS}
          />
        );
      default:
        return null;
    }
  }, [dropdownSelected, dataPolyline, dataTable]);

  React.useEffect(() => {
    fetchStats({
      filterString: "cycle=2022",
    });
    fetchPolyline({
      routeParams: {
        cycle: "2022",
      },
    });
    fetchTable({});
  }, []);

  return (
    <DatasetPage
      title="Annual Results"
      subtitle="Indicator results reported as part of annual Results Report."
      breadcrumbs={[{ label: "Datasets" }, { label: "Annual Results" }]}
      toolbarRightContent={toolbarRightContent}
    >
      <Box width="100%" marginTop="50px">
        <Box
          width="100%"
          display="flex"
          marginBottom="50px"
          flexDirection="row"
          justifyContent="space-between"
        >
          {statsOrder.map((o) => {
            const stat = dataStats.find((s) => s.label.includes(o));
            return stat ? (
              <StatComp
                key={stat.label}
                label={stat.label}
                value={stat.value}
              />
            ) : null;
          })}
        </Box>
        <Divider
          sx={{
            left: 0,
            width: "100vw",
            position: "absolute",
            borderColor: "#CFD4DA",
          }}
        />
        <Box
          paddingTop="50px"
          sx={{
            "#content": {
              padding: 0,
            },
          }}
        >
          <DatasetChartBlock
            title="Annual Results"
            subtitle="Lorem Ipsum."
            loading={loadingResults}
            dropdownItems={dropdownItems}
            dropdownSelected={dropdownSelected}
            handleDropdownChange={handleSelectionChange}
            disableCollapse={dropdownSelected === dropdownItems[1].value}
          >
            {chartContent}
          </DatasetChartBlock>
        </Box>
      </Box>
    </DatasetPage>
  );
};
