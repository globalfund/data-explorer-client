import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const HomePledgesContributionsBarChart: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/bar`),
};
