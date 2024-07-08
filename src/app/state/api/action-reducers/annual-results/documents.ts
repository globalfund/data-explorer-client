import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ResultsDocuments: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/documents`),
};

export default ResultsDocuments;
