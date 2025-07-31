import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ComponentFilterOptions: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/filter-options/components/{type}`),
};

export const ResultsComponentFilterOptions: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/filter-options/results/components`),
};

export default ComponentFilterOptions;
