import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyFundingRequestsTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/funding-requests/{code}`),
};
