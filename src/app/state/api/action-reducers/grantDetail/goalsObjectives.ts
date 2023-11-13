import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPeriodGoalsObjectives: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant/goals-objectives`),
};

export default GrantDetailPeriodGoalsObjectives;
