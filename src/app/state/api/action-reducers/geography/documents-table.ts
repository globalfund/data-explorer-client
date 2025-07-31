import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyDocumentsTable: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/documents`),
};
