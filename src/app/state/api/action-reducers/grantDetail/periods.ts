import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPeriods: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/periods`),
};

export default GrantDetailPeriods;
