import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyGrantsPieCharts: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/location/{code}/grants/pie-charts`),
};

export const GeographyGrantsTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grants/{page}/{pageSize}`),
};
