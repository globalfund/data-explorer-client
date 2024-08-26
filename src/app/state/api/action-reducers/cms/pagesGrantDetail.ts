import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const pagesGrantDetail: CMSApiCallModel = {
  ...APIModel(`${process.env.REACT_APP_CMS_API}/pages-grant-detail?locale=all`),
};

export const pagesGrantDocuments: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-grant-documents?locale=all`
  ),
};

export const pagesGrantGrantImplementation: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-grant-grant-implementation?locale=all`
  ),
};

export const pagesGrantOverview: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-grant-overview?locale=all`
  ),
};

export const pagesGrantTargetResults: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/pages-grant-target-results?locale=all`
  ),
};

export default pagesGrantDetail;
