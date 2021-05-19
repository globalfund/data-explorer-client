export interface TabProps {
  url: string;
  name: string;
  index?: number;
}

export interface PageHeaderTabProps {
  tabs: TabProps[];
}

export const countryDetailTabs: TabProps[] = [
  {
    name: "Investements",
    url: "/location/<code>/investments/disbursements",
  },
  {
    name: "Budgets",
    url: "/location/<code>/budgets/flow",
  },
  {
    name: "Allocation",
    url: "/location/<code>/allocation",
  },
  {
    name: "Eligibility",
    url: "/location/<code>/eligibility",
  },
  {
    name: "Documents",
    url: "/location/<code>/documents",
  },
  {
    name: "Grants",
    url: "/location/<code>/grants",
  },
];

export const grantDetailTabs: TabProps[] = [
  {
    name: "Investements",
    url: "/grant/<code>/investments/disbursements",
  },
  {
    name: "Budgets",
    url: "/grant/<code>/budgets/flow",
  },
  {
    name: "Performance Rating",
    url: "/grant/<code>/performance-rating",
  },
  {
    name: "Performance Framework",
    url: "/grant/<code>/performance-framework",
  },
  {
    name: "Documents",
    url: "/grant/<code>/documents",
  },
];
