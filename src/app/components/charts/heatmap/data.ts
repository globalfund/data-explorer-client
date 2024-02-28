import { appColors } from "app/theme";

export interface ItemModel {
  name: string;
  expanded: boolean;
  children?: ItemModel[];
}

export interface HeatmapDataItem {
  row: string;
  column: string;
  parentRow?: string;
  percentage?: number;
  parentColumn?: string;
  value: number | string;
  [key: string]: any;
}

export interface HeatmapProps {
  rowCategory: string;
  columnCategory: string;
  data: HeatmapDataItem[];
  hoveredLegend: string | null;
  valueType: "percentage" | "amount";
  itemWidth?: number;
  contentProp: string;
  getItemColor: (item?: HeatmapDataItem) => string;
}

export function getPercentageColor(item?: HeatmapDataItem) {
  if (!item) return appColors.HEATMAP.CHART_PERCENTAGE_COLORS[4];
  const value = item.percentage;

  if (!value || value > 100) {
    return appColors.HEATMAP.CHART_PERCENTAGE_COLORS[4];
  }
  if (value >= 85) {
    return appColors.HEATMAP.CHART_PERCENTAGE_COLORS[0];
  }
  if (value >= 75) {
    return appColors.HEATMAP.CHART_PERCENTAGE_COLORS[1];
  }
  if (value >= 65) {
    return appColors.HEATMAP.CHART_PERCENTAGE_COLORS[2];
  }
  return appColors.HEATMAP.CHART_PERCENTAGE_COLORS[3];
}

export function getEligibilityColor(item?: HeatmapDataItem) {
  if (!item) return appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[3];
  const value = item.value as string;
  switch (value) {
    case "Eligible":
      return appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[0];
    case "Transition":
      return appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[1];
    case "Not Eligible":
      return appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[2];
    default:
      return appColors.HEATMAP.CHART_ELIGIBILITY_COLORS[3];
  }
}

export const STORY_DATA_VARIANT_1: HeatmapDataItem[] = [
  {
    row: "HIV",
    column: "2017-2019",
    value: 3170543016.66,
    percentage: 90,
  },
  {
    row: "HIV",
    column: "2020-2022",
    value: 1941203489.67,
    percentage: 71,
  },
  {
    row: "Malaria",
    column: "2017-2019",
    value: 3384958736.24,
    percentage: 92,
  },
  {
    row: "Malaria",
    column: "2020-2022",
    value: 2540879129.73,
    percentage: 76,
  },
  {
    row: "Multicomponent",
    column: "2017-2019",
    value: 110540996.34,
    percentage: 66,
  },
  {
    row: "Multicomponent",
    column: "2020-2022",
    value: 221604327.72,
    percentage: 63,
  },
  {
    row: "RSSH",
    column: "2017-2019",
    value: 80191748.64,
    percentage: 77,
  },
  {
    row: "RSSH",
    column: "2020-2022",
    value: 208547497.3,
    percentage: 42,
  },
  {
    row: "TB/HIV",
    column: "2017-2019",
    value: 2143656137.06,
    percentage: 91,
  },
  {
    row: "TB/HIV",
    column: "2020-2022",
    value: 1743633071.6,
    percentage: 71,
  },
  {
    row: "Tuberculosis",
    column: "2017-2019",
    value: 1628940475.64,
    percentage: 89,
  },
  {
    row: "Tuberculosis",
    column: "2020-2022",
    value: 797005994.19,
    percentage: 60,
  },
];

export const STORY_DATA_VARIANT_2: HeatmapDataItem[] = [
  {
    column: "2023",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2023",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2023",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2023",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2022",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2022",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2022",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2022",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2021",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2021",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2021",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2021",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2021",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2021",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2020",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2020",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2019",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2019",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2019",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2019",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2018",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2018",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2018",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2018",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2017",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2017",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2017",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2017",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2016",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2016",
    row: "RSSH",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2016",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2016",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2016",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2015",
    row: "RSSH",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2015",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2015",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2015",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2015",
    row: "Income Level",
    value: "",
    diseaseBurden: "M",
  },
  {
    column: "2014",
    row: "RSSH",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2014",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2014",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2014",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2014",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2013",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2013",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2013",
    row: "RSSH",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2013",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2013",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2012",
    row: "Malaria",
    value: "Not Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2012",
    row: "HIV",
    value: "Not Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2012",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2012",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2011",
    row: "HIV",
    value: "Not Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2011",
    row: "RSSH",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2011",
    row: "Tuberculosis",
    value: "Not Eligible",
    diseaseBurden: "M",
  },
  {
    column: "2011",
    row: "Malaria",
    value: "Not Eligible",
    diseaseBurden: "H",
  },
  {
    column: "2011",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2010",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2010",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2010",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2010",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2009",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2009",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2009",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2009",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2008",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2008",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2008",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2008",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2007",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2007",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2007",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2007",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2006",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2006",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2006",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2006",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2005",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2005",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2005",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2005",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2004",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2004",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2004",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2004",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
  {
    column: "2003",
    row: "Malaria",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2003",
    row: "Tuberculosis",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2003",
    row: "HIV",
    value: "Eligible",
    diseaseBurden: "NA",
  },
  {
    column: "2003",
    row: "Income Level",
    value: "",
    diseaseBurden: "L",
  },
];
