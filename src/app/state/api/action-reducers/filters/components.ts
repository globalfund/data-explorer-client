import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ComponentFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/components/{type}`),
};

export const ResultsComponentFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/results/components`),
};

export default ComponentFilterOptions;
