import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const BudgetsFlow: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/flow`),
};

export default BudgetsFlow;

export const BudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown`),
};

export const BudgetsFlowDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown/2`),
};
