import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsStats: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/financial-insights/stats/{componentField}/{geographyGrouping}`,
  ),
};
