import React from "react";
import Box from "@mui/material/Box";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import CircularProgress from "@mui/material/CircularProgress";
import { DatasetChartBlockProps } from "app/pages/datasets/common/chart-block/data";
import { ReactComponent as CollpaseIcon } from "app/assets/vectors/Collpase_ButtonIcon.svg";
import { ReactComponent as SettingsIcon } from "app/assets/vectors/Settings_ButtonIcon.svg";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";

export const DatasetChartBlock: React.FC<DatasetChartBlockProps> = (
  props: DatasetChartBlockProps
) => {
  const content = React.useMemo(() => {
    if (props.loading) {
      return (
        <Box
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      );
    }
    if (props.empty) {
      return (
        <Box
          width="100%"
          height="100%"
          display="flex"
          minHeight="400px"
          alignItems="center"
          justifyContent="center"
        >
          <Typography>No data available</Typography>
        </Box>
      );
    }
    return props.children;
  }, [props.children, props.loading, props.empty]);

  return (
    <Box>
      <Typography variant="h3" lineHeight={1.2}>
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
          <Button
            variant="outlined"
            startIcon={<CollpaseIcon />}
            sx={
              props.disableCollapse
                ? { pointerEvents: "none", opacity: 0.4 }
                : {}
            }
          >
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
      <Box
        id="content"
        width="100%"
        minHeight="400px"
        padding="0 32px"
        position="relative"
        sx={
          props.loading
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {}
        }
      >
        {content}
      </Box>
      <Box width="100%" paddingRight="32px" marginTop="40px">
        <ChartBlockButtonToolbar />
      </Box>
    </Box>
  );
};
