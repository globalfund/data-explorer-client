import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsChartsEligibility: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/componentsChartsEligibility?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default componentsChartsEligibility;