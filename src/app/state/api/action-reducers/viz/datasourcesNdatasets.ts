import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const AvailableDatasources: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/available-datasources`),
};

export const MappedDatasets: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/mapped-datasets`),
};
