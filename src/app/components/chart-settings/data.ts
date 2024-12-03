import { colors } from "app/theme";
import { ChartSettingsBarProps } from "app/components/chart-settings/variations/bar/data";
import { ChartSettingsLineProps } from "app/components/chart-settings/variations/line/data";
import { ChartSettingsTreemapProps } from "app/components/chart-settings/variations/treemap/data";
import { ChartSettingsTableProps } from "./variations/table/data";
import { ChartSettingsSankeyProps } from "./variations/sankey/data";
import { ChartSettingsHeatmapProps } from "./variations/heatmap/data";
import { ChartSettingsFinancialMetricsProps } from "./variations/financialMetrics/data";
import { ChartSettingsSortByOrderProps } from "./sort-by/data";

export interface ChartSettingsProps {
  handleSettingsPanelClose: () => void;
  chartType:
    | "bar"
    | "expandable-bar"
    | "heatmap"
    | "line"
    | "polyline"
    | "sankey"
    | "sunsburst"
    | "table"
    | "treemap"
    | "financialMetrics";

  reset: () => void;
  barProps?: ChartSettingsBarProps;
  lineProps?: ChartSettingsLineProps;
  tableProps?: ChartSettingsTableProps;
  treemapProps?: ChartSettingsTreemapProps;
  sankeyProps?: ChartSettingsSankeyProps;
  heatmapProps?: ChartSettingsHeatmapProps;
  financialMetricsSettingsProps?: ChartSettingsFinancialMetricsProps;
  financialMetricsSortByProps?: ChartSettingsSortByOrderProps;
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
export const switchButtonStyle = (paddingWidth: string, stacked: boolean) => ({
  position: "absolute",
  transformBox: "fill-box",
  width: `calc(100% / 2 + ${paddingWidth})`,
  height: "100%",
  left: "0px",
  top: "0px",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transform: !stacked ? "translateX(0%)" : "translateX(100%)",
  transition: "transform 0.3s, width 0.3s",
  border: "1px solid #DFE3E5",
  background: "#fff",
});
