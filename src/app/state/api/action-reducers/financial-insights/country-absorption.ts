import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsCountryAbsorption: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/budgets/absorption/{componentField}/{geographyGrouping}`,
  ),
};
