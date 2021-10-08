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
    name: "Overview",
    url: "/location/<code>/overview",
  },
  {
    name: "Signed",
    url: "/location/<code>/signed/treemap",
  },
  {
    name: "Commitment",
    url: "/location/<code>/commitment/treemap",
  },
  {
    name: "Disbursement",
    url: "/location/<code>/disbursements/treemap",
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
    name: "Overview",
    url: "/grant/<code>/<period>/overview",
  },
  {
    name: "Signed",
    url: "/grant/<code>/<period>/signed/time-cycle",
  },
  {
    name: "Commitment",
    url: "/grant/<code>/<period>/commitment/time-cycle",
  },
  {
    name: "Disbursement",
    url: "/grant/<code>/<period>/disbursements/time-cycle",
  },
  {
    name: "Budgets",
    url: "/grant/<code>/<period>/budgets/flow",
  },
  {
    name: "Performance Rating",
    url: "/grant/<code>/<period>/performance-rating",
  },
  {
    name: "Performance Framework",
    url: "/grant/<code>/<period>/performance-framework",
  },
  {
    name: "Documents",
    url: "/grant/<code>/<period>/documents",
  },
];

export const partnerDetailTabs: TabProps[] = [
  {
    name: "Investments",
    url: "/partner/<code>/investments/disbursements",
  },
  {
    name: "Budgets",
    url: "/partner/<code>/budgets/flow",
  },
  {
    name: "Grants",
    url: "/partner/<code>/grants",
  },
];
