import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const BudgetsGeomap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/geomap`),
};

export default BudgetsGeomap;

export const BudgetsMCGeomap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/geomap/multicountries`),
};
