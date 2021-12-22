import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DisbursementsTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/time-cycle`),
};

export default DisbursementsTimeCycle;

export const DisbursementsTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/disbursements/time-cycle/drilldown`
  ),
};
