import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const general: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/general?locale=all`),
};

export default general;
