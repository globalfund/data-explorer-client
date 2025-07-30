import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/time-cycle`),
};

export default PledgesContributionsTimeCycle;

export const PledgesContributionsTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/pledges-contributions/time-cycle/drilldown`,
  ),
};
