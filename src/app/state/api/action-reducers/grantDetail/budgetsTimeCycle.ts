import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailBudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/time-cycle`),
};

export default GrantDetailBudgetsTimeCycle;

export const GrantDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};

export const GrantDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown/2`),
};
