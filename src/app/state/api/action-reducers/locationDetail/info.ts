import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailInfo: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/location/detail`),
};

export default LocationDetailInfo;
