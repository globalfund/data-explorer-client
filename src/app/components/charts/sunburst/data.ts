export interface SunburstDataItem {
  name: string;
  value: number;
  children?: SunburstDataItem[];
  itemStyle?: Record<string, string | number>;
}

export interface SunburstProps {
  data: SunburstDataItem[];
}

export const STORY_DATA_VARIANT_1: SunburstDataItem[] = [
  {
    name: "Affordable Medicines Facility - malaria (AMFm)",
    value: 1000000,
    children: [
      {
        name: "AMFm1",
        value: 500000,
      },
      {
        name: "AMFm2",
        value: 500000,
      },
    ],
  },
  {
    name: "Corporation",
    value: 500000,
    children: [
      {
        name: "Corporation1",
        value: 270000,
      },
      {
        name: "Corporation2",
        value: 230000,
      },
    ],
  },
  {
    name: "Debt2Health",
    value: 2000000,
    children: [
      {
        name: "Debt2Health1",
        value: 1000000,
      },
      {
        name: "Debt2Health2",
        value: 1000000,
      },
    ],
  },
  {
    name: "Faith-Based Organization",
    value: 2500000,
    children: [
      {
        name: "Faith-Based Organization1",
        value: 1500000,
      },
      {
        name: "Faith-Based Organization2",
        value: 1000000,
      },
    ],
  },
];
