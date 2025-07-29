// Abstract route definitions without components
export interface RouteConfig {
  path: string;
  redirectTo?: string;
  componentName?: string;
}

export const ROUTE_CONFIGS: RouteConfig[] = [
  { path: "/", componentName: "Home" },
  { path: "/geography", componentName: "Geography" },
  { path: "/grants", componentName: "Grants" },
  { path: "/grant/:id", componentName: "PreGrant" },
  {
    path: "/grant/:id/:ip",
    redirectTo: "/grant/:id/:ip/overview",
  },
  { path: "/grant/:id/:ip/:tab", componentName: "Grant" },
  {
    path: "/location/:id",
    redirectTo: "/location/:id/overview",
  },
  { path: "/location/:id/:tab", componentName: "Location" },
  {
    path: "/resource-mobilization",
    componentName: "ResourceMobilizationPage",
  },
  {
    path: "/access-to-funding",
    componentName: "AccessToFundingPage",
  },
  {
    path: "/financial-insights",
    componentName: "GrantImplementationPage",
  },
  {
    path: "/annual-results",
    componentName: "AnnualResultsPage",
  },
];
