export interface ChartBuilderCustomizeProps {
  loading: boolean;
  dimensions: any[];
  datasetName: string;
  mappedData: any[];
  visualOptions: any;
  renderedChart: string;
  renderedChartSsr: boolean;
  renderedChartMappedData: any;
  setVisualOptions: (value: any) => void;
}

export const checkLists = [
  {
    label: "TGF Default",

    value: ["#B1BCC8", "#F1ECEC", "#C3C9EC", "#C9CAD4", "#252C34"],
  },
  {
    label: "Nordic Aurora",

    value: ["#175A5C", "#23768C", "#5291BC", "#94A8E4", "#E0BAFD"],
  },
  {
    label: "Sunset coast",

    value: ["#05405B", "#58528C", "#BB5390", "#FD6565", "#FDA529"],
  },
  {
    label: "Warm tone",

    value: ["#5B0C0E", "#8A3C49", "#B26E87", "#D3A4C5", "#F5DCFE"],
  },
  {
    label: "Sprint forest",
    value: ["#2B5B16", "#538137", "#7BA95A", "#A4D37E", "#D0FEA3"],
  },
];
