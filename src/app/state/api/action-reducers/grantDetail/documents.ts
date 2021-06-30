import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailDocuments: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/grant-documents`),
};

export default GrantDetailDocuments;
