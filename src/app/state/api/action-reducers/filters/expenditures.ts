import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const ModulesInterventionsFilterOptions: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/filter-options/expenditure/modules-interventions`
  ),
};

export const InvestmentLandscapeFilterOptions: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/filter-options/expenditure/investment-landscapes`
  ),
};
