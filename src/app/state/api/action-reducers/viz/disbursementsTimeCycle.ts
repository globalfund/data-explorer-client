import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DisbursementsTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/time-cycle`),
};

export default DisbursementsTimeCycle;

export const DisbursementsTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/time-cycle/drilldown`),
};

export const DisbursementsTimeCycleDrilldown2: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/disbursements/time-cycle/drilldown/2`,
  ),
};
