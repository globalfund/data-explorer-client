import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsDialogBox: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/componentsDialogBox?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default componentsDialogBox;
