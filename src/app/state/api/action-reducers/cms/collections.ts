import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

export const countrySummary: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/country-summaries`),
};
