import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationFilterOptions: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/filter-options/geography/{type}`),
};

export default LocationFilterOptions;
