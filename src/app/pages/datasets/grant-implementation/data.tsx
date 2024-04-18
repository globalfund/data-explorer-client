import Divider from "@mui/material/Divider";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { ReactComponent as LineChartIcon } from "app/assets/vectors/Select_LineChart.svg";
import { ReactComponent as BarChartIcon } from "app/assets/vectors/Select_BarChart.svg";

export const geographyGroupingOptions = [
  { value: "Portfolio View", label: "Portfolio View" },
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
    value: "24.5 million",
    label: "People on antiretroviral therapy for HIV in 2022.",
  },
  {
    value: "6.7 million",
    label: "People with TB treated in 2022.",
  },
  {
    value: "220 million",
    label: "Mosquito nets distributed in 2022.",
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

export const FullWidthDivider = () => (
  <Divider
    sx={{
      left: 0,
      width: "100vw",
      position: "absolute",
      borderColor: "#CFD4DA",
    }}
  />
);
