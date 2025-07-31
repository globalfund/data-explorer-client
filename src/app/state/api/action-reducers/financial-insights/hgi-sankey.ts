import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsHGISankey: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/hgi/sankey`),
};
