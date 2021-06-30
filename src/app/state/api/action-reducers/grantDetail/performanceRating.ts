import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailPerformanceRating: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/performance-rating`),
};

export default GrantDetailPerformanceRating;
