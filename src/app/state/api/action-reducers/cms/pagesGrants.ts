import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesGrants: CMSApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_CMS_API}/pages-grants?locale=all`),
};

export default pagesGrants;
