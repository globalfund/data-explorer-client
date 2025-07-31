import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/treemap`),
};

export default PledgesContributionsTreemap;
