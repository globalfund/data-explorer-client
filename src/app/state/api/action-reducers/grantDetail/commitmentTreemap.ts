import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailCommitmentTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/commitment/treemap`),
};

export default GrantDetailCommitmentTreemap;
