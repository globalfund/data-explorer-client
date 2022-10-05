import AlluvialChartIcon from "app/assets/icons/data-themes-chart-types/alluvial";
import ArcChartIcon from "app/assets/icons/data-themes-chart-types/arc";
import BarChartIcon from "app/assets/icons/data-themes-chart-types/bar";
import MultiSetBarChartIcon from "app/assets/icons/data-themes-chart-types/multi-set-bar";
import StackedBarChartIcon from "app/assets/icons/data-themes-chart-types/bar-stacked";
import BeeswarmChartIcon from "app/assets/icons/data-themes-chart-types/beeswarm";
import BoxplotChartIcon from "app/assets/icons/data-themes-chart-types/boxplot";
import BubbleChartIcon from "app/assets/icons/data-themes-chart-types/bubble";
import BumpChartIcon from "app/assets/icons/data-themes-chart-types/bump";
import CirclePackingChartIcon from "app/assets/icons/data-themes-chart-types/circlepacking";
import CircularDendogramChartIcon from "app/assets/icons/data-themes-chart-types/circulardendrogram";
import ContourPlotChartIcon from "app/assets/icons/data-themes-chart-types/contourplot";
import ConvexHullChartIcon from "app/assets/icons/data-themes-chart-types/convexhull";
import LinearDendogramChartIcon from "app/assets/icons/data-themes-chart-types/lineardendrogram";
import GanttChartIcon from "app/assets/icons/data-themes-chart-types/gantt";
import HexagonalBinningChartIcon from "app/assets/icons/data-themes-chart-types/hexagonalbinning";
import HorizonGraphChartIcon from "app/assets/icons/data-themes-chart-types/horizongraph";
import LineChartIcon from "app/assets/icons/data-themes-chart-types/line";
import MatrixPlotChartIcon from "app/assets/icons/data-themes-chart-types/matrixplot";
import ParallelCoordinatesChartIcon from "app/assets/icons/data-themes-chart-types/parallelcoordinates";
import PieChartIcon from "app/assets/icons/data-themes-chart-types/pie";
import RadarChartIcon from "app/assets/icons/data-themes-chart-types/radar";
import SankeyChartIcon from "app/assets/icons/data-themes-chart-types/sankeydiagram";
import SlopeChartIcon from "app/assets/icons/data-themes-chart-types/slope";
import StreamGraphChartIcon from "app/assets/icons/data-themes-chart-types/streamgraph";
import SunburstChartIcon from "app/assets/icons/data-themes-chart-types/sunburst";
import TreeMapIcon from "app/assets/icons/data-themes-chart-types/treemap";
import ViolinPlotIcon from "app/assets/icons/data-themes-chart-types/violinplot";
import VoronoiDiagramIcon from "app/assets/icons/data-themes-chart-types/voronoidiagram";
import { FilterGroupModel } from "app/components/ToolBoxPanel/components/filters/data";

export interface DataThemesBuilderChartTypeProps {
  tabIndex: number;
  vizIndex: number;
  data: { [key: string]: string | number | null }[];
  loading: boolean;
  visualOptions: any;
  currentChart: any;
  setCurrentChart: (chart: any) => void;
  filterOptionGroups: FilterGroupModel[];
  setVisualOptions: (value: any) => void;
  loadDataset: (endpoint: string, rows: number) => Promise<boolean>;
  updateLocalStates: any;
  deleteTab: (value: number) => void;
  themeData: {
    id: number;
    count: number;
    data: { [key: string]: string | number | null }[];
    filterOptionGroups: FilterGroupModel[];
  }[][];
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
    id: "alluvialdiagram",
    label: "Alluvial diagram",
    icon: <AlluvialChartIcon />,
    categories: ["Correllations", "Proportions"],
    description:
      "It shows correlations between categorical dimensions representing them as flows, visually linking categories with shared items. Each rectangle represents a unique value in the selected dimension, its height is proportional to its value. Correlations are represented with curved lines whose width is proportional to their value.",
  },
  {
    id: "arcdiagram",
    label: "Arc diagram",
    icon: <ArcChartIcon />,
    categories: ["Network"],
    description:
      "A particular kind of network graph, allows seeing relationships among nodes. Nodes are displayed on the horizontal axis, and links as clockwise arcs. An arc above the nodes means a connection from the left to the right, while below means a connection from the right node to the left one.",
  },
  {
    id: "barchart",
    label: "Bar chart",
    icon: <BarChartIcon />,
    categories: ["Correllations"],
    description:
      "It displays a categorical dimension and related amounts. Each bar represents a category, width is proportional to the quantitative dimension.",
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
    id: "barchartstacked",
    label: "Stacked bar chart",
    icon: <StackedBarChartIcon />,
    categories: ["Correllations", "Proportions"],
    description:
      "It displays multiple quantitative dimensions related to categories. bars are visually stacked according to the categorical dimension, each bar represents a quantitative dimension, mapped on its height.",
  },
  {
    id: "beeswarm",
    label: "Beeswarm plot",
    icon: <BeeswarmChartIcon />,
    categories: ["Distributions", "Time series", "Proportions"],
    description:
      "It displays the distribution of items over a continuous dimensions. Each (line) is represented with a dot placed on the horizontal axis. The vertical dimension is used to avoid overlaps among circles, showing their distribution. The area of dots can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.",
  },
  {
    id: "boxplot",
    label: "Box plot",
    icon: <BoxplotChartIcon />,
    categories: ["Distributions"],
    description:
      "It summarize a quantitative distribution with five standard statistics: the smallest value, lower quartile, median, upper quartile, and largest value.",
  },
  {
    id: "bubblechart",
    label: "Bubble chart",
    icon: <BubbleChartIcon />,
    categories: ["Correlations", "Proportions"],
    description:
      "The basic layout is a scatter plot, which allows to see correlations among two continuous dimensions. A further quantitative dimension with size and a quantitative or categorical dimension with color.",
  },
  {
    id: "bumpchart",
    label: "Bumpchart",
    icon: <BumpChartIcon />,
    categories: ["Time series", "Correlations", "Proportions"],
    description:
      "It allows the comparison of multiple categories over a continuous dimension and the evolution of its sorting. By default, sorting is based on the stream size.",
  },
  {
    id: "circlepacking",
    label: "Circle Packing",
    icon: <CirclePackingChartIcon />,
    categories: ["Hierarchies", "Proportions"],
    description:
      "It displays values of leaf nodes of a hierarchical structure by using circles areas. The hierarchical structure is depicted using nested circles. A further quantitative dimension with size and a quantitative or categorical dimension with color.",
  },
  {
    id: "circularDendrogram",
    label: "Circular dendrogram",
    icon: <CircularDendogramChartIcon />,
    categories: ["Hierarchies", "Proportions"],
    description:
      "It displays hierarchically structured data with a radial tree structure, where the root node is in the center with the hierarchies moving outward. The area of nodes can be used to encode a further quantitative dimension and a quantitative or categorical dimension with color.",
  },
  {
    id: "contourPlot",
    label: "Contour plot",
    icon: <ContourPlotChartIcon />,
    categories: ["Correlations", "Distributions"],
    description:
      "It shows the estimated density of point clouds, which is especially useful to avoid overplotting in large datasets.",
  },
  {
    id: "convexHull",
    label: "Convex hull",
    icon: <ConvexHullChartIcon />,
    categories: ["Correlations", "Proportions"],
    description:
      "In mathematics, the convex hull is the smallest convex shape containing a set of points. Applied to a scatterplot, it is useful to identify points belonging to the same category.",
  },
  {
    id: "dendrogram",
    label: "Linear dendrogram",
    icon: <LinearDendogramChartIcon />,
    categories: ["Hierarchies", "Proportions"],
    description:
      "It displays hierarchically structured data with a tree structure, where the root node is on the left and leaves are on the right. The size of nodes can be used to encode a further quantitative dimension with size and a quantitative or categorical dimension with color.",
  },
  {
    id: "ganttChart",
    label: "Gantt chart",
    icon: <GanttChartIcon />,
    categories: ["Time series", "Correlations"],
    description:
      "A Gantt chart is a type of bar chart, developed by Henry Gantt in the 1910s, that illustrates a project schedule. Gantt charts illustrate the start and finish dates of the terminal elements and summary elements of a project.",
  },
  {
    id: "hexagonalBinning",
    label: "Hexagonal binning",
    icon: <HexagonalBinningChartIcon />,
    categories: ["Correlations", "Distributions"],
    description:
      "Hexagonal Binning is a way to manage the problem of having too many points that start to overlap. Hexagonal binning plots density, rather than points. Points are binned into gridded hexagons and distribution (the number of points per hexagon) is displayed using either the color or the area of the hexagons.",
  },
  {
    id: "horizongraph",
    label: "Horizon graph",
    icon: <HorizonGraphChartIcon />,
    categories: ["Time series", "Correlations"],
    description:
      "It displays a quantitative dimension over a continuous interval or time period. Horizon graphs combine position and color to reduce vertical space.",
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
    id: "matrixplot",
    label: "Matrix Plot",
    icon: <MatrixPlotChartIcon />,
    categories: ["Correlations", "Time series", "Proportions"],
    description:
      "It allows comparison of two categorical dimensions, disposing them on the horizontal and vertical axes. Each glyph (square or circle) represents a possible correlation among the two dimensions. Associated quantitative variables can be represented with size and/or color.",
  },
  {
    id: "parallelcoordinates",
    label: "Parallel coordinates",
    icon: <ParallelCoordinatesChartIcon />,
    categories: ["Correlations", "Distributions"],
    description:
      "It displays multiple continuous dimensions as axes, and each row in the dataset produces a line connecting its values across the axes.",
  },
  {
    id: "piechart",
    label: "Pie chart",
    icon: <PieChartIcon />,
    categories: ["Proportions"],
    description:
      "It allows you to see the proportions between values that make up a whole, by using arcs composing a circle.",
  },
  {
    id: "radarchart",
    label: "Radar Chart",
    icon: <RadarChartIcon />,
    categories: ["Correlations"],
    description:
      "It displays multiple continuous dimensions as axes starting from the same point and by disposing them radially. Each dimension is represented as an axis starting from the center of the cart. The same scale is applied to all the axes.",
  },
  {
    id: "sankeydiagram",
    label: "Sankey Diagram",
    icon: <SankeyChartIcon />,
    categories: ["Networks"],
    description:
      "It represents flows among nodes of a network. Nodes are represented as rectangles, the height represents their value. Flows are represented with curved lines whose width is proportional to their value.",
  },
  {
    id: "slopechart",
    label: "Slope chart",
    icon: <SlopeChartIcon />,
    categories: ["Correlations"],
    description:
      "It allows the comparison of two continuous dimensions showing them as axes, and using a line to show the relationship.",
  },
  {
    id: "streamgraph",
    label: "Streamgraph (area chart)",
    icon: <StreamGraphChartIcon />,
    categories: ["Time series", "Correlations", "Proportions"],
    description:
      "It allows the comparison of multiple categories over a continuous dimension.",
  },
  {
    id: "sunburst",
    label: "Sunburst diagram",
    icon: <SunburstChartIcon />,
    categories: ["Hierarchies", "Proportions"],
    description:
      "It displays hierarchically structured data and a related quantitative dimension using concentric circles. The circle in the center represents the root node, with the hierarchies moving outward from the center. The angle of each arc corresponds to the qualitative dimension.",
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
    id: "violinplot",
    label: "Violin plot",
    icon: <ViolinPlotIcon />,
    categories: ["Distributions"],
    description:
      "It is useful to show the distribution of a numeric dimension. The shape width represents the amount of items with the same value in the dataset.",
  },
  {
    id: "voronoidiagram",
    label: "Voronoi Diagram",
    icon: <VoronoiDiagramIcon />,
    categories: ["Correlations"],
    description:
      "It creates the minimum area around each point defined by two variables. When applied to a scatterplot, it is useful to show the distance between points.",
  },
  {
    id: "voronoitreemap",
    label: "Treemap (Voronoi)",
    icon: <VoronoiDiagramIcon />,
    categories: ["Hierarchies", "Proportions"],
    description:
      "It displays hierarchically structured data and a related quantitative dimension. It is composed of an area divided into small cells, representing the last level of the tree structure, computed using the Voronoi tessellation. The cells’ size depends on the quantitative dimension.",
  },
];
