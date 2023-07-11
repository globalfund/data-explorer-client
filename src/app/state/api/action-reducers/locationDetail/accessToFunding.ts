import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const EligibilityLocation: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/table`),
};

export const FundingRequestsTable: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/funding-requests/table`),
};

export const GrantCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant-cycles`),
};

export const TRPWindowCodelist: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/funding-requests/trp-window/codelist`
  ),
};

export const PortfolioCategoryCodelist: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/funding-requests/portfolio-categories/codelist`
  ),
};
