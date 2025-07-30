import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GrantExpendituresHeatmap: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/expenditures/heatmap/{row}/{column}/{componentField}/{geographyGrouping}`,
  ),
};

export const GrantHasExpenditures: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/has/expenditures`),
};
