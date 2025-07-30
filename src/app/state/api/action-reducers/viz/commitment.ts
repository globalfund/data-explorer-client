import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const CommitmentTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/treemap`),
};

export default CommitmentTreemap;

export const CommitmentTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/treemap/drilldown`),
};

export const CommitmentTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/time-cycle`),
};

export const CommitmentTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/time-cycle/drilldown`),
};

export const CommitmentTimeCycleDrilldown2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/commitment/time-cycle/drilldown/2`),
};
