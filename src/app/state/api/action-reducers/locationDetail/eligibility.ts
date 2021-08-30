import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const EligibilityCountry: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/country`),
};

export default EligibilityCountry;
