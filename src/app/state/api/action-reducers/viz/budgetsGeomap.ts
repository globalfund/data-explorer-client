import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const BudgetsGeomap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/geomap`),
};

export default BudgetsGeomap;
