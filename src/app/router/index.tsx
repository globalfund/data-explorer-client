import React from "react";
import { ROUTES } from "app/router/data";
import { NoMobile } from "app/components/no-mobile";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PageLoader } from "app/components/page-loader";
import { useInitialLoad } from "app/hooks/useInitialLoad";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

export default function Router() {
  useInitialLoad();

  const isMobile = useMediaQuery("(max-width: 767px)");

  const setUpRouter = () => {
    const result: RouteObject[] = ROUTES;
    return createBrowserRouter(result);
  };

  const [router] = React.useState(setUpRouter);

  if (isMobile) {
    return <NoMobile />;
  }

  return <RouterProvider fallbackElement={<PageLoader />} router={router} />;
}
