import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsExpendituresBarChart: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/expenditures/expandable-bar/{componentField}`
  ),
};
