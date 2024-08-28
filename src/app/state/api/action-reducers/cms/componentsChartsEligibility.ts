import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsChartsEligibility: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/components-charts-eligibility?locale=all`
  ),
};

export default componentsChartsEligibility;
