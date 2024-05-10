import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const ResourceMobilizationExpandableBarChart: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/pledges-contributions/expandable-bar`
  ),
};
