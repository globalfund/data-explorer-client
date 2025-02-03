import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/time-cycle`),
};

export default PledgesContributionsTimeCycle;

export const PledgesContributionsTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/pledges-contributions/time-cycle/drilldown`,
  ),
};
