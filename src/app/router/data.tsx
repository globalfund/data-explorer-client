import { Home } from "app/pages/home";
import { Grants } from "app/pages/grants";
import { Page } from "app/components/page";
import { Location } from "app/pages/location";
import { RouteObject } from "react-router-dom";
import { Geography } from "app/pages/geography";
import { Grant, PreGrant } from "app/pages/grant";
import { Redirect } from "app/components/redirect";
import { AnnualResultsPage } from "app/pages/datasets/annual-results";
import { AccessToFundingPage } from "app/pages/datasets/access-to-funding";
import { GrantImplementationPage } from "app/pages/datasets/grant-implementation";
import { ResourceMobilizationPage } from "app/pages/datasets/resource-mobilization";

const REDIRECT_ROUTES: RouteObject[] = [
  {
    path: "/datasets",
    element: <Redirect to="/" />,
  },
  {
    path: "/grants/:subType",
    element: <Redirect to="/grants" />,
  },
  {
    path: "/results",
    element: <Redirect to="/annual-results" />,
  },
  {
    path: "/documents",
    element: <Redirect to="/" />,
  },
  {
    path: "/viz/:vizType?/:subType?",
    element: <Redirect to="/" />,
  },
  {
    path: "/location/:code/:vizType?/:subType?",
    element: <Redirect to="/geography" />,
  },
  {
    path: "/partner/:code/:vizType?/:subType?",
    element: <Redirect to="/" />,
  },
  {
    path: "/grant/:id/:period?/:vizType?/:subType?",
    element: <Redirect to="/grants" />,
  },
];

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Page />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/geography", element: <Geography /> },
      { path: "/grants", element: <Grants /> },
      { path: "/grant/:id", element: <PreGrant /> },
      {
        path: "/grant/:id/:ip",
        element: <Redirect to="/grant/:id/overview" />,
      },
      { path: "/grant/:id/:ip/:tab", element: <Grant /> },
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
      ...REDIRECT_ROUTES,
      {
        path: "*",
        element: (
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "calc(100vh - 91px - 256px - 150px)",
            }}
          >
            Page not found
          </div>
        ),
      },
    ],
  },
];
