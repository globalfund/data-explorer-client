import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailCommitmentTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/location/commitment/treemap`),
};

export default LocationDetailCommitmentTreemap;

export const LocationDetailCommitmentTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/treemap/drilldown`),
};
