import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ResultsDocuments: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/documents`),
};

export default ResultsDocuments;
