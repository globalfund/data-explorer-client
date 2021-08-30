import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailBudgetsFlow: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/flow`),
};

export default GrantDetailBudgetsFlow;

export const GrantDetailBudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};
