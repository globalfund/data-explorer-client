import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const ChartGet: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/chart`),
};

export const ChartCreate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/chart`),
};

export const ChartUpdate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/chart`),
};

export const ChartDelete: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/chart`),
};

export const ChartDuplicate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/chart/duplicate`),
};

export const ChartGetList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/charts`),
};
