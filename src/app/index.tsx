// cc:application base#;application index

import React from "react";
import Providers from "app/Providers";
import { MainRoutes } from "app/Routes";
import { CookieDialog } from "app/components/CookieDialog";

export function App() {
  return (
    <Providers>
      <MainRoutes />
      <CookieDialog />
    </Providers>
  );
}
