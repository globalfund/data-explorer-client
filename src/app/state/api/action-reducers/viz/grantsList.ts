import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantsList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grants`),
};

export default GrantsList;
