import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const BudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/time-cycle`),
};

export default BudgetsTimeCycle;

export const BudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};
