import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerTypeFilterOptions: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/filter-options/principal-recipients`,
  ),
};

export default PartnerTypeFilterOptions;
