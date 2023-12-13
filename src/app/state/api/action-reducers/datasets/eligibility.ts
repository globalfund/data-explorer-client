import { APIModel } from "../..";
import { ApiCallModel } from "../../interfaces";

export const EligibilityDataset: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility-dataset`),
};
