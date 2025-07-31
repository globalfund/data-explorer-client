import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AccessToFundingAllocationBarSeries: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/cumulative-by-cycles`),
};
