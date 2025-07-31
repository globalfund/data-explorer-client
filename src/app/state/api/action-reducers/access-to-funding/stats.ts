import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AccessToFundingStats: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/stats/{year}`),
};
