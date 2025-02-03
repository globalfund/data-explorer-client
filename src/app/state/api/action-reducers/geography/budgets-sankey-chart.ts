import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyBudgetSankeyChart: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/budgets/sankey/{componentField}/Standard View`,
  ),
};
