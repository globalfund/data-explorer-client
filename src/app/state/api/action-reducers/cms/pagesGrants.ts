import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesGrants: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/pages-grants?locale=all`),
};

export default pagesGrants;
