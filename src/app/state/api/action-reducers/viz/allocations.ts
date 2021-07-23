import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Allocations: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations`),
};

export default Allocations;

export const AllocationsDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations/drilldown`),
};

export const AllocationsPeriods: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/allocations/periods`),
};
