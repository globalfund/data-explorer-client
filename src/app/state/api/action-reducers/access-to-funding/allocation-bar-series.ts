import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AccessToFundingAllocationBarSeries: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations/cumulative-by-cycles`),
};
