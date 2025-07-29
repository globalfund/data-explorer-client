import { Page } from "app/components/page";
import { RouteObject } from "react-router-dom";
import { Redirect } from "app/components/redirect";

import { ROUTE_CONFIGS } from "./paths";
import { lazy } from "react";

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

export function createRoutes(componentLoader: (name: string) => JSX.Element) {
  return ROUTE_CONFIGS.map((config) => {
    if (config.redirectTo) {
      return {
        path: config.path,
        element: <Redirect to={config.redirectTo} />,
      };
    }

    return {
      path: config.path,
      element: componentLoader(config.componentName!),
    };
  });
}
const NON_REDIRECT_ROUTES: RouteObject[] = createRoutes((componentName) => {
  const Component = lazy(() => import(`./components/${componentName}`));
  return <Component />;
});

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Page />,
    errorElement: <div>404</div>,
    children: [
      ...NON_REDIRECT_ROUTES,
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
