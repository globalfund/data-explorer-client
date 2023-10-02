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

export const DataThemeDelete: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/data-themes`),
};

export const DataThemeDuplicate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/data-themes/duplicate`),
};

export const DataThemeGetList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/data-themes-with-viz-count`),
};

export const DatasetGetList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/datasets`),
};

export const DatasetCreate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/datasets`),
};
