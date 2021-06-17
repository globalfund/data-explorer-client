import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const DisbursementsTreemap: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/disbursements/treemap`),
};

export default DisbursementsTreemap;
