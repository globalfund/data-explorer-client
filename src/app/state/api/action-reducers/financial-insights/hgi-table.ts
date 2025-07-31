import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsHGITable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/hgi/table`),
};
