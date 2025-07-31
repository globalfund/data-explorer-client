import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AccessToFundingAllocationTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/treemap`),
};
