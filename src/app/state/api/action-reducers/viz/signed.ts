import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const SignedTreemap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/treemap`),
};

export default SignedTreemap;

export const SignedTreemapDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/treemap/drilldown`),
};

export const SignedTimeCycle: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/time-cycle`),
};

export const SignedTimeCycleDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/time-cycle/drilldown`),
};

export const SignedTimeCycleDrilldown2: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/signed/treemap/drilldown`),
};
