import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Eligibility: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility`),
};

export default Eligibility;
