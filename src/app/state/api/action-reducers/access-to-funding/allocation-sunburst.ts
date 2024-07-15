import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AccessToFundingAllocationSunburst: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations/sunburst`),
};
