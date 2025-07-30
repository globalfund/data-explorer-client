import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetUtilisation: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/budgets/utilization/{componentField}/{geographyGrouping}`,
  ),
};
