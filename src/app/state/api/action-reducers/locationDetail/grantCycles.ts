import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant-cycles`),
};

export default GrantCycles;
