import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPeriodGoalsObjectives: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant/goals-objectives`),
};

export default GrantDetailPeriodGoalsObjectives;
