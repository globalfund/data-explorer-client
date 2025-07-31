import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailDisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/treemap`),
};

export default PartnerDetailDisbursementsTreemap;

export const PartnerDetailDisbursementsTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/treemap/drilldown`),
};
