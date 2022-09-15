export interface PledgesContributionsProps {
  vizCompData: any;
  selectedNodeId?: string;
  data: Record<string, unknown>[];
  setVizCompData: (vizCompData: any) => void;
  onNodeClick: (node: string, x: number, y: number) => void;
}

export interface PledgesContributionsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: PledgesContributionsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}

export const mockdata: Record<string, unknown>[] = [
  {
    year: "2001-2005",
    pledge: 4855441149.2,
    contribution: 4855441149.2,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
  {
    year: "2006-2007",
    pledge: 4750213146,
    contribution: 4803345662.25,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
  {
    year: "2008-2010",
    pledge: 10039407985.1,
    contribution: 9643861786.12,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
  {
    year: "2011-2013",
    pledge: 10307673846.25,
    contribution: 10303883939.29,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
  {
    year: "2014-2016",
    pledge: 12448929788.12,
    contribution: 11713105696.93,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
  {
    year: "2017-2019",
    pledge: 12242930684.09,
    contribution: 11374762402.26,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
  {
    year: "2020-2022",
    pledge: 17942307515.71,
    contribution: 4191700290.72,
    pledgeColor: "#868E96",
    contributionColor: "#231d2c",
  },
];
