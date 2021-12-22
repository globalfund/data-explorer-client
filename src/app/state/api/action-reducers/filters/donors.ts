import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DonorFilterOptions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/filter-options/donors`),
};

export default DonorFilterOptions;
