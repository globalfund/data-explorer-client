import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GrantDisbursementsBarChart: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/grant/{code}/{ip}/grant-implementation/bar`,
  ),
};
