import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailDisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/location/disbursements/treemap`),
};

export default LocationDetailDisbursementsTreemap;

export const LocationDetailDisbursementsTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/treemap/drilldown`),
};
