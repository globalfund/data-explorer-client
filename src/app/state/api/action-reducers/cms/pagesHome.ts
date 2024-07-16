import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesHome: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/pages-home?locale=all`),
};

export default pagesHome;
