import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsBudgetSankey: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/sankey`),
};
