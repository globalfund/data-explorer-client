import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { DatasetPage } from "app/pages/datasets/common/page";
import {
  stats,
  geographyGroupingOptions,
  componentsGroupingOptions,
} from "app/pages/datasets/annual-results/data";

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
      </Box>
    </DatasetPage>
  );
};
