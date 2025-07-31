import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsExpendituresBarChart: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/expenditures/expandable-bar/{componentField}/{geographyGrouping}`,
  ),
};
