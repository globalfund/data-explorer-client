import BarChartIcon from "app/assets/icons/chart-types/bar";
import ColoredBarChartIcon from "app/assets/icons/chart-types/coloredBarChart";

import GeomapChartIcon from "app/assets/icons/chart-types/geomap";
import ColoredGeomapChartIcon from "app/assets/icons/chart-types/coloredGeomap";

import LineChartIcon from "app/assets/icons/chart-types/line";
import ColoredLineChartIcon from "app/assets/icons/chart-types/coloredLineChart";

import SankeyChartIcon from "app/assets/icons/chart-types/sankeydiagram";
import ColoredSankeyChartIcon from "app/assets/icons/chart-types/coloredSankeyDiagram";

import TreeMapIcon from "app/assets/icons/chart-types/treemap";
import ColoredTreeMapIcon from "app/assets/icons/chart-types/coloredTreemap";

import BigNumberIcon from "app/assets/icons/chart-types/bigNumber";
import ColoredBigNumberIcon from "app/assets/icons/chart-types/coloredBigNumber";
import { ReactComponent as GeomapPreviewImg } from "app/modules/chart-module/assets/geomapPreview.svg";
import { ReactComponent as BigNumberPreviewImg } from "app/modules/chart-module/assets/bigNumberPreview.svg";
import { ReactComponent as LineChartPreviewImg } from "app/modules/chart-module/assets/lineChartPreview.svg";
import { ReactComponent as TreeMapPreviewImg } from "app/modules/chart-module/assets/treemapPreview.svg";
import { ReactComponent as SankeyPreviewImg } from "app/modules/chart-module/assets/sankeyPreview.svg";
import { ReactComponent as BarChartPreviewImg } from "app/modules/chart-module/assets/barChartPreview.svg";

export interface ChartBuilderChartTypeProps {
  loading: boolean;
  datasetName: string;
}

export interface ChartTypeModel {
  id: string;
  label: string;
  icon: React.ReactNode;
  preview: React.ReactNode;

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
      preview: <BarChartPreviewImg />,

      categories: ["Correllations"],
      ssr: false,
      description:
        "A bar chart or bar graph is a chart or graph that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent.",
    },
    {
      id: "echartsGeomap",
      label: "Geo map",
      icon: <GeomapChartIcon big={big} />,

      preview: <GeomapPreviewImg />,
      categories: ["Locations"],
      ssr: false,
      description:
        "A geomap is a map of a country, continent, or region map, with colors and values assigned to specific regions. Values are displayed as a color scale, and you can specify optional hovertext for regions.",
    },
    {
      id: "echartsTreemap",
      label: "Treemap diagram",
      icon: <TreeMapIcon big={big} />,
      preview: <TreeMapPreviewImg />,

      categories: ["Hierarchies", "Proportions"],
      ssr: false,
      description:
        "In information visualization and computing, treemapping is a method for displaying hierarchical data using nested figures, usually rectangles. Treemaps display hierarchical data as a set of nested rectangles.",
    },
    {
      id: "echartsSankey",
      label: "Sankey diagram",
      icon: <SankeyChartIcon big={big} />,
      preview: <SankeyPreviewImg />,

      categories: ["Networks"],
      ssr: false,
      description:
        "A sankey diagram is a visualization used to depict a flow from one set of values to another. The things being connected are called nodes and the connections are called links.",
    },
    {
      id: "echartsLinechart",
      label: "Line chart",
      icon: <LineChartIcon big={big} />,
      preview: <LineChartPreviewImg />,

      categories: ["Trends", "changes over time"],
      ssr: false,
      description:
        "A line chart or line graph, also known as curve chart, is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.",
    },

    {
      id: "bigNumber",
      label: "KPI number",
      icon: <BigNumberIcon />,
      preview: <BigNumberPreviewImg />,

      categories: ["Key data points"],
      ssr: true,
      description:
        "KPI stands for key performance indicator, a quantifiable measure of performance over time for a specific objective. KPIs provide targets to shoot for, milestones and gauge progress.",
    },
  ];
};

export const coloredEchartTypes = () => {
  return [
    {
      id: "echartsBarchart",
      label: "Bar chart",
      icon: <ColoredBarChartIcon />,
      categories: ["Correllations"],
      ssr: false,
      description:
        "It displays a categorical dimension and related amounts. Each bar represents a category, width is proportional to the quantitative dimension.",
    },
    {
      id: "echartsGeomap",
      label: "Geo map",
      icon: <ColoredGeomapChartIcon />,
      categories: ["Locations"],
      ssr: false,
      description: "Geo map",
    },
    {
      id: "echartsLinechart",
      label: "Line chart",
      icon: <ColoredLineChartIcon />,
      categories: ["Trends", "changes over time"],
      ssr: false,
      description:
        "It displays a quantitative dimension over a continuous interval or time period. Colour can be optionally used to encode an additional quantitative or categorical dimension.",
    },
    {
      id: "echartsSankey",
      label: "Sankey diagram",
      icon: <ColoredSankeyChartIcon />,
      categories: ["Networks"],
      ssr: false,
      description:
        "It represents flows among nodes of a network. Nodes are represented as rectangles, the height represents their value. Flows are represented with curved lines whose width is proportional to their value.",
    },
    {
      id: "echartsTreemap",
      label: "Treemap diagram",
      icon: <ColoredTreeMapIcon />,
      categories: ["Hierarchies", "Proportions"],
      ssr: false,
      description:
        "It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small rectangles, representing the last level of the tree structure. The rectangles’ size depends on the quantitative dimension.",
    },

    {
      id: "bigNumber",
      label: "Big Number diagram",
      icon: <ColoredBigNumberIcon />,
      categories: ["Hierarchies", "Proportions"],
      ssr: true,
      description:
        "It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small rectangles, representing the last level of the tree structure. The rectangles’ size depends on the quantitative dimension.",
    },
  ];
};
