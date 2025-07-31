import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailBudgetsFlow: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/flow`),
};

export default GrantDetailBudgetsFlow;

export const GrantDetailBudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown`),
};

export const GrantDetailBudgetsFlowDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown/2`),
};
