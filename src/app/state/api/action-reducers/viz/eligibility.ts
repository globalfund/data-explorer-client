import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Eligibility: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility`),
};

export default Eligibility;

export const EligibilityYears: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/years`),
};

export const EligibilityTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility`),
};

export const EligibilityStatusCodelist: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/status/codelist`),
};

export const EligibilityDiseaseBurdenCodelist: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/eligibility/disease-burden/codelist`,
  ),
};
