import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const ConceptDisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursementss/treemap`),
};

export default ConceptDisbursementsTreemap;
