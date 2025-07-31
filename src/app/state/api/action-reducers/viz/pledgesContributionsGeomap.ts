import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PledgesContributionsGeomap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/geomap`),
};

export default PledgesContributionsGeomap;
