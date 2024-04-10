import { Home } from "app/pages/home";
import { Grant } from "app/pages/grant";
import { Page } from "app/components/page";
import { Location } from "app/pages/location";
import { RouteObject } from "react-router-dom";
import { Geography } from "app/pages/geography";
import { Redirect } from "app/components/redirect";
import { DatasetPage } from "app/pages/datasets/common/page";

export const ROUTES: RouteObject[] = [
  {
    path: "/",
    element: <Page />,
    errorElement: <div>404</div>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/geography", element: <Geography /> },
      { path: "/grant/:id", element: <Redirect to="/grant/:id/overview" /> },
      { path: "/grant/:id/:tab", element: <Grant /> },
      {
        path: "/location/:id",
        element: <Redirect to="/location/:id/overview" />,
      },
      { path: "/location/:id/:tab", element: <Location /> },
      {
        path: "/dataset/page",
        element: (
          <DatasetPage
            title="Resource Mobilization"
            subtitle="Government, private sector, non-government and other donor pledges and contributions."
            breadcrumbs={[
              { label: "Datasets" },
              { label: "Resource Mobilization" },
            ]}
          />
        ),
      },
    ],
  },
];
