import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsHGITable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/hgi/table`),
};
