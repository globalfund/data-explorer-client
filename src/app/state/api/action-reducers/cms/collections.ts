import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

export const countrySummary: CMSApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_CMS_API}/country-summaries`),
};
