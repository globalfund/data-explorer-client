import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationGrants: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grants/radial`),
};

export default LocationGrants;
