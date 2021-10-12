import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailSignedTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/treemap`),
};

export default PartnerDetailSignedTreemap;

export const PartnerDetailSignedTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/treemap/drilldown`),
};
