import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsExpendituresTable: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/expenditures/table/{componentField}/{geographyGrouping}`,
  ),
};
