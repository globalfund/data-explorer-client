import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetTreemap: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/budgets/treemap/{componentField}/{geographyGrouping}`,
  ),
};
