import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsGeomap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/geomap`),
};

export default PledgesContributionsGeomap;
