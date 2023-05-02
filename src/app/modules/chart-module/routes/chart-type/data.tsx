import BarChartIcon from "app/assets/icons/data-themes-chart-types/bar";
import GeomapChartIcon from "app/assets/icons/data-themes-chart-types/geomap";
import LineChartIcon from "app/assets/icons/data-themes-chart-types/line";
import SankeyChartIcon from "app/assets/icons/data-themes-chart-types/sankeydiagram";
import TreeMapIcon from "app/assets/icons/data-themes-chart-types/treemap";

export interface ChartBuilderChartTypeProps {
  loading: boolean;
}

export interface ChartTypeModel {
  id: string;
  label: string;
  icon: React.ReactNode;
  categories: string[];
  description: string;
  ssr: boolean;
}

export const echartTypes = (big: boolean) => {
  return [
    {
      id: "echartsBarchart",
      label: "Bar chart",
      icon: <BarChartIcon big={big} />,
      categories: ["Correllations"],
      ssr: false,
      description:
        "It displays a categorical dimension and related amounts. Each bar represents a category, width is proportional to the quantitative dimension.",
    },
    {
      id: "echartsGeomap",
      label: "Geo map",
      icon: <GeomapChartIcon big={big} />,
      categories: ["Locations"],
      ssr: false,
      description: "Geo map",
    },
    {
      id: "echartsLinechart",
      label: "Line chart",
      icon: <LineChartIcon big={big} />,
      categories: ["Trends", "changes over time"],
      ssr: false,
      description:
        "It displays a quantitative dimension over a continuous interval or time period. Colour can be optionally used to encode an additional quantitative or categorical dimension.",
    },
    {
      id: "echartsSankey",
      label: "Sankey diagram",
      icon: <SankeyChartIcon big={big} />,
      categories: ["Networks"],
      ssr: false,
      description:
        "It represents flows among nodes of a network. Nodes are represented as rectangles, the height represents their value. Flows are represented with curved lines whose width is proportional to their value.",
    },
    {
      id: "echartsTreemap",
      label: "Treemap diagram",
      icon: <TreeMapIcon big={big} />,
      categories: ["Hierarchies", "Proportions"],
      ssr: false,
      description:
        "It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small rectangles, representing the last level of the tree structure. The rectangles’ size depends on the quantitative dimension.",
    },

    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
    {
      id: "",
      label: "",
      icon: <></>,
      categories: [],
      ssr: false,
      description: "",
    },
  ];
};
