import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsExpendituresHeatmap: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/expenditures/heatmap/{row}/{column}/{componentField}/{geographyGrouping}`,
  ),
};
