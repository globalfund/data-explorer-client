import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const StatusFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/status`),
};

export default StatusFilterOptions;
