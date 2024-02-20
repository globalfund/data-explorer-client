import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const modulesCommon: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/content/item/modulesCommon`
  ),
};

export default modulesCommon;
