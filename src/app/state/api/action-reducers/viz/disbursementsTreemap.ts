import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/treemap`),
};

export default DisbursementsTreemap;

export const DisbursementsTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/treemap/drilldown`),
};
