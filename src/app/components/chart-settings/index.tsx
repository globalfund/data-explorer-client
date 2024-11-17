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

import {
  ChartSettingsSortByItem,
  ChartSettingsSortByItems,
} from "app/components/chart-settings/sort-by/data";
import { ChartSettingsTable } from "./variations/table";
import { ItemInterface } from "react-sortablejs";
import BarOrderContent from "./variations/bar/orderContent";
import TableOrderContent from "./variations/table/orderContent";
import IconButton from "@mui/material/IconButton";
import { ChartSettingsSankey } from "./variations/sankey";

export const ChartSettings: React.FC<ChartSettingsProps> = (
  props: ChartSettingsProps
) => {
  const [sortByItems, setSortByItems] = React.useState<
    ChartSettingsSortByItem[]
  >([]);
  const [sortByTempItems, setSortByTempItems] = React.useState<
    ChartSettingsSortByItem[]
  >([]);

  const [sortByTableColumnItems, setSortByTableColumnItems] = React.useState<
    ItemInterface[]
  >([]);
  const [sortBySankeyNodes, setSortBySankeyNodes] = React.useState<
    ItemInterface[]
  >([]);

  // const pool = React.useMemo(() => {
  //   return ChartSettingsSortByItems.map((item) => ({
  //     ...item,
  //     name: item.name,
  //     disabled: sortByItems.some((i) => i.name === item.name),
  //   }));
  // }, [sortByItems]);

  const onReset = () => {
    props.reset();
    setSortByItems([]);
    setSortByTempItems([]);
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
        return (
          <ChartSettingsTable
            {...props.tableProps}
            items={sortByItems}
            setItems={setSortByItems}
          />
        );
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
            setSortByItems={setSortByItems}
            setSortByTempItems={setSortByTempItems}
            sortByItems={sortByItems}
            sortByTempItems={sortByTempItems}
          />
        );
      case "table":
        return (
          <TableOrderContent
            setSortByTableColumnItems={setSortByTableColumnItems}
            sortByTableColumnItems={sortByTableColumnItems}
          />
        );
      case "line":
      case "treemap":
      case "sankey":
        return (
          <div></div>
          // <ChartSettingsSortBy
          //   pool={pool}
          //   onCancel={onCancel}
          //   onSubmit={onSubmit}
          //   items={sortByTempItems}
          //   setItems={setSortByTempItems}
          //   orderListDropdownSetSelected={handleItemSortOrderChange}
          // />
        );
      default:
        return null;
    }
  }, [props.chartType, sortByTempItems, sortByTableColumnItems, sortByItems]);

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
          padding: "7px 0",
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={showSortOrder ? 6 : 10} position="relative">
            <Typography fontSize="14px" marginBottom="15px">
              Customise what you see in this chart.
            </Typography>
            {settingsContent}
            {showSortOrder && (
              <Divider
                orientation="vertical"
                sx={{
                  top: 16,
                  right: 0,
                  position: "absolute",
                  height: "calc(100% - 16px)",
                  background: colors.secondary[600],
                }}
              />
            )}
          </Grid>
          {showSortOrder && (
            <Grid item xs={12} sm={4}>
              {orderContent}
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={2}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
