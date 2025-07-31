import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyAllocationsRadialChart: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/radial/{code}`),
};
