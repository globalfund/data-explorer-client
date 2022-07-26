import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ComponentFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/components`),
};

export default ComponentFilterOptions;
