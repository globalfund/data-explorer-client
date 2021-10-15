import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailCommitmentTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/commitment/time-cycle`),
};

export default GrantDetailCommitmentTimeCycle;
