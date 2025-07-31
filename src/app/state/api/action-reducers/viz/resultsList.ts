import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ResultsList: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/results`),
};

export default ResultsList;

export const ResultsStats: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/results-stats`),
};

export const ResultsYears: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/results/cycles`),
};
