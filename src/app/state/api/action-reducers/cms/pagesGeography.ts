import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesGeography: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/pages-geography?locale=all`),
};

export default pagesGeography;
