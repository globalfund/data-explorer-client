import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailDisbursementsTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/disbursements/time-cycle`),
};

export default GrantDetailDisbursementsTimeCycle;
