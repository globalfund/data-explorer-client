import Divider from "@mui/material/Divider";
import TableIcon from "app/assets/vectors/Select_Table.svg?react";
import TreemapIcon from "app/assets/vectors/Select_Treemap.svg?react";
import HeatmapIcon from "app/assets/vectors/Select_Heatmap.svg?react";
import BarChartIcon from "app/assets/vectors/Select_BarChart.svg?react";
import LineChartIcon from "app/assets/vectors/Select_LineChart.svg?react";
import SankeyChartIcon from "app/assets/vectors/Select_SankeyChart.svg?react";

export const geographyGroupingOptions = [
  { value: "Standard View", label: "Standard View" },
  { value: "Portfolio View", label: "Portfolio View" },
  { value: "Board Constituency View", label: "Board Constituency View" },
];

export const componentsGroupingOptions = [
  { value: "Grouped", label: "Grouped" },
  { value: "Un-Grouped", label: "Un-Grouped" },
];

export const stats: {
  label: string;
  value: number | string;
}[] = [
  {
    value: "24.5 Million",
    label: "People on antiretroviral therapy for HIV in 2022.",
  },
  {
    value: "6.7 Million",
    label: "People with TB treated in 2022.",
  },
  {
    value: "220 Million",
    label: "Insecticide-treated mosquito nets distributed in 2022.",
  },
];

export const dropdownItemsDisbursements = [
  {
    label: "Bar Chart",
    value: "Bar Chart",
    icon: <BarChartIcon />,
  },
  { label: "Line Chart", value: "Line Chart", icon: <LineChartIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

export const dropdownItemsHolisticGrantInvestments = [
  {
    label: "Sankey Chart",
    value: "Sankey Chart",
    icon: <SankeyChartIcon />,
  },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

export const dropdownItemsBudgets = [
  {
    label: "Sankey Chart",
    value: "Sankey Chart",
    icon: <SankeyChartIcon />,
  },
  { label: "Treemap", value: "Treemap", icon: <TreemapIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

export const dropdownItemsExpenditures = [
  {
    label: "Heatmap",
    value: "Heatmap",
    icon: <HeatmapIcon />,
  },
  { label: "Bar Chart", value: "Bar Chart", icon: <BarChartIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
];

export const dropdownItemsBudgetsTableDataTypes = [
  { label: "Investment Landscape", value: "Investment Landscape" },
  { label: "Modules & Interventions", value: "Modules & Interventions" },
];

export const FullWidthDivider = () => (
  <Divider
    sx={{
      left: 0,
      width: "100vw",
      position: "absolute",
      borderColor: "#CFD4DA",
      "@media (max-width: 767px)": {
        display: "none",
      },
    }}
  />
);

export const BUDGET_BREAKDOWN_DATA = [
  {
    name: "Multicomponent",
    value: 37.41334776474775,
    color: "#0A2840",
  },
  {
    name: "HIV",
    value: 26.03209507797034,
    color: "#013E77",
  },
  {
    name: "Malaria",
    value: 17.556574762349314,
    color: "#00B5AE",
  },
  {
    name: "Tuberculosis",
    value: 10.822421383684201,
    color: "#C3EDFD",
  },
  {
    name: "RSSH",
    value: 8.175561011248398,
    color: "#F3F5F4",
  },
];
