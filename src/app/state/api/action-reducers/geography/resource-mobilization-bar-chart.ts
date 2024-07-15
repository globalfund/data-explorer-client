import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyResourceMobilizationBarChart: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/bar`),
};
