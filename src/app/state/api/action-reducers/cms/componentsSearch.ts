import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsSearch: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/components-search?locale=all`),
};

export default componentsSearch;
