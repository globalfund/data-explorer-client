import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsDisbursementsBarChart: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/disbursements/bar-chart/{componentField}/{geographyGrouping}/{xAxisVariable}`
  ),
};
