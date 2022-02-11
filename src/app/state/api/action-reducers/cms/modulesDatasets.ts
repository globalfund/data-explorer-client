import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const modulesDatasets: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/modulesDatasets?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default modulesDatasets;
