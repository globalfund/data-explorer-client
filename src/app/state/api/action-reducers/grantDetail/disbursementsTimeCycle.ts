import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailDisbursementsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/disbursements/time-cycle`),
};

export default GrantDetailDisbursementsTimeCycle;
