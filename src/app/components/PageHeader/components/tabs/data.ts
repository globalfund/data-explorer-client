export interface TabProps {
  url: string;
  name: string;
  index?: number;
  isActive?: boolean;
}

export interface PageHeaderTabProps {
  tabs: TabProps[];
}

export interface RouteTabProps extends TabProps {
  onlyLink?: boolean;
}

export const exploreTabs: TabProps[] = [
  {
    name: "Signed",
    url: "/explore/signed/treemap",
  },
  {
    name: "Commitments",
    url: "/explore/commitment/treemap",
  },
  {
    name: "Disbursements",
    url: "/explore/disbursements/treemap",
  },
  {
    name: "Budgets",
    url: "/explore/budgets/flow",
  },
  {
    name: "Allocations",
    url: "/explore/allocations",
  },
  {
    name: "Eligibility",
    url: "/explore/eligibility",
  },
  {
    name: "Documents",
    url: "/explore/documents",
  },
  {
    name: "Grants",
    url: "/explore/grants",
  },
  {
    name: "Results",
    url: "/explore/results",
  },
];

export const countryDetailTabs: TabProps[] = [
  {
    name: "Overview",
    url: "/location/<code>/overview",
  },
  {
    name: "Eligibility",
    url: "/location/<code>/eligibility",
  },
  {
    name: "Allocation",
    url: "/location/<code>/allocations",
  },
  {
    name: "Grants",
    url: "/location/<code>/grants",
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
    name: "Results",
    url: "/location/<code>/results",
  },
  {
    name: "Documents",
    url: "/location/<code>/documents",
  },
];

export const grantDetailTabs: TabProps[] = [
  {
    name: "Overview",
    url: "/grant/<code>/<period>/overview",
  },
  {
    name: "Signed",
    url: "/grant/<code>/<period>/signed/treemap",
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
    name: "Targets and Results",
    url: "/grant/<code>/<period>/targets-results",
  },
  {
    name: "Documents",
    url: "/grant/<code>/<period>/documents",
  },
];

export const partnerDetailTabs: TabProps[] = [
  {
    name: "Grants",
    url: "/partner/<code>/grants",
  },
  {
    name: "Signed",
    url: "/partner/<code>/signed/treemap",
  },
  {
    name: "Commitment",
    url: "/partner/<code>/commitment/treemap",
  },
  {
    name: "Disbursement",
    url: "/partner/<code>/disbursements/treemap",
  },
  {
    name: "Budgets",
    url: "/partner/<code>/budgets/flow",
  },
];
