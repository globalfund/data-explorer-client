import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyDisbursementsLineChart: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/disbursements/line-chart/{componentField}/Standard View`,
  ),
};
