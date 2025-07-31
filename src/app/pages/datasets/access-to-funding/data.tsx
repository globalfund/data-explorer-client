import Divider from "@mui/material/Divider";
import TableIcon from "app/assets/vectors/Select_Table.svg?react";
import TreemapIcon from "app/assets/vectors/Select_Treemap.svg?react";
import SunburstChartIcon from "app/assets/vectors/Select_SunburstChart.svg?react";

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
    value: "24.5 Million",
    label: "People on antiretroviral therapy for HIV in 2022.",
  },
  {
    value: "6.7 Million",
    label: "People with TB treated in 2022.",
  },
  {
    value: "220 Million",
    label: "Mosquito nets distributed in 2022.",
  },
];

export const dropdownItemsAllocations = [
  {
    label: "Sunburst Chart",
    value: "Sunburst Chart",
    icon: <SunburstChartIcon />,
  },
  { label: "Treemap", value: "Treemap", icon: <TreemapIcon /> },
  { label: "Table View", value: "Table View", icon: <TableIcon /> },
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

export const BOXES = [
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    image: "/static/images/ImagePlaceholder.png",
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    image: "/static/images/ImagePlaceholder.png",
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    image: "/static/images/ImagePlaceholder.png",
  },
  {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    image: "/static/images/ImagePlaceholder.png",
  },
];
