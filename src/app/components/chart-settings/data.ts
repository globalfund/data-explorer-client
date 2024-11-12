import { colors } from "app/theme";
import { ChartSettingsBarProps } from "app/components/chart-settings/variations/bar/data";
import { ChartSettingsLineProps } from "app/components/chart-settings/variations/line/data";
import { ChartSettingsTreemapProps } from "app/components/chart-settings/variations/treemap/data";
import { ChartSettingsTableProps } from "./variations/table/data";

export interface ChartSettingsProps {
  chartType:
    | "bar"
    | "expandable-bar"
    | "heatmap"
    | "line"
    | "polyline"
    | "sankey"
    | "sunsburst"
    | "table"
    | "treemap";
  reset: () => void;
  barProps?: ChartSettingsBarProps;
  lineProps?: ChartSettingsLineProps;
  tableProps?: ChartSettingsTableProps;
  treemapProps?: ChartSettingsTreemapProps;
}

export const activeStyle = {
  background: "#ffffff",
  boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.25)",
};

export const inactiveStyle = {
  cursor: "pointer",
  color: colors.secondary[300],
  background: colors.secondary[800],
};
