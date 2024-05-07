import { Home } from "app/pages/home";
import { Grant } from "app/pages/grant";
import { Grants } from "app/pages/grants";
import { Page } from "app/components/page";
import { Location } from "app/pages/location";
import { RouteObject } from "react-router-dom";
import { Geography } from "app/pages/geography";
import { Redirect } from "app/components/redirect";
import { AnnualResultsPage } from "app/pages/datasets/annual-results";
import { AccessToFundingPage } from "app/pages/datasets/access-to-funding";
import { GrantImplementationPage } from "app/pages/datasets/grant-implementation";
import { ResourceMobilizationPage } from "app/pages/datasets/resource-mobilization";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Page />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/geography", element: <Geography /> },
      { path: "/grants", element: <Grants /> },
      { path: "/grant/:id", element: <Redirect to="/grant/:id/overview" /> },
      { path: "/grant/:id/:tab", element: <Grant /> },
      {
        path: "/location/:id",
        element: <Redirect to="/location/:id/overview" />,
      },
      { path: "/location/:id/:tab", element: <Location /> },
      {
        path: "/resource-mobilization",
        element: <ResourceMobilizationPage />,
      },
      {
        path: "/access-to-funding",
        element: <AccessToFundingPage />,
      },
      {
        path: "/financial-insights",
        element: <GrantImplementationPage />,
      },
      {
        path: "/annual-results",
        element: <AnnualResultsPage />,
      },
    ],
  },
];
