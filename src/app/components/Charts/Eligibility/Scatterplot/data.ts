import { Serie } from "@nivo/scatterplot";

export interface ScatterPlotProps {
  data: EligibilityScatterplotDataModel[];
}

export type EligibilityType =
  | "Eligible"
  | "Not Eligible"
  | "Transition Funding";

export interface EligibilityScatterplotDataItemModel {
  x: number;
  y: string;
  incomeLevel: number;
  diseaseBurden: number;
  allocationCycleName?: string | null;
  eligibility: EligibilityType;
  invisible?: boolean;
}

export interface EligibilityScatterplotDataModel extends Serie {
  data: EligibilityScatterplotDataItemModel[];
}

export interface EligibilityScatterplotHoveredNode
  extends EligibilityScatterplotDataItemModel {
  yPosition: number;
  xPosition: number;
}

export const mockdata: EligibilityScatterplotDataModel[] = [
  {
    id: " ",
    data: [
      {
        x: 2002,
        diseaseBurden: 0,
        incomeLevel: 0,
        eligibility: "Not Eligible",
        y: " ",
      },
    ],
  },
  {
    id: "HIV",
    data: [
      {
        y: "HIV",
        x: 2003,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2004,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2005,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2006,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2007,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2008,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2009,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2010,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "HIV",
        x: 2011,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "HIV",
        x: 2012,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "HIV",
        x: 2013,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "HIV",
        x: 2014,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "HIV",
        x: 2015,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "HIV",
        x: 2016,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "HIV",
        x: 2017,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "HIV",
        x: 2018,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "HIV",
        x: 2019,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 3,
      },
      {
        y: "HIV",
        x: 2020,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 3,
      },
      {
        y: "HIV",
        x: 2021,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 3,
      },
    ],
  },
  {
    id: "Malaria",
    data: [
      {
        y: "Malaria",
        x: 2003,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2004,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2005,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2006,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2007,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2008,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2009,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2010,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Malaria",
        x: 2011,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2012,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2013,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2014,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2015,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2016,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2017,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2018,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 2,
      },
      {
        y: "Malaria",
        x: 2019,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "Malaria",
        x: 2020,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "Malaria",
        x: 2021,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
    ],
  },
  {
    id: "RSSH",
    data: [
      {
        y: "RSSH",
        x: 2011,
        eligibility: "Not Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "RSSH",
        x: 2013,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "RSSH",
        x: 2014,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "RSSH",
        x: 2015,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "RSSH",
        x: 2016,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
    ],
  },
  {
    id: "Tuberculosis",
    data: [
      {
        y: "Tuberculosis",
        x: 2003,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2004,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2005,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2006,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2007,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2008,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2009,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2010,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 0,
      },
      {
        y: "Tuberculosis",
        x: 2011,
        eligibility: "Not Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2012,
        eligibility: "Not Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2013,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2014,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2015,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2016,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2017,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2018,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 5,
      },
      {
        y: "Tuberculosis",
        x: 2019,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "Tuberculosis",
        x: 2020,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
      {
        y: "Tuberculosis",
        x: 2021,
        eligibility: "Eligible",
        incomeLevel: 1,
        diseaseBurden: 4,
      },
    ],
  },
  {
    id: "",
    data: [
      {
        x: 2002,
        diseaseBurden: 0,
        incomeLevel: 0,
        eligibility: "Not Eligible",
        y: "",
      },
    ],
  },
];

export type DiseaseBurdenType =
  | "Extreme"
  | "Severe"
  | "High"
  | "Not High"
  | "Moderate"
  | "Low"
  | "None";

export const diseaseBurdens: DiseaseBurdenType[] = [
  "None",
  "Low",
  "Moderate",
  "Not High",
  "High",
  "Severe",
  "Extreme",
];

export type IncomeLevelType =
  | "None"
  | "Low"
  | "Low income"
  | "Lower-Lower middle income"
  | "Lower middle income"
  | "Upper-Lower middle income"
  | "Upper middle income"
  | "High income";

export const incomeLevels: IncomeLevelType[] = [
  "None",
  "Low income",
  "Lower-Lower middle income",
  "Lower middle income",
  "Upper-Lower middle income",
  "Upper middle income",
  "High income",
];

export const incomeLevelColors = [
  "#231d2c",
  "#70777E",
  "#98A1AA",
  "#C7CDD1",
  "#DFE3E6",
  "#F5F5F7",
  "#FFFFFF",
];
