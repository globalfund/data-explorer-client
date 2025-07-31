import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DonorFilterOptions: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/filter-options/donors`),
};

export default DonorFilterOptions;
