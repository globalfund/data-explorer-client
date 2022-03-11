import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const modulesCountryDetail: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/modulesCountryDetail?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default modulesCountryDetail;
