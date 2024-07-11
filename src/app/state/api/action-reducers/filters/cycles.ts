import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

// Global

export const AllocationsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations/cycles`),
};

export const FundingRequestsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/funding-requests/cycles`),
};

export const AnnualResultsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results/cycles`),
};

export const BudgetsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/cycles`),
};

export const PledgesContributionsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/cycles`),
};

export const DisbursementsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/cycles`),
};

export const ExpendituresCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/expenditures/cycles`),
};

export const EligibilityCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/years`),
};

// Location/Geography

export const GeographyAllocationsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations/cycles`),
};

export const GeographyFundingRequestsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/funding-requests/cycles`),
};

export const GeographyAnnualResultsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results/cycles`),
};

export const GeographyBudgetsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/budgets/cycles`),
};

export const GeographyPledgesContributionsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/pledges-contributions/cycles`),
};

export const GeographyDisbursementsCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/cycles`),
};

export const GeographyExpendituresCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/expenditures/cycles`),
};

export const GeographyEligibilityCycles: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/eligibility/years`),
};
