import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const SignedTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/treemap`),
};

export default SignedTreemap;

export const SignedTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/treemap/drilldown`),
};

export const SignedTimeCycle: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/time-cycle`),
};

export const SignedTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/time-cycle/drilldown`),
};

export const SignedTimeCycleDrilldown2: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/signed/treemap/drilldown`),
};
