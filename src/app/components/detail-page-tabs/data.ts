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

export const GRANT_TABS: DetailPageTabItem[] = [
  {
    label: "Overview",
    link: "/overview",
  },
  {
    label: "Financial Insights",
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

export const LOCATION_TABS: DetailPageTabItem[] = [
  {
    label: "Overview",
    link: "/overview",
  },
  {
    label: "Resource Mobilization",
    link: "/resource-mobilization",
  },
  {
    label: "Access to Funding",
    link: "/access-to-funding",
  },
  {
    label: "Financial Insights",
    link: "/financial-insights",
  },
  {
    label: "Results",
    link: "/results",
  },
];
