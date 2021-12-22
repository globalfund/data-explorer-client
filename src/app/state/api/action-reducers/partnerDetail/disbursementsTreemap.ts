import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailDisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/treemap`),
};

export default PartnerDetailDisbursementsTreemap;

export const PartnerDetailDisbursementsTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/treemap/drilldown`),
};
