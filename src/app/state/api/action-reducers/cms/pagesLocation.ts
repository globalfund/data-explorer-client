import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesLocation: CMSApiCallModel = {
  ...APIModel(`${import.meta.env.VITE_CMS_API}/pages-location?locale=all`),
};

export const pagesLocationAccessToFunding: CMSApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_CMS_API}/pages-location-access-to-funding?locale=all`,
  ),
};

export const pagesLocationGrantImplementation: CMSApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_CMS_API}/pages-location-grant-implementation?locale=all`,
  ),
};

export const pagesLocationOverview: CMSApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_CMS_API}/pages-location-overview?locale=all`,
  ),
};

export const pagesLocationResourceMobilization: CMSApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_CMS_API}/pages-location-resource-mobilization?locale=all`,
  ),
};

export const pagesLocationResults: CMSApiCallModel = {
  ...APIModel(
    `${import.meta.env.VITE_CMS_API}/pages-location-results?locale=all`,
  ),
};

export default pagesLocation;
