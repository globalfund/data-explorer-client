import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailInfo: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/location/detail`),
};

export default LocationDetailInfo;
