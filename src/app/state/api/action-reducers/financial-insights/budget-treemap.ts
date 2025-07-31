import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetTreemap: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/budgets/treemap/{componentField}/{geographyGrouping}`,
  ),
};
