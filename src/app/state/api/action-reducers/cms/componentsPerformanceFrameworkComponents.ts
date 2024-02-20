import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsPerformanceFrameworkComponents: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/content/item/componentsPerformanceFrameworkComponents`
  ),
};

export default componentsPerformanceFrameworkComponents;