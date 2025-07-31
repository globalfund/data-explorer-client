import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailSignedTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/treemap`),
};

export default PartnerDetailSignedTreemap;

export const PartnerDetailSignedTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/treemap/drilldown`),
};
