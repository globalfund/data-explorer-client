import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetBreakdown: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/budgets/breakdown/{year}/{componentField}/{geographyGrouping}`
  ),
};
