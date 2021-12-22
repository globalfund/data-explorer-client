import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/treemap`),
};

export default PledgesContributionsTreemap;
