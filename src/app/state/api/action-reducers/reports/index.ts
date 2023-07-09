import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const ReportGet: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/report`),
};

export const ReportCreate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/report`),
};

export const ReportUpdate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/report`),
};

export const ReportDelete: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/report`),
};

export const ReportDuplicate: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/report/duplicate`),
};

export const ReportGetList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API_DX}/reports`),
};
