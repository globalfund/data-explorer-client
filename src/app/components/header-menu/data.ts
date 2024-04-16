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
        link: "/resource-mobilization",
      },
      {
        id: "access-to-funding",
        label: "Access to Funding",
        link: "/access-to-funding",
      },
      {
        id: "grant-implementation",
        label: "Grant Implementation",
        link: "/grant-implementation",
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
