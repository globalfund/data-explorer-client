import { TreeMapNodeDatum } from "@nivo/treemap";

export interface DisbursementsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: DisbursementsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      count: number;
      investment: number;
    }[];
    totalInvestments: {
      commited: number;
      disbursed: number;
      signed: number;
    };
    percValue: string;
  };
}

export interface DisbursementsTreemapProps {
  selectedNodeId?: string;
  isChildTreemap?: boolean;
  data: DisbursementsTreemapDataItem[];
  parentNodeCoords?: { x: number; y: number };
  onNodeClick: (node: string, x: number, y: number) => void;
}

export interface TreemapTooltipProps {
  node: TreeMapNodeDatum;
}

export const mockdata1: DisbursementsTreemapDataItem[] = [
  {
    name: "HIV",
    value: 22406794003.499992,
    formattedValue: "US$22,406,794,003",
    tooltip: {
      header: "HIV",
      componentsStats: [
        {
          name: "HIV",
          count: 585,
          investment: 22406794003.499992,
        },
      ],
      totalInvestments: {
        commited: 23470867864.36001,
        disbursed: 22406794003.499992,
        signed: 25509347381.529987,
      },
      percValue: "99.88",
    },
    color: "rgba(134, 142, 150, 0.3)",
    _children: [
      {
        name: "Ethiopia",
        value: 1469001508.8300002,
        formattedValue: "US$1,469,001,509",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Ethiopia",
              count: 6,
              investment: 1469001508.8300002,
            },
          ],
          totalInvestments: {
            commited: 1473744545.5800002,
            disbursed: 1469001508.8300002,
            signed: 1475159376.8000002,
          },
          percValue: "99.68",
        },
        color: "#ADB5BD",
      },
      {
        name: "Tanzania (United Republic)",
        value: 1462725954.9999998,
        formattedValue: "US$1,462,725,955",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Tanzania (United Republic)",
              count: 8,
              investment: 1462725954.9999998,
            },
          ],
          totalInvestments: {
            commited: 1575765642.66,
            disbursed: 1462725954.9999998,
            signed: 1802434435.6299999,
          },
          percValue: "92.83",
        },
        color: "#ADB5BD",
      },
    ],
  },
  {
    name: "RSSH",
    value: 12406794003.499992,
    formattedValue: "US$12,406,794,003",
    tooltip: {
      header: "RSSH",
      componentsStats: [
        {
          name: "RSSH",
          count: 585,
          investment: 22406794003.499992,
        },
      ],
      totalInvestments: {
        commited: 23470867864.36001,
        disbursed: 22406794003.499992,
        signed: 25509347381.529987,
      },
      percValue: "99.88",
    },
    color: "rgba(134, 142, 150, 0.3)",
    _children: [
      {
        name: "Ethiopia",
        value: 1469001508.8300002,
        formattedValue: "US$1,469,001,509",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Ethiopia",
              count: 6,
              investment: 1469001508.8300002,
            },
          ],
          totalInvestments: {
            commited: 1473744545.5800002,
            disbursed: 1469001508.8300002,
            signed: 1475159376.8000002,
          },
          percValue: "99.68",
        },
        color: "#ADB5BD",
      },
      {
        name: "Tanzania (United Republic)",
        value: 1462725954.9999998,
        formattedValue: "US$1,462,725,955",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Tanzania (United Republic)",
              count: 8,
              investment: 1462725954.9999998,
            },
          ],
          totalInvestments: {
            commited: 1575765642.66,
            disbursed: 1462725954.9999998,
            signed: 1802434435.6299999,
          },
          percValue: "92.83",
        },
        color: "#ADB5BD",
      },
    ],
  },
];

export const mockdata2: DisbursementsTreemapDataItem[] = [
  {
    name: "HIV",
    value: 22406794003.499992,
    formattedValue: "US$22,406,794,003",
    tooltip: {
      header: "HIV",
      componentsStats: [
        {
          name: "HIV",
          count: 585,
          investment: 22406794003.499992,
        },
      ],
      totalInvestments: {
        commited: 23470867864.36001,
        disbursed: 22406794003.499992,
        signed: 25509347381.529987,
      },
      percValue: "99.88",
    },
    color: "rgba(134, 142, 150, 0.3)",
    _children: [
      {
        name: "Comprehensive prevention programes for MSM 1",
        value: 1469001508.8300002,
        formattedValue: "US$1,469,001,509",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM  1",
              count: 6,
              investment: 1469001508.8300002,
            },
          ],
          totalInvestments: {
            commited: 1473744545.5800002,
            disbursed: 1469001508.8300002,
            signed: 1475159376.8000002,
          },
          percValue: "99.68",
        },
        color: "#ADB5BD",
      },
      {
        name: "Comprehensive prevention programes for MSM 2",
        value: 1462725954.9999998,
        formattedValue: "US$1,462,725,955",
        tooltip: {
          header: "HIV",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM 2",
              count: 8,
              investment: 1462725954.9999998,
            },
          ],
          totalInvestments: {
            commited: 1575765642.66,
            disbursed: 1462725954.9999998,
            signed: 1802434435.6299999,
          },
          percValue: "92.83",
        },
        color: "#ADB5BD",
      },
    ],
  },
  {
    name: "RSSH",
    value: 12406794003.499992,
    formattedValue: "US$12,406,794,003",
    tooltip: {
      header: "RSSH",
      componentsStats: [
        {
          name: "RSSH",
          count: 585,
          investment: 22406794003.499992,
        },
      ],
      totalInvestments: {
        commited: 23470867864.36001,
        disbursed: 22406794003.499992,
        signed: 25509347381.529987,
      },
      percValue: "99.88",
    },
    color: "rgba(134, 142, 150, 0.3)",
    _children: [
      {
        name: "Comprehensive prevention programes for MSM 1",
        value: 1469001508.8300002,
        formattedValue: "US$1,469,001,509",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM 1",
              count: 6,
              investment: 1469001508.8300002,
            },
          ],
          totalInvestments: {
            commited: 1473744545.5800002,
            disbursed: 1469001508.8300002,
            signed: 1475159376.8000002,
          },
          percValue: "99.68",
        },
        color: "#ADB5BD",
      },
      {
        name: "Comprehensive prevention programes for MSM 2",
        value: 1462725954.9999998,
        formattedValue: "US$1,462,725,955",
        tooltip: {
          header: "RSSH",
          componentsStats: [
            {
              name: "Comprehensive prevention programes for MSM 2",
              count: 8,
              investment: 1462725954.9999998,
            },
          ],
          totalInvestments: {
            commited: 1575765642.66,
            disbursed: 1462725954.9999998,
            signed: 1802434435.6299999,
          },
          percValue: "92.83",
        },
        color: "#ADB5BD",
      },
    ],
  },
];
