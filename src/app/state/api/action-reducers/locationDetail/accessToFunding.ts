import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const EligibilityLocation: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/table`),
};

export const FundingRequestsTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/funding-requests/table`),
};

export const GrantCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant-cycles`),
};

export const TRPWindowCodelist: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/funding-requests/trp-window/codelist`,
  ),
};

export const PortfolioCategoryCodelist: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/funding-requests/portfolio-categories/codelist`,
  ),
};
