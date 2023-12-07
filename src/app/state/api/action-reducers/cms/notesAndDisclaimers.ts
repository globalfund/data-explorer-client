import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const notesAndDisclaimers: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/content/item/notesAndDisclaimers`
  ),
};

export default notesAndDisclaimers;

/**
https://cms-prod.tgf.nyuki.io/api/singletons/get/componentsAppBar?token=account-fafa59d165d28d24a5de7214435942
https://cms-prod.tgf.nyuki.io/api/collections/get/notesAndDisclaimers?token=account-fafa59d165d28d24a5de7214435942
*/
