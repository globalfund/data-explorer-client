import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyResultsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results/table/{code}/{cycle}`),
};
