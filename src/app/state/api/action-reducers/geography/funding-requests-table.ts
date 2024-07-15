import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyFundingRequestsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/funding-requests/{code}`),
};
