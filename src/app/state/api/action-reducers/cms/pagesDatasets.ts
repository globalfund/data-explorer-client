import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesDatasets: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/pages-datasets?locale=all`),
};

export const pagesDatasetsAccessToFunding: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-datasets-access-to-funding?locale=all`,
  ),
};

export const pagesDatasetsAnnualResults: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-datasets-annual-results?locale=all`,
  ),
};

export const pagesDatasetsResourceMobilization: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-datasets-resource-mobilization?locale=all`,
  ),
};

export const pagesDatasetsGrantImplementation: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-datasets-grant-implementation?locale=all`,
  ),
};

export default pagesDatasets;
