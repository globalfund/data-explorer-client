import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyExpendituresHeatmap: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/expenditures/heatmap/{row}/{column}`
  ),
};
