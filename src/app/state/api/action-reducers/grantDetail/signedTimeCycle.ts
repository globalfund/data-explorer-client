import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailSignedTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/time-cycle`),
};

export default GrantDetailSignedTimeCycle;
