import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ConceptDisbursementsDimensions: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursementss/dimensions`),
};

export default ConceptDisbursementsDimensions;
