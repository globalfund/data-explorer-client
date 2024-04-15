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
            link: "/resource-mobilization/pledges-contributions",
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
            link: "/access-to-funding/eligibility",
          },
          {
            id: "allocation",
            label: "Allocation",
            link: "/access-to-funding/allocation",
          },
          {
            id: "funding-request",
            label: "Funding Request",
            link: "/access-to-funding/funding-request",
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
            link: "/grant-implementation/signed-amounts",
          },
          {
            id: "commitments",
            label: "Commitments",
            link: "/grant-implementation/commitments",
          },
          {
            id: "disbursements",
            label: "Disbursements",
            link: "/grant-implementation/disbursements",
          },
          {
            id: "budgets",
            label: "Budgets",
            link: "/grant-implementation/budgets",
          },
          {
            id: "expenditures",
            label: "Expenditures",
            link: "/grant-implementation/expenditures",
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
