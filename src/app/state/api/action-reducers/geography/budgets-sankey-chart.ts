import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyBudgetSankeyChart: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/budgets/sankey/{componentField}/Standard View`,
  ),
};
