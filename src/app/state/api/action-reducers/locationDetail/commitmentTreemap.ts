import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailCommitmentTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/location/commitment/treemap`),
};

export default LocationDetailCommitmentTreemap;

export const LocationDetailCommitmentTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/commitment/treemap/drilldown`),
};
