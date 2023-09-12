import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ConceptDisbursementsTotal: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursementss/total`),
};

export default ConceptDisbursementsTotal;
