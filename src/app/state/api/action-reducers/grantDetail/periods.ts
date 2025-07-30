import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPeriods: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/periods`),
};

export default GrantDetailPeriods;
