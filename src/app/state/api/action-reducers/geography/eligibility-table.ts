import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyEligibilityTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/table`),
};
