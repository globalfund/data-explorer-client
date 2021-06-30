import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailInfo: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/detail`),
};

export default GrantDetailInfo;
