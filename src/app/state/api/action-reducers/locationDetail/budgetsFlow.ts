import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailBudgetsFlow: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/flow`),
};

export default LocationDetailBudgetsFlow;

export const LocationDetailBudgetsFlowDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};
