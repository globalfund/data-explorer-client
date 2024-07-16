import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetTable: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/budgets/table/{componentField}/{geographyGrouping}`
  ),
};
