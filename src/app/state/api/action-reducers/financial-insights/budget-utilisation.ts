import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetUtilisation: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/budgets/utilization/{componentField}/{geographyGrouping}`,
  ),
};
