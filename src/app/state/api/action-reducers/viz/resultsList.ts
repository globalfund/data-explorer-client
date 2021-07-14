import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ResultsList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results`),
};

export default ResultsList;

export const ResultsStats: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results-stats`),
};

export const ResultsYears: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results/years`),
};
