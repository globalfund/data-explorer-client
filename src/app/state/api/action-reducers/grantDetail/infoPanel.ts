import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailInfo: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/detail`),
};

export default GrantDetailInfo;
