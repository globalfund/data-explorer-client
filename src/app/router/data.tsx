import { Home } from "app/pages/home";
import { Page } from "app/components/page";
import { RouteObject } from "react-router-dom";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Page />,
    errorElement: <div>404</div>,
    children: [{ path: "/", element: <Home /> }],
  },
];
