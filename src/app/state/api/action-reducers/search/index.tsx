import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GlobalSearch: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/global-search`),
};

export default GlobalSearch;
