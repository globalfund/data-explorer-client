import BarChartIcon from "app/assets/icons/data-themes-chart-types/bar";
import LineChartIcon from "app/assets/icons/data-themes-chart-types/line";
import MultiSetBarChartIcon from "app/assets/icons/data-themes-chart-types/multi-set-bar";
import AlluvialChartIcon from "app/assets/icons/data-themes-chart-types/alluvial";
import TreeMapIcon from "app/assets/icons/data-themes-chart-types/treemap";
import StackedBarChartIcon from "app/assets/icons/data-themes-chart-types/bar-stacked";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesBuilderChartTypeProps {
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  visualOptions: any;
  currentChart: any;
  setCurrentChart: (chart: any) => void;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions: (value: any) => void;
  loadDataset: (endpoint: string) => Promise<boolean>;
}

export interface ChartTypeModel {
  id: string;
  label: string;
  icon: React.ReactNode;
  categories: string[];
  description: string;
}

export const chartTypes: ChartTypeModel[] = [
  {
    id: "barchart",
    label: "Bar chart",
    icon: <BarChartIcon />,
    categories: ["Correllations"],
    description:
      "It displays a categorical dimension and related amounts. Each bar represents a category, width is proportional to the quantitative dimension.",
  },
  {
    id: "linechart",
    label: "Line chart",
    icon: <LineChartIcon />,
    categories: ["Time series", "Correllations"],
    description:
      "It displays a quantitative dimension over a continuous interval or time period. Colour can be optionally used to encode an additional quantitative or categorical dimension.",
  },
  {
    id: "barchartmultiset",
    label: "Multi-set bar chart",
    icon: <MultiSetBarChartIcon />,
    categories: ["Correllations", "Proportions"],
    description:
      "It displays multiple quantitative dimensions related to categories. bars are visually grouped in sets according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.",
  },
  {
    id: "alluvialdiagram",
    label: "Alluvial diagram",
    icon: <AlluvialChartIcon />,
    categories: ["Correllations", "Proportions"],
    description:
      "It shows correlations between categorical dimensions representing them as flows, visually linking categories with shared items. Each rectangle represents a unique value in the selected dimension, its height is proportional to its value. Correlations are represented with curved lines whose width is proportional to their value.",
  },
  {
    id: "treemap",
    label: "Treemap",
    icon: <TreeMapIcon />,
    categories: ["Hierarchies", "Proportions"],
    description:
      "It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small rectangles, representing the last level of the tree structure. The rectangles’ size depends on the quantitative dimension.",
  },
  {
    id: "barchartstacked",
    label: "Stacked bar chart",
    icon: <StackedBarChartIcon />,
    categories: ["Correllations", "Proportions"],
    description:
      "It displays multiple quantitative dimensions related to categories. bars are visually stacked according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.",
  },
];
