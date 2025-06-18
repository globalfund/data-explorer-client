import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentFooter: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/components-footer?locale=all`),
};

export default componentFooter;
