import React from "react";
import { ROUTES } from "app/router/data";
import { PageLoader } from "app/components/page-loader";
import { useInitialLoad } from "app/hooks/useInitialLoad";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useGenerateSitemap } from "app/hooks/useGenerateSitemap";
export default function Router() {
  useInitialLoad();
  // useGenerateSitemap(); // Uncomment this line to generate the sitemap
  const setUpRouter = () => {
    const result: RouteObject[] = ROUTES;
    return createBrowserRouter(result);
  };

  const [router] = React.useState(setUpRouter);

  return <RouterProvider fallbackElement={<PageLoader />} router={router} />;
}
