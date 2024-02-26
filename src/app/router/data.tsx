import { Page } from "app/components/page";

export const ROUTES = [
  {
    path: "/",
    element: <Page />,
    errorElement: <div>404</div>,
    children: [],
  },
];
