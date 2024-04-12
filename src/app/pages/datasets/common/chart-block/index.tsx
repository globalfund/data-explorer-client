import React from "react";
import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { DatasetChartBlockProps } from "app/pages/datasets/common/chart-block/data";
import { ReactComponent as CollpaseIcon } from "app/assets/vectors/Collpase_ButtonIcon.svg";
import { ReactComponent as SettingsIcon } from "app/assets/vectors/Settings_ButtonIcon.svg";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";

export const DatasetChartBlock: React.FC<DatasetChartBlockProps> = (
  props: DatasetChartBlockProps
) => {
  return (
    <Box>
      <Typography variant="h3" lineHeight={1}>
        {props.title}
      </Typography>
      <Typography variant="body2">{props.subtitle}</Typography>
      <Divider
        sx={{
          margin: "20px 0",
        }}
      />
      <Box
        display="flex"
        marginBottom="40px"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Box gap="10px" display="flex" flexDirection="row">
          <Button variant="outlined" startIcon={<Add fontSize="small" />}>
            Filters
          </Button>
          <Button variant="outlined" startIcon={<SettingsIcon />}>
            Settings
          </Button>
          <Button variant="outlined" startIcon={<CollpaseIcon />}>
            Collapse
          </Button>
        </Box>
        {props.dropdownItems &&
          props.dropdownSelected &&
          props.handleDropdownChange && (
            <Dropdown
              dropdownItems={props.dropdownItems}
              dropdownSelected={props.dropdownSelected}
              handleDropdownChange={props.handleDropdownChange}
            />
          )}
      </Box>
      <Box width="100%" minHeight="400px" padding="0 32px" position="relative">
        {props.children}
      </Box>
      <Box width="100%" paddingRight="32px" marginTop="40px">
        <ChartBlockButtonToolbar />
      </Box>
    </Box>
  );
};
