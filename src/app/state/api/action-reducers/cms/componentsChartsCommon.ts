import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsChartsCommon: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/componentsChartsCommon?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default componentsChartsCommon;