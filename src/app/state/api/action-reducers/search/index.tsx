import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GlobalSearch: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/global-search`),
};

export default GlobalSearch;

export const GlobalSearchCharts: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/charts`),
};

export const GlobalSearchReports: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/reports`),
};

export const GlobalSearchDatasets: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/datasets`),
};
