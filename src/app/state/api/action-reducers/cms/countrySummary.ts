import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const countrySummary: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/collections/get/countrySummary?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default countrySummary;
