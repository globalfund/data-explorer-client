import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const GrantDetailDocuments: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/grant-documents`),
};

export default GrantDetailDocuments;
