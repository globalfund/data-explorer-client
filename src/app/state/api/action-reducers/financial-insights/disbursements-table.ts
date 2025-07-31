import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsDisbursementsTable: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/disbursements/table/{componentField}/{geographyGrouping}`,
  ),
};
