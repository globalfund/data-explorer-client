import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/geography`),
};

export default LocationFilterOptions;
