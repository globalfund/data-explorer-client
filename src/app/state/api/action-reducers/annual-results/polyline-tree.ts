import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AnnualResultsPolyline: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results/polyline/{cycle}`),
};
