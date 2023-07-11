export interface TabProps {
  name: string;
  url?: string;
  index?: number;
  tabs?: TabProps[];
  isActive?: boolean;
}

export interface PageHeaderTabProps {
  tabs: TabProps[];
}

export interface RouteTabProps extends TabProps {
  onlyLink?: boolean;
  search?: any;
  params?: {
    tab: string;
    code: string;
    period: string;
    vizType: string;
  };
}

export const countryDetailTabs: TabProps[] = [
  {
    name: "Overview",
    url: "/location/<code>/overview",
  },
  {
    name: "Access to Funding",
    url: "/location/<code>/access-to-funding",
  },
  {
    name: "Grant Implementation",
    tabs: [
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
    ],
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
    name: "Grant Implementation",
    tabs: [
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
    ],
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
    name: "Grant Implementation",
    tabs: [
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
    ],
  },
];
