import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { Table } from "app/components/table";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import Info from "@mui/icons-material/InfoOutlined";
import { DatasetPage } from "app/pages/datasets/common/page";
import { BarSeriesChart } from "app/components/charts/bar-series";
import { getRange } from "app/utils/getFinancialValueWithMetricPrefix";
import { DatasetChartBlock } from "app/pages/datasets/common/chart-block";
import {
  FullWidthDivider,
  geographyGroupingOptions,
  componentsGroupingOptions,
  dropdownItemsDisbursements,
} from "app/pages/datasets/grant-implementation/data";

export const GrantImplementationPage: React.FC = () => {
  const [geographyGrouping, setGeographyGrouping] = React.useState(
    geographyGroupingOptions[0].value
  );
  const [componentsGrouping, setComponentsGrouping] = React.useState(
    componentsGroupingOptions[0].value
  );

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

  return (
    <DatasetPage
      title="Financial Insights"
      subtitle="See the disbursements, budgets and expenditures datasets and relating insights."
      breadcrumbs={[{ label: "Datasets" }, { label: "Financial Insights" }]}
      toolbarRightContent={toolbarRightContent}
    >
      <Box width="100%" marginTop="50px"></Box>
    </DatasetPage>
  );
};
