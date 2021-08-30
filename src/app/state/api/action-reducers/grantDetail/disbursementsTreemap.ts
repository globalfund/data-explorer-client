import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailDisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/disbursements/treemap`),
};

export default GrantDetailDisbursementsTreemap;
