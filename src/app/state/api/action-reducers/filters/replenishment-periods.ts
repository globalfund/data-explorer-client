import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ReplenishmentPeriodFilterOptions: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/filter-options/replenishment-periods`
  ),
};

export default ReplenishmentPeriodFilterOptions;
