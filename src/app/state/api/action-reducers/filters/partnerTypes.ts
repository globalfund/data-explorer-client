import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const PartnerTypeFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/partner-types`),
};

export default PartnerTypeFilterOptions;
