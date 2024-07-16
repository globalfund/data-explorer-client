export interface HeaderMenuProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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
        id: "financial-insights",
        label: "Financial Insights",
        link: "/financial-insights",
      },
      {
        id: "annual-results",
        label: "Annual Results",
        link: "/annual-results",
      },
      // {
      //   id: "documents",
      //   label: "Documents",
      //   link: "/documents",
      // },
    ],
  },
  { id: "geography", label: "Geography", link: "/geography" },
  { id: "grants", label: "Grants", link: "/grants" },
];

export function isNavButtonActive(id: string, path: string): boolean {
  switch (id) {
    case "datasets":
      return (
        (path.includes("/resource-mobilization") ||
          path.includes("/access-to-funding") ||
          path.includes("/financial-insights") ||
          path.includes("/annual-results")) &&
        !path.includes("/location") &&
        !path.includes("/grant")
      );
    case "geography":
      return path.includes("/geography") || path.includes("/location");
    case "grants":
      return path.includes("/grants") || path.includes("/grant");
    default:
      return false;
  }
}
