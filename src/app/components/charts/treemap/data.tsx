import { appColors } from "app/theme";

export interface TreemapDataItem {
  name: string;
  value: number;
  itemStyle: {
    color: string;
  };
  label: {
    normal: {
      color: string;
    };
  };
  children?: TreemapDataItem[];
}

export interface TreemapProps {
  data: TreemapDataItem[];
}

export const STORY_DATA_VARIANT_1: TreemapDataItem[] = [
  {
    name: "2018",
    value: 1000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_5,
    },
    label: {
      normal: {
        color: appColors.COMMON.BLACK,
      },
    },
  },
  {
    name: "2019",
    value: 2000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_4,
    },
    label: {
      normal: {
        color: appColors.COMMON.BLACK,
      },
    },
  },
  {
    name: "2020",
    value: 3000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_3,
    },
    label: {
      normal: {
        color: appColors.COMMON.WHITE,
      },
    },
  },
  {
    name: "2021",
    value: 4000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_2,
    },
    label: {
      normal: {
        color: appColors.COMMON.WHITE,
      },
    },
  },
  {
    name: "2022",
    value: 5000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_1,
    },
    label: {
      normal: {
        color: appColors.COMMON.WHITE,
      },
    },
  },
];

export const STORY_DATA_VARIANT_2: TreemapDataItem[] = [
  {
    name: "Multicomponent",
    value: 1000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_5,
    },
    label: {
      normal: {
        color: appColors.COMMON.BLACK,
      },
    },
    children: [
      {
        name: "Afghanistan",
        value: 100000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_5,
        },
        label: {
          normal: {
            color: appColors.COMMON.BLACK,
          },
        },
      },
      {
        name: "Kenya",
        value: 200000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_5,
        },
        label: {
          normal: {
            color: appColors.COMMON.BLACK,
          },
        },
      },
    ],
  },
  {
    name: "RSSH",
    value: 2000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_4,
    },
    label: {
      normal: {
        color: appColors.COMMON.BLACK,
      },
    },
    children: [
      {
        name: "Afghanistan",
        value: 100000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_4,
        },
        label: {
          normal: {
            color: appColors.COMMON.BLACK,
          },
        },
      },
      {
        name: "Kenya",
        value: 200000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_4,
        },
        label: {
          normal: {
            color: appColors.COMMON.BLACK,
          },
        },
      },
    ],
  },
  {
    name: "Malaria",
    value: 3000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_3,
    },
    label: {
      normal: {
        color: appColors.COMMON.WHITE,
      },
    },
    children: [
      {
        name: "Afghanistan",
        value: 100000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_3,
        },
        label: {
          normal: {
            color: appColors.COMMON.WHITE,
          },
        },
      },
      {
        name: "Kenya",
        value: 200000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_3,
        },
        label: {
          normal: {
            color: appColors.COMMON.WHITE,
          },
        },
      },
    ],
  },
  {
    name: "Tuberculosis",
    value: 4000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_2,
    },
    label: {
      normal: {
        color: appColors.COMMON.WHITE,
      },
    },
    children: [
      {
        name: "Afghanistan",
        value: 100000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_2,
        },
        label: {
          normal: {
            color: appColors.COMMON.WHITE,
          },
        },
      },
      {
        name: "Kenya",
        value: 200000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_2,
        },
        label: {
          normal: {
            color: appColors.COMMON.WHITE,
          },
        },
      },
    ],
  },
  {
    name: "HIV",
    value: 5000000,
    itemStyle: {
      color: appColors.TREEMAP.NODE_COLOR_1,
    },
    label: {
      normal: {
        color: appColors.COMMON.WHITE,
      },
    },
    children: [
      {
        name: "Afghanistan",
        value: 100000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_1,
        },
        label: {
          normal: {
            color: appColors.COMMON.WHITE,
          },
        },
      },
      {
        name: "Kenya",
        value: 200000,
        itemStyle: {
          color: appColors.TREEMAP.SUB_NODE_COLOR_1,
        },
        label: {
          normal: {
            color: appColors.COMMON.WHITE,
          },
        },
      },
    ],
  },
];
