import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailCommitmentTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/commitment/time-cycle`),
};

export default GrantDetailCommitmentTimeCycle;
