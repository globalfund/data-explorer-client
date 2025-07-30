import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const EligibilityCountry: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/country`),
};

export default EligibilityCountry;
