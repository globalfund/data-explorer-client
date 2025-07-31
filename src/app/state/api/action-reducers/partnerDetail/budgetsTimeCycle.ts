import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerDetailBudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/time-cycle`),
};

export default PartnerDetailBudgetsTimeCycle;

export const PartnerDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown`),
};

export const PartnerDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown/2`),
};
