import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsChartsGeomap: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/content/item/componentsChartsGeomap`
  ),
};

export default componentsChartsGeomap;