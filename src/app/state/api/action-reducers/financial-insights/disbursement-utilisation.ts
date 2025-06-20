import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsDisbursementUtilisation: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/disbursements/utilization/{componentField}/{geographyGrouping}`,
  ),
};
