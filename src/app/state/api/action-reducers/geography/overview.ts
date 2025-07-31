import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyOverview: ApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_API}/location/{code}/info`),
};

export const GeographyOverviewCoordinatingMechanismsContacts: ApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_API}/location/coordinating-mechanism/{code}/contacts`,
  ),
};
