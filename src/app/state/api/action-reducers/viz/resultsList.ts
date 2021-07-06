import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ResultsList: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/results`),
};

export default ResultsList;
