import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailDisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/location/disbursements/treemap`),
};

export default LocationDetailDisbursementsTreemap;

export const LocationDetailDisbursementsTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/treemap/drilldown`),
};
