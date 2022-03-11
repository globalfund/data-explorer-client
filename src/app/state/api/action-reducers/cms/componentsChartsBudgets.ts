import { APIModel } from "app/state/api";
import { CMSApiCallModel } from "app/state/api/interfaces";

const componentsChartsBudgets: CMSApiCallModel = {
  ...APIModel(
    `${process.env.REACT_APP_CMS_API}/singletons/get/componentsChartsBudgets?token=${process.env.REACT_APP_CMS_TOKEN}`
  ),
};

export default componentsChartsBudgets;