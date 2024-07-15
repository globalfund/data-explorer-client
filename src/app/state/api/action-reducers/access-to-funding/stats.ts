import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AccessToFundingStats: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/stats/{year}`),
};
