import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const BudgetsFlow: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/flow`),
};

export default BudgetsFlow;

export const BudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};

export const BudgetsFlowDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown/2`),
};
