import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsDisbursementsLineChart: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/disbursements/line-chart/{componentField}/{geographyGrouping}`
  ),
};
