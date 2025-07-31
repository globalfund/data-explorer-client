import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const HomeAllocationsRadialChart: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/radial`),
};
