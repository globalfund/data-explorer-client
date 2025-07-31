import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const StatusFilterOptions: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/filter-options/status`),
};

export default StatusFilterOptions;
