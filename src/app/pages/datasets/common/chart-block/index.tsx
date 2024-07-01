import React from "react";
import Box from "@mui/material/Box";
import uniqueId from "lodash/uniqueId";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Dropdown } from "app/components/dropdown";
import { FilterPanel } from "app/components/filters/panel";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import CircularProgress from "@mui/material/CircularProgress";
import { DatasetChartBlockProps } from "app/pages/datasets/common/chart-block/data";
import { ReactComponent as CollapseIcon } from "app/assets/vectors/Collapse_ButtonIcon.svg";
import { ReactComponent as SettingsIcon } from "app/assets/vectors/Settings_ButtonIcon.svg";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";

export const DatasetChartBlock: React.FC<DatasetChartBlockProps> = (
  props: DatasetChartBlockProps
) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterPanelClose = () => {
    setAnchorEl(null);
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onScroll = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  const id = React.useMemo(() => uniqueId("chart-block-"), []);

  return (
    <Box id={props.id} data-cy="dataset-chart-block">
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
          <Button
            variant="outlined"
            startIcon={<Add fontSize="small" />}
            onClick={handleFilterButtonClick}
            sx={
              props.appliedFilters.length > 0
                ? {
                    "&:after": {
                      top: "-3px",
                      right: "8px",
                      width: "6px",
                      height: "6px",
                      content: "''",
                      borderRadius: "50%",
                      position: "absolute",
                      background: "#2196F3",
                    },
                  }
                : {}
            }
          >
            Filters
          </Button>
          <Popover
            disableScrollLock
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleFilterPanelClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <FilterPanel
              onClose={handleFilterPanelClose}
              filterGroups={props.filterGroups}
              toggleFilter={props.toggleFilter}
              removeFilter={props.removeFilter}
              appliedFilters={props.appliedFilters}
              handleResetFilters={props.handleResetFilters}
              appliedFiltersData={props.appliedFiltersData}
              appliedFilterBgColors={{
                hover: "#2196F3",
                normal: "rgba(33, 150, 243, 0.2)",
              }}
            />
          </Popover>
          <Button variant="outlined" startIcon={<SettingsIcon />}>
            Settings
          </Button>
          <Button
            variant="outlined"
            onClick={handleCollapse}
            startIcon={collapsed ? <UnfoldMoreIcon /> : <CollapseIcon />}
            sx={
              props.disableCollapse
                ? { pointerEvents: "none", opacity: 0.4 }
                : {}
            }
          >
            {collapsed ? "Expand" : "Collapse"}
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
        sx={{
          display: collapsed ? "none" : "block",
        }}
      >
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
        <Box width="100%" marginTop="40px">
          <ChartBlockButtonToolbar blockId={id} hashId={props.id} />
        </Box>
      </Box>
    </Box>
  );
};
