import { APIModel } from "app/state/api";
import { ApiCallModel } from "app/state/api/interfaces";

export const GeographyOverview: ApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_API}/location/{code}/info`),
};

export const GeographyOverviewCoordinatingMechanismsContacts: ApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_API}/location/coordinating-mechanism/{code}/contacts`,
  ),
};
