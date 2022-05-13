import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const DataThemeGet: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/data-themes`),
};

export const DataThemeCreate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/data-themes`),
};

export const DataThemeUpdate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/data-themes`),
};