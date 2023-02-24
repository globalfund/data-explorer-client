import { appColors } from "app/theme";
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
  appColors.COMMON.PRIMARY_COLOR_1,
  appColors.COMMON.SECONDARY_COLOR_2,
  appColors.COMMON.SECONDARY_COLOR_4,
  appColors.COMMON.SECONDARY_COLOR_11,
  appColors.COMMON.SECONDARY_COLOR_7,
  appColors.COMMON.SECONDARY_COLOR_10,
  appColors.COMMON.WHITE,
];
