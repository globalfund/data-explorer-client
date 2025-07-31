import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailBudgetsFlow: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/flow`),
};

export default LocationDetailBudgetsFlow;

export const LocationDetailBudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown`),
};

export const LocationDetailBudgetsFlowDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/drilldown/2`),
};
