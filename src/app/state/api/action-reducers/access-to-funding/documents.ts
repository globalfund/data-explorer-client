import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

const AccessToFundingDocuments: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/documents`),
};

export default AccessToFundingDocuments;
