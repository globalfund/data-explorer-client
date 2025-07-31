import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailInfo: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/partner/detail`),
};

export default PartnerDetailInfo;
