import Divider from "@mui/material/Divider";
import { ReactComponent as TableIcon } from "app/assets/vectors/Select_Table.svg";
import { ReactComponent as TreemapIcon } from "app/assets/vectors/Select_Treemap.svg";
import { ReactComponent as SunburstChartIcon } from "app/assets/vectors/Select_SunburstChart.svg";

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
