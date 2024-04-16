import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { DatasetPage } from "app/pages/datasets/common/page";
import { PolylineTree } from "app/components/charts/polyline-tree";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { ReactComponent as BarChartIcon } from "app/assets/vectors/Select_BarChart.svg";
import { STORY_DATA_VARIANT_1 as POLYLINE_TREE_DATA } from "app/components/charts/polyline-tree/data";
import {
  stats,
  geographyGroupingOptions,
  componentsGroupingOptions,
} from "app/pages/datasets/annual-results/data";

const dropdownItems = [
  { label: "Polyline Tree", value: "Polyline Tree", icon: <BarChartIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

const StatComp: React.FC<{
  label: string;
  value: number | string;
}> = (props: { label: string; value: number | string }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
    >
      <Typography fontSize="10px">Annual Results</Typography>
      <Typography variant="h5" fontWeight="700">
        {props.value}
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
        return <PolylineTree data={POLYLINE_TREE_DATA} />;
      case dropdownItems[1].value:
      // return (
      //   <Table
      //     dataTree
      //     id="pledges-contributions-table"
      //     data={TABLE_VARIATION_8_DATA}
      //     columns={TABLE_VARIATION_8_COLUMNS}
      //   />
      // );
      default:
        return null;
    }
  }, [dropdownSelected]);

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
          {stats.map((stat) => (
            <StatComp key={stat.label} label={stat.label} value={stat.value} />
          ))}
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
