import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPerformanceRating: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/performance-rating`),
};

export default GrantDetailPerformanceRating;
