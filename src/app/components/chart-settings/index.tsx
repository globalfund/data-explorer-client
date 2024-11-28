import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Refresh from "@mui/icons-material/Refresh";
import { ChartSettingsProps } from "app/components/chart-settings/data";
import { ChartSettingsBar } from "app/components/chart-settings/variations/bar";
import { ChartSettingsLine } from "app/components/chart-settings/variations/line";
import { ChartSettingsTreemap } from "app/components/chart-settings/variations/treemap";
import { ReactComponent as TitleIcon } from "app/assets/vectors/ChartSettingsTitleIcon.svg";
import CloseIcon from "@mui/icons-material/Close";
import { ChartSettingsSortByItem } from "app/components/chart-settings/sort-by/data";
import { ChartSettingsTable } from "./variations/table";
import { ItemInterface } from "react-sortablejs";
import BarOrderContent from "./variations/bar/orderContent";
import TableOrderContent from "./variations/table/orderContent";
import IconButton from "@mui/material/IconButton";
import { ChartSettingsSankey } from "./variations/sankey";
import SankeyOrderContent from "./variations/sankey/orderContent";
import HeatmapOrderContent from "./variations/heatmap/orderContent";
import { ChartSettingsHeatmap } from "./variations/heatmap";
import HeatmapBoxesSwitch from "./variations/heatmap/boxesSwitch";

export const ChartSettings: React.FC<ChartSettingsProps> = (
  props: ChartSettingsProps
) => {
  const [sortByBarItems, setSortByBarItems] = React.useState<
    ChartSettingsSortByItem[]
  >([]);
  const [sortByBarTempItems, setSortByBarTempItems] = React.useState<
    ChartSettingsSortByItem[]
  >([]);

  const [sortByTableColumnItems, setSortByTableColumnItems] = React.useState<
    ItemInterface[]
  >([]);

  const [sortByHeatmapColumnItems, setSortByHeatmapColumnItems] =
    React.useState<ItemInterface[]>([]);
  const [sortBySankeyNodes, setSortBySankeyNodes] = React.useState<
    ItemInterface[]
  >([]);

  const [sortSankeyNodesByOrder, setSortSankeyNodesByOrder] = React.useState<
    ChartSettingsSortByItem[]
  >([]);

  const [sortSankeyNodesByOrderTemp, setSortSankeyNodesByOrderTemp] =
    React.useState<ChartSettingsSortByItem[]>([]);

  const onReset = () => {
    props.reset();
    setSortByBarItems([]);
    setSortByBarTempItems([]);
  };

  const settingsContent = React.useMemo(() => {
    switch (props.chartType) {
      case "bar":
      case "expandable-bar":
        if (!props.barProps) return null;
        return <ChartSettingsBar {...props.barProps} />;
      case "line":
        if (!props.lineProps) return null;
        return <ChartSettingsLine {...props.lineProps} />;
      case "treemap":
        if (!props.treemapProps) return null;
        return <ChartSettingsTreemap {...props.treemapProps} />;
      case "table":
        if (!props.tableProps) return null;
        return <ChartSettingsTable {...props.tableProps} />;
      case "heatmap":
        if (!props.heatmapProps) return null;
        return <ChartSettingsHeatmap {...props.heatmapProps} />;
      case "financialMetrics":
        if (!props.barProps) return null;
        return <ChartSettingsBar {...props.barProps} financialMetrics={true} />;

      case "sankey":
        if (!props.sankeyProps) return null;
        return (
          <ChartSettingsSankey
            {...props.sankeyProps}
            nodes={sortBySankeyNodes.map((node) => ({
              ...node,
              name: node.value,
            }))}
            setNodes={setSortBySankeyNodes}
          />
        );
      default:
        return null;
    }
  }, [
    props.chartType,
    props.barProps,
    props.lineProps,
    props.treemapProps,
    props.sankeyProps,
    sortBySankeyNodes,
  ]);

  const orderContent = React.useMemo(() => {
    switch (props.chartType) {
      case "bar":
        return (
          <BarOrderContent
            setSortByItems={setSortByBarItems}
            setSortByTempItems={setSortByBarTempItems}
            sortByItems={sortByBarItems}
            sortByTempItems={sortByBarTempItems}
          />
        );
      case "table":
        return (
          <TableOrderContent
            setSortByTableColumnItems={setSortByTableColumnItems}
            sortByTableColumnItems={sortByTableColumnItems}
          />
        );
      case "heatmap":
        return (
          <HeatmapOrderContent
            setSortByHeatmapColumnItems={setSortByHeatmapColumnItems}
            sortByHeatmapColumnItems={sortByHeatmapColumnItems}
          />
        );
      case "line":
      case "sankey":
        return (
          <SankeyOrderContent
            setSortByItems={setSortSankeyNodesByOrder}
            setSortByTempItems={setSortSankeyNodesByOrderTemp}
            sortByItems={sortSankeyNodesByOrder}
            sortByTempItems={sortSankeyNodesByOrderTemp}
          />
        );
      case "financialMetrics":
        return (
          <BarOrderContent
            setSortByItems={setSortByBarItems}
            setSortByTempItems={setSortByBarTempItems}
            sortByItems={sortByBarItems}
            sortByTempItems={sortByBarTempItems}
          />
        );
      case "treemap":
        return <div></div>;
      default:
        return null;
    }
  }, [
    props.chartType,
    sortByBarTempItems,
    sortByTableColumnItems,
    sortByBarItems,
    sortSankeyNodesByOrder,
    sortSankeyNodesByOrderTemp,
    sortByHeatmapColumnItems,
  ]);

  const showSortOrder =
    props.chartType !== "line" && props.chartType !== "treemap";

  return (
    <Box
      sx={{
        padding: "0 12px",
        borderRadius: "4px",
        border: `1px solid ${colors.secondary[200]}`,
        width: "1143px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "3px 0",
          alignItems: "center",
          borderBottom: `1px solid ${colors.secondary[600]}`,
        }}
      >
        <Box
          sx={{
            gap: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TitleIcon />
          <Typography fontSize="14px">Settings</Typography>
        </Box>
        <IconButton disableRipple onClick={props.handleSettingsPanelClose}>
          <CloseIcon htmlColor="#373D43" fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          padding: "10px 0 20px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography fontSize="14px" marginBottom="15px">
            Customise what you see in this chart.
          </Typography>
          <Button
            onClick={onReset}
            variant="outlined"
            sx={{
              fontSize: "12px",
              maxHeight: "26px",
              lineHeight: "1.5",
              padding: "2px 12px",
            }}
            startIcon={
              <Refresh
                fontSize="small"
                sx={{
                  transform: "rotate(-180deg)",
                }}
              />
            }
          >
            Reset Settings
          </Button>
        </Box>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm={showSortOrder ? 6 : 10}
            lg={props.chartType == "heatmap" ? 4 : showSortOrder ? 6 : 10}
            position="relative"
          >
            {settingsContent}
            {showSortOrder && (
              <Divider
                orientation="vertical"
                sx={{
                  top: 16,
                  right: 0,
                  position: "absolute",
                  height: "calc(100% - 16px)",
                  width: "1px",
                  display: "flex",
                  flexShrink: 0,
                  background: colors.secondary[600],
                }}
              />
            )}
          </Grid>
          {showSortOrder && (
            <Grid
              item
              xs={12}
              sm={4}
              lg={props.chartType === "heatmap" ? 4 : "auto"}
              position="relative"
            >
              {orderContent}
            </Grid>
          )}
          {props.chartType === "heatmap" && props.heatmapProps && (
            <Grid item xs={12} sm={4} lg={4} position={"relative"}>
              <Divider
                orientation="vertical"
                sx={{
                  top: 16,
                  left: 0,
                  position: "absolute",
                  height: "calc(100% - 16px)",
                  width: "1px",
                  display: "flex",
                  flexShrink: 0,
                  background: colors.secondary[600],
                }}
              />
              {props.heatmapProps.setHeatmapBoxes &&
              props.heatmapProps?.heatmapBoxes ? (
                <HeatmapBoxesSwitch
                  boxType={props.heatmapProps?.heatmapBoxes}
                  setBoxType={props.heatmapProps.setHeatmapBoxes}
                />
              ) : (
                <div></div>
              )}
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};
