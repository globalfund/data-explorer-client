import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FinancialInsightsHGISankey: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/hgi/sankey`),
};
