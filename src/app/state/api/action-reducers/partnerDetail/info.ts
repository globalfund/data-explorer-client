import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailInfo: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/partner/detail`),
};

export default PartnerDetailInfo;
