import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const notesAndDisclaimers: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/collections/get/notesAndDisclaimers?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default notesAndDisclaimers;
