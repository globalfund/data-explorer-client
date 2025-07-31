import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationGrants: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grants/radial`),
};

export default LocationGrants;
