import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const CommitmentTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/commitment/treemap`),
};

export default CommitmentTreemap;

export const CommitmentTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/commitment/treemap/drilldown`),
};

export const CommitmentTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/commitment/time-cycle`),
};

export const CommitmentTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/commitment/time-cycle/drilldown`),
};
