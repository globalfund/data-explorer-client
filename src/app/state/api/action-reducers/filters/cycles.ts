import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

// Global

export const AllocationsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/cycles`),
};

export const FundingRequestsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/funding-requests/cycles`),
};

export const AnnualResultsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/results/cycles`),
};

export const BudgetsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/cycles`),
};

export const FinancialMetricsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/financial-metrics/cycles`),
};

export const PledgesContributionsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/cycles`),
};

export const DisbursementsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/cycles`),
};

export const ExpendituresCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/expenditures/cycles`),
};

export const EligibilityCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/years`),
};

// Location/Geography

export const GeographyAllocationsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/cycles`),
};

export const GeographyFundingRequestsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/funding-requests/cycles`),
};

export const GeographyAnnualResultsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/results/cycles`),
};

export const GeographyBudgetsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/budgets/cycles`),
};

export const GeographyPledgesContributionsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/pledges-contributions/cycles`),
};

export const GeographyDisbursementsCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/disbursements/cycles`),
};

export const GeographyExpendituresCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/expenditures/cycles`),
};

export const GeographyEligibilityCycles: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/eligibility/years`),
};
