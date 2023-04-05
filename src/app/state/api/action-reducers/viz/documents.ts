import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const Documents: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/documents`),
};

export const DocumentsPeriods: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/documents/periods`),
};

export default Documents;
