import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const BudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/time-cycle`),
};

export default BudgetsTimeCycle;

export const BudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown`),
};

export const BudgetsTimeCycleDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown/2`),
};
