import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/table`),
};

export default PledgesContributionsTable;
