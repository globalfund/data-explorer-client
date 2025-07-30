import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const FundingRequestsTableGeneric: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/funding-requests/table`),
};
