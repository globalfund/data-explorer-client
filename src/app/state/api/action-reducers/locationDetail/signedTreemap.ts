import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailSignedTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/location/signed/treemap`),
};

export default LocationDetailSignedTreemap;

export const LocationDetailSignedTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/treemap/drilldown`),
};
