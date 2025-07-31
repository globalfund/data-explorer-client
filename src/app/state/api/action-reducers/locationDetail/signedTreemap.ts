import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailSignedTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/location/signed/treemap`),
};

export default LocationDetailSignedTreemap;

export const LocationDetailSignedTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/treemap/drilldown`),
};
