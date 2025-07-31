import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailBudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/time-cycle`),
};

export default GrantDetailBudgetsTimeCycle;

export const GrantDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown`),
};

export const GrantDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown/2`),
};
