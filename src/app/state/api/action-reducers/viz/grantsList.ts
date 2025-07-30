import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantsList: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grants`),
};

export default GrantsList;
