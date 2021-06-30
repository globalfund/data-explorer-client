import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPerformanceFramework: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/performance-framework`),
};

export default GrantDetailPerformanceFramework;

export const GrantDetailPerformanceFrameworkExpand: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/performance-framework/expand`),
};
