import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/table`),
};

export default PledgesContributionsTable;
