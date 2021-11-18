import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const LocationDetailBudgetsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/time-cycle`),
};

export default LocationDetailBudgetsTimeCycle;

export const LocationDetailBudgetsTimeCycleDrilldownLevel1: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown`),
};

export const LocationDetailBudgetsTimeCycleDrilldownLevel2: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/drilldown/2`),
};
