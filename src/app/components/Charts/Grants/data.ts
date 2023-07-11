import { appColors } from "app/theme";

export interface GrantsVizProps {
  data: any;
}

export const ratingColor = {
  None: appColors.COMMON.WHITE,
  A1: appColors.GRANTS.LATEST_RATING_COLOR_1,
  A2: appColors.GRANTS.LATEST_RATING_COLOR_2,
  B1: appColors.GRANTS.LATEST_RATING_COLOR_3,
  B2: appColors.GRANTS.LATEST_RATING_COLOR_4,
  C: appColors.GRANTS.LATEST_RATING_COLOR_5,
};

export const statusBorderStyle = {
  Active: "solid",
  "In Closure": "dashed",
  "Administratively Closed": "dotted",
};

export const circleLegendPositions = [
  [
    {
      top: -30,
      left: "49%",
    },
  ],
  [
    {
      top: 150,
      left: 30,
    },
    {
      top: 150,
      right: 30,
    },
  ],
  [
    {
      top: 150,
      left: 30,
    },
    {
      top: -30,
      left: "49%",
    },
    {
      top: 150,
      right: 30,
    },
  ],
  [
    {
      top: 200,
    },
    {
      left: 200,
    },
    {
      right: 200,
    },
    {
      top: 200,
      right: -20,
    },
  ],
  [
    {
      top: 250,
    },
    {
      top: 70,
      left: 100,
    },
    {
      top: -30,
      left: "49%",
    },
    {
      top: 70,
      right: 100,
    },
    {
      top: 250,
      right: 0,
    },
  ],
  [
    {
      top: 275,
    },
    {
      top: 75,
      left: 75,
    },
    {
      top: -30,
      left: 300,
    },
    {
      top: -30,
      right: 300,
    },
    {
      top: 75,
      right: 75,
    },
    {
      top: 275,
      right: 0,
    },
  ],
];
