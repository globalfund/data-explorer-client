import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsDisbursementUtilisation: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/disbursements/utilization/{componentField}/{geographyGrouping}`,
  ),
};
