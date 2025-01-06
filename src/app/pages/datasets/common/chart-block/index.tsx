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
import CircularProgress from "@mui/material/CircularProgress";
import { DatasetChartBlockProps } from "app/pages/datasets/common/chart-block/data";
import { ReactComponent as SettingsIcon } from "app/assets/vectors/Settings_ButtonIcon.svg";
import { ChartBlockButtonToolbar } from "app/components/chart-block/components/button-toolbar";
import { ChartSettings } from "app/components/chart-settings";
import {
  ChartSettingsBarProps,
  stacksDropdownItems,
  xAxisDropdownItems,
  yAxisDropdownItems,
} from "app/components/chart-settings/variations/bar/data";
import { rowsDropdownItems } from "app/components/chart-settings/variations/table/data";
import { ChartSettingsSortByOrderProps } from "app/components/chart-settings/sort-by/data";
import { treesDropdownItems } from "app/components/chart-settings/variations/treemap/data";
import { ChartSettingsLineProps } from "app/components/chart-settings/variations/line/data";

export const DatasetChartBlock: React.FC<DatasetChartBlockProps> = (
  props: DatasetChartBlockProps
) => {
  // const [collapsed, setCollapsed] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [settingsAnchorEl, setSettingsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  // const [isBarStacked, setIsBarStacked] = React.useState(true);
  // const [barXAxis, setBarXAxis] = React.useState(xAxisDropdownItems[4].value);
  // const [barYAxis, setBarYAxis] = React.useState(yAxisDropdownItems[4].value);
  // const [barStacks, setBarStacks] = React.useState(
  //   stacksDropdownItems[3].value
  // );
  // const [lineXAxis, setLineXAxis] = React.useState(xAxisDropdownItems[0].value);
  // const [lineYAxis, setLineYAxis] = React.useState(yAxisDropdownItems[4].value);
  const [tableRows, setTableRows] = React.useState(rowsDropdownItems[0].value);
  const [tableOrder, setTableOrder] =
    React.useState<ChartSettingsSortByOrderProps["order"]>(null);
  const [financialMetricBar, setFinancialMetricBar] = React.useState(
    xAxisDropdownItems[0].value
  );
  const [financialMetricsOrder, setFinancialMetricsOrder] =
    React.useState<ChartSettingsSortByOrderProps["order"]>(null);

  const [heatmapRows, setHeatmapRows] = React.useState(
    rowsDropdownItems[0].value
  );
  const [heatmapOrder, setHeatmapOrder] =
    React.useState<ChartSettingsSortByOrderProps["order"]>(null);
  const [heatmapBoxes, setHeatmapBoxes] = React.useState<
    "numerical" | "percentage"
  >("numerical");

  const [isTreemapNested, setIsTreemapNested] = React.useState(true);
  const [trees, setTrees] = React.useState(treesDropdownItems[0].value);
  const [treemapNestedContent, setTreemapNestedContent] = React.useState(
    treesDropdownItems[0].value
  );
  const handleResetTableOrder = () => {
    setTableOrder(null);
  };
  const handleResetFinancialMetricsOrder = () => {
    setFinancialMetricsOrder(null);
  };
  const handleResetHeatmapOrder = () => {
    setHeatmapOrder(null);
  };
  const handleFilterButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterPanelClose = () => {
    setAnchorEl(null);
  };
  const handleSettingsButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSettingsAnchorEl(event.currentTarget);
  };
  const handleSettingsPanelClose = () => {
    setSettingsAnchorEl(null);
  };

  // const handleCollapse = () => {
  //   setCollapsed(!collapsed);
  // };

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
          height="300px"
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
          minHeight="250px"
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

  const filterPopover = React.useMemo(() => {
    return (
      <Popover
        disableScrollLock
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        id={`filter-popover-${id}`}
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
    );
  }, [
    anchorEl,
    props.appliedFilters,
    props.filterGroups,
    props.appliedFiltersData,
    props.toggleFilter,
    props.removeFilter,
    props.handleResetFilters,
  ]);

  const settingsChartType = () => {
    switch (props.dropdownSelected) {
      case "Bar Chart":
        return "bar";
      case "Line Chart":
        return "line";
      case "Table View":
        return "table";
      case "Sankey Chart":
        return "sankey";
      case "Treemap":
        return "treemap";
      case "Heatmap":
        return "heatmap";
      case "financialMetrics":
        return "financialMetrics";
      default:
        return "bar";
    }
  };
  const settingsPopover = React.useMemo(() => {
    return (
      <Popover
        disableScrollLock
        anchorEl={settingsAnchorEl}
        open={Boolean(settingsAnchorEl)}
        id={`settings-popover-${id}`}
        onClose={handleSettingsPanelClose}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "right",
        // }}
        anchorPosition={{ top: 400, left: 200 }}
      >
        <ChartSettings
          handleSettingsPanelClose={handleSettingsPanelClose}
          chartType={settingsChartType()}
          reset={() => {}}
          barProps={
            {
              ...props.barProps,
            } as ChartSettingsBarProps
          }
          lineProps={
            {
              ...props.lineProps,
            } as ChartSettingsLineProps
          }
          tableProps={{
            rows: tableRows,
            setRows: setTableRows,
            onReset: handleResetTableOrder,
            order: tableOrder,
            setOrder: setTableOrder,
          }}
          heatmapProps={{
            rows: heatmapRows,
            setRows: setHeatmapRows,
            onReset: handleResetHeatmapOrder,
            order: heatmapOrder,
            setOrder: setHeatmapOrder,
            heatmapBoxes,
            setHeatmapBoxes,
          }}
          sankeyProps={{
            nodes: [],
            setNodes: () => {},
          }}
          treemapProps={{
            nested: isTreemapNested,
            setNested: setIsTreemapNested,
            nestedContent: treemapNestedContent,
            setNestedContent: setTreemapNestedContent,
            setTrees: setTrees,
            trees,
          }}
          financialMetricsSettingsProps={{
            barOption: financialMetricBar,
            setBarOption: setFinancialMetricBar,
          }}
          financialMetricsSortByProps={{
            order: financialMetricsOrder,
            setOrder: setFinancialMetricsOrder,
            onReset: handleResetFinancialMetricsOrder,
            secondary: true,
          }}
        />
      </Popover>
    );
  }, [
    settingsAnchorEl,
    props.dropdownSelected,
    props.barProps?.stacked,
    props.barProps?.xAxis,
    props.barProps?.yAxis,
    props.barProps?.stacks,
    props.lineProps?.xAxis,
    tableRows,
    tableOrder,
    heatmapRows,
    heatmapOrder,
    isTreemapNested,
    trees,
    treemapNestedContent,
    heatmapBoxes,
    financialMetricBar,
    financialMetricsOrder,
  ]);

  return (
    <Box id={props.id} data-cy="dataset-chart-block">
      <Typography variant="h3" lineHeight={1.2}>
        {props.title}
      </Typography>
      <Typography variant="body2">{props.subtitle}</Typography>
      <Divider
        sx={{
          margin: "20px 0",
          "@media (max-width: 767px)": {
            margin: "10px 0",
            borderColor: "#fff",
          },
        }}
      />
      <Box
        display="flex"
        marginBottom="40px"
        flexDirection="row"
        justifyContent="space-between"
        sx={{
          "@media (max-width: 767px)":
            props.extraDropdown && props.dropdownItems.length > 0
              ? {
                  gap: "16px",
                  marginBottom: 0,
                  flexDirection: "column",
                }
              : {},
        }}
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
          {filterPopover}
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            onClick={handleSettingsButtonClick}
          >
            Settings
          </Button>
          {settingsPopover}
          {/* <Button
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
          </Button> */}
        </Box>
        <Box gap="10px" display="flex" flexDirection="row">
          {props.extraDropdown}
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
      </Box>
      <Box
      // sx={{
      //   display: collapsed ? "none" : "block",
      // }}
      >
        <Box
          id={id}
          width="100%"
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
          <ChartBlockButtonToolbar
            blockId={id}
            hashId={props.id}
            infoType={props.infoType}
            chartType={props.dropdownSelected}
          />
        </Box>
      </Box>
    </Box>
  );
};
