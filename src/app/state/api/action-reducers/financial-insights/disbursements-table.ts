import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsDisbursementsTable: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/disbursements/table/{componentField}/{geographyGrouping}`,
  ),
};
