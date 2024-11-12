import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Refresh from "@mui/icons-material/Refresh";
import { ChartSettingsProps } from "app/components/chart-settings/data";
import { ChartSettingsSortBy } from "app/components/chart-settings/sort-by";
import { ChartSettingsBar } from "app/components/chart-settings/variations/bar";
import { ChartSettingsLine } from "app/components/chart-settings/variations/line";
import { ChartSettingsTreemap } from "app/components/chart-settings/variations/treemap";
import { ReactComponent as TitleIcon } from "app/assets/vectors/ChartSettingsTitleIcon.svg";
import {
  ChartSettingsSortByItem,
  ChartSettingsSortByItems,
} from "app/components/chart-settings/sort-by/data";
import { ChartSettingsTable } from "./variations/table";

export const ChartSettings: React.FC<ChartSettingsProps> = (
  props: ChartSettingsProps
) => {
  const [sortByItems, setSortByItems] = React.useState<
    ChartSettingsSortByItem[]
  >([]);
  const [sortByTempItems, setSortByTempItems] = React.useState<
    ChartSettingsSortByItem[]
  >([]);

  const handleItemSortOrderChange = (name: string, value: string) => {
    const newItems = [...sortByTempItems];
    const itemIndex = newItems.findIndex((i) => i.name === name);
    if (itemIndex !== -1) {
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        dropdown: {
          ...newItems[itemIndex].dropdown,
          selected: value,
        },
      };
      setSortByTempItems(newItems);
    }
  };

  const pool = React.useMemo(() => {
    return ChartSettingsSortByItems.map((item) => ({
      ...item,
      name: item.name,
      disabled: sortByItems.some((i) => i.name === item.name),
    }));
  }, [sortByItems]);

  const onCancel = () => {
    setSortByTempItems(sortByItems);
  };

  const onSubmit = () => {
    setSortByItems(sortByTempItems);
  };

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
      default:
        return null;
    }
  }, [props.chartType, props.barProps, props.lineProps, props.treemapProps]);

  const orderContent = React.useMemo(() => {
    switch (props.chartType) {
      case "bar":
      case "table":
        return (
          <ChartSettingsSortBy
            pool={pool}
            onCancel={onCancel}
            onSubmit={onSubmit}
            items={sortByTempItems}
            setItems={setSortByTempItems}
            orderListDropdownSetSelected={handleItemSortOrderChange}
          />
        );
      case "line":
      case "treemap":
      default:
        return null;
    }
  }, [props.chartType, pool, sortByTempItems]);

  const showSortOrder =
    props.chartType !== "line" && props.chartType !== "treemap";

  return (
    <Box
      sx={{
        padding: "0 12px",
        borderRadius: "4px",
        border: `1px solid ${colors.secondary[200]}`,
      }}
    >
      <Box
        sx={{
          gap: "8px",
          display: "flex",
          padding: "7px 0",
          alignItems: "center",
          borderBottom: `1px solid ${colors.secondary[600]}`,
        }}
      >
        <TitleIcon />
        <Typography fontSize="14px">Settings</Typography>
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
              <Typography fontSize="14px" marginBottom="15px">
                Customise the order of what you see.
              </Typography>
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
