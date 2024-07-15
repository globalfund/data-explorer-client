import { appColors } from "app/theme";

export interface LineChartDataItem {
  name: string;
  data: number[];
  itemStyle?: {
    color: string;
  };
}

export interface LineChartProps {
  xAxisKeys: string[];
  data: LineChartDataItem[];
}

export const STORY_DATA_VARIANT_1: LineChartDataItem[] = [
  {
    name: "HIV",
    data: [
      3184678, 1668485, 4504958, 1619106, 1334656, 4662326, 4531775, 2482125,
      3968053, 3574890, 1658293, 2974531, 2556698, 3602923, 4449006, 3728430,
      2582887, 3372414, 2074533, 4866212,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[0],
    },
  },
  {
    name: "Malaria",
    data: [
      4709244, 2269461, 2603312, 2132529, 4613676, 3018936, 3960619, 3166987,
      2167862, 3887980, 4792760, 4205126, 4122575, 4114845, 1661029, 1812519,
      4486182, 3499570, 2924499, 3673723,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[1],
    },
  },
  {
    name: "Tuberculosis",
    data: [
      3493888, 4545846, 2666453, 2144887, 2292015, 3059384, 1174887, 4910129,
      4479765, 4305892, 2910283, 3462763, 2844707, 3461960, 1458262, 4873888,
      4688210, 2506151, 3085358, 2406492,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[2],
    },
  },
  {
    name: "RSSH",
    data: [
      4103790, 2534491, 4710051, 1556579, 1110187, 3260985, 2979655, 3013454,
      3300313, 4893113, 1785561, 4824394, 2482803, 2267736, 1685403, 2832953,
      1082379, 2393731, 1493375, 3938587,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS[3],
    },
  },
];

export const STORY_DATA_VARIANT_2: LineChartDataItem[] = [
  {
    name: "HIV",
    data: [
      3184678, 1668485, 4504958, 1619106, 1334656, 4662326, 4531775, 2482125,
      3968053, 3574890, 1658293, 2974531, 2556698, 3602923, 4449006, 3728430,
      2582887, 3372414, 2074533, 4866212,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS_1[0],
    },
  },
  {
    name: "Malaria",
    data: [
      4709244, 2269461, 2603312, 2132529, 4613676, 3018936, 3960619, 3166987,
      2167862, 3887980, 4792760, 4205126, 4122575, 4114845, 1661029, 1812519,
      4486182, 3499570, 2924499, 3673723,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS_1[1],
    },
  },
  {
    name: "Tuberculosis",
    data: [
      3493888, 4545846, 2666453, 2144887, 2292015, 3059384, 1174887, 4910129,
      4479765, 4305892, 2910283, 3462763, 2844707, 3461960, 1458262, 4873888,
      4688210, 2506151, 3085358, 2406492,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS_1[2],
    },
  },
  {
    name: "RSSH",
    data: [
      4103790, 2534491, 4710051, 1556579, 1110187, 3260985, 2979655, 3013454,
      3300313, 4893113, 1785561, 4824394, 2482803, 2267736, 1685403, 2832953,
      1082379, 2393731, 1493375, 3938587,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS_1[3],
    },
  },
  {
    name: "HIV/TB",
    data: [
      4370770, 4989921, 2318196, 1533382, 2585538, 4056712, 4630087, 4045080,
      3034549, 2139491, 2654844, 2646272, 1657109, 4695025, 1848908, 2208873,
      3311500, 1589772, 3730041, 1484217,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS_1[4],
    },
  },
  {
    name: "Multicomponent",
    data: [
      2687586, 2335391, 4024328, 4721534, 4491556, 1194068, 1667907, 4763192,
      3817349, 4987846, 2011764, 1555072, 1245829, 2443145, 2996815, 1525143,
      1049766, 4845790, 1221220, 2168201,
    ],
    itemStyle: {
      color: appColors.LINE_CHART.CHART_LINE_COLORS_1[5],
    },
  },
];
