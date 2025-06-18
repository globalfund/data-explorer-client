import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentHeader: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/components-header?locale=all`),
};

export default componentHeader;
