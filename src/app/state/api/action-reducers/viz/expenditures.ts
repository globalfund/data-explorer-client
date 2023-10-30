import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Expenditures: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/expenditures`),
};

export default Expenditures;

export const ExpenditureStats: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/expenditures/stats`),
};
