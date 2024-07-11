import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GrantExpendituresHeatmap: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/expenditures/heatmap/{row}/{column}/{componentField}/{geographyGrouping}`
  ),
};

export const GrantHasExpenditures: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/has/expenditures`),
};
