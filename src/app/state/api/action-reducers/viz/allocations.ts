import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Allocations: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations`),
};

export default Allocations;

export const AllocationsDrilldown: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/drilldown`),
};

export const AllocationsPeriods: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/periods`),
};

export const AllocationsGeomap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/geomap`),
};

export const AllocationsMCGeomap: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/geomap/multicountries`),
};

export const AllocationsTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/allocations/table`),
};
