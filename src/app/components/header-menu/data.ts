export interface HeaderMenuPage {
  id: string;
  label: string;
  link?: string;
  subPages?: HeaderMenuPage[];
}

export const PAGES: HeaderMenuPage[] = [
  {
    id: "datasets",
    label: "Datasets",
    subPages: [
      {
        id: "resource-mobilization",
        label: "Resource Mobilization",
        subPages: [
          {
            id: "pledges-contributions",
            label: "Pledges & Contributions",
            link: "/pledges-contributions",
          },
        ],
      },
      {
        id: "access-to-funding",
        label: "Access to Funding",
        subPages: [
          {
            id: "eligibility",
            label: "Eligibility",
            link: "/eligibility",
          },
          {
            id: "allocation",
            label: "Allocation",
            link: "/allocation",
          },
          {
            id: "funding-request",
            label: "Funding Request",
            link: "/funding-request",
          },
        ],
      },
      {
        id: "grant-implementation",
        label: "Grant Implementation",
        subPages: [
          {
            id: "signed-amounts",
            label: "Signed Amounts",
            link: "/signed-amounts",
          },
          {
            id: "commitments",
            label: "Commitments",
            link: "/commitments",
          },
          {
            id: "disbursements",
            label: "Disbursements",
            link: "/disbursements",
          },
          {
            id: "budgets",
            label: "Budgets",
            link: "/budgets",
          },
          {
            id: "expenditures",
            label: "Expenditures",
            link: "/expenditures",
          },
        ],
      },
      {
        id: "annual-results",
        label: "Annual Results",
        link: "/annual-results",
      },
      {
        id: "documents",
        label: "Documents",
        link: "/documents",
      },
    ],
  },
  { id: "geography", label: "Geography", link: "/geography" },
  { id: "grants", label: "Grants", link: "/grants" },
];
