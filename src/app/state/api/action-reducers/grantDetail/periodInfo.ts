import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPeriodInfo: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/period/info`),
};

export default GrantDetailPeriodInfo;
