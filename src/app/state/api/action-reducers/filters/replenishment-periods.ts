import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ReplenishmentPeriodFilterOptions: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/filter-options/replenishment-periods`,
  ),
};

export default ReplenishmentPeriodFilterOptions;
