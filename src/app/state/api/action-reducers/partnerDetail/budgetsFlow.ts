import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailBudgetsFlow: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/flow`),
};

export default PartnerDetailBudgetsFlow;

export const PartnerDetailBudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};

export const PartnerDetailBudgetsFlowDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown/2`),
};
