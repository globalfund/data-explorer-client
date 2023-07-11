import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Eligibility: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility`),
};

export default Eligibility;

export const EligibilityYears: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/years`),
};

export const EligibilityTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility`),
};

export const EligibilityStatusCodelist: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/status/codelist`),
};

export const EligibilityDiseaseBurdenCodelist: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/eligibility/disease-burden/codelist`
  ),
};
