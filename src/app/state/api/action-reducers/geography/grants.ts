import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyGrantsPieCharts: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/location/{code}/grants/pie-charts`),
};

export const GeographyGrantsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grants/{page}/{pageSize}`),
};
