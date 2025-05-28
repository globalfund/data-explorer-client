import { getCMSDataField } from "app/utils/getCMSDataField";

interface DetailPageTabItem {
  link: string;
  label: string;
}

export interface DetailPageTabsProps {
  baseRoute: string;
  activeTab?: string;
  tabs: DetailPageTabItem[];
  dropdown?: {
    width?: number;
    dropdownSelected: string;
    handleDropdownChange: (value: string) => void;
    dropdownItems: { value: string; label: string }[];
  };
}

export const getGrantTabs = (cmsData: any): DetailPageTabItem[] => {
  const GRANT_TABS: DetailPageTabItem[] = [
    {
      label: getCMSDataField(
        cmsData,
        "pagesGrantDetail.overviewLabel",
        "Overview",
      ),
      link: "/overview",
    },
    {
      label: getCMSDataField(
        cmsData,
        "pagesGrantDetail.financialInsightsLabel",
        "Financial Insights",
      ),
      link: "/financial-insights",
    },
    // {
    //   label: "Target & Results",
    //   link: "/targets-results",
    // },
    // {
    //   label: "Documents",
    //   link: "/documents",
    // },
  ];

  return GRANT_TABS;
};
export const GRANT_DROPDOWN_ITEMS = [
  {
    label: "Implementation Period 1",
    value: "Implementation Period 1",
  },
  {
    label: "Implementation Period 2",
    value: "Implementation Period 2",
  },
  {
    label: "Implementation Period 3",
    value: "Implementation Period 3",
  },
  {
    label: "Implementation Period 4",
    value: "Implementation Period 4",
  },
];

export const getLocationTabs = (cmsData: any): DetailPageTabItem[] => {
  const LOCATION_TABS: DetailPageTabItem[] = [
    {
      label: getCMSDataField(
        cmsData,
        "pagesLocation.overviewLabel",
        "Overview",
      ),
      link: "/overview",
    },
    {
      label: getCMSDataField(
        cmsData,
        "pagesLocation.resourceMobilizationLabel",
        "Resource Mobilization",
      ),
      link: "/resource-mobilization",
    },
    {
      label: getCMSDataField(
        cmsData,
        "pagesLocation.accessToFundingLabel",
        "Access to Funding",
      ),
      link: "/access-to-funding",
    },
    {
      label: getCMSDataField(
        cmsData,
        "pagesLocation.financialInsightsLabel",
        "Financial Insights",
      ),
      link: "/financial-insights",
    },
    {
      label: getCMSDataField(cmsData, "pagesLocation.resultsLabel", "Results"),
      link: "/results",
    },
  ];

  return LOCATION_TABS;
};
