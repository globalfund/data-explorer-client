import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsStats: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/financial-insights/stats`),
};
