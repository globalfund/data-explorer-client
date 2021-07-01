import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPeriodInfo: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/period/info`),
};

export default GrantDetailPeriodInfo;
