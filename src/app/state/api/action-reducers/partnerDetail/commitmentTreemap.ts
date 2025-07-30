import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailCommitmentTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/treemap`),
};

export default PartnerDetailCommitmentTreemap;

export const PartnerDetailCommitmentTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/treemap/drilldown`),
};
