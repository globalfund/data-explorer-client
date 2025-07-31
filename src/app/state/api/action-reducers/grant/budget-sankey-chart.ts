import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GrantBudgetSankeyChart: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/grant/{code}/{ip}/grant-implementation/sankey/{variant}`,
  ),
};
