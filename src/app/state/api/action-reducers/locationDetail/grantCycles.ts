import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant-cycles`),
};

export default GrantCycles;
