import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPerformanceFramework: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/performance-framework`),
};

export default GrantDetailPerformanceFramework;

export const GrantDetailPerformanceFrameworkExpand: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/performance-framework/expand`),
};
