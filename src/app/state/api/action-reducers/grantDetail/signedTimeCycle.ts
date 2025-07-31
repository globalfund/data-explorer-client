import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailSignedTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/time-cycle`),
};

export default GrantDetailSignedTimeCycle;
