import React from "react";
import { ROUTES } from "app/router/data";
import { PageLoader } from "app/components/page-loader";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

export default function Router() {
  const setUpRouter = () => {
    const result: RouteObject[] = ROUTES;
    return createBrowserRouter(result);
  };

  const [router] = React.useState(setUpRouter);

  return <RouterProvider fallbackElement={<PageLoader />} router={router} />;
}
