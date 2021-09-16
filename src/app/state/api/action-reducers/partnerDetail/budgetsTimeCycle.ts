import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailBudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/time-cycle`),
};

export default PartnerDetailBudgetsTimeCycle;

export const PartnerDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};
