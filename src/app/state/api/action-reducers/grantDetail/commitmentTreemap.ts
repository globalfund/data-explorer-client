import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailCommitmentTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/commitment/treemap`),
};

export default GrantDetailCommitmentTreemap;
