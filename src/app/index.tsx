// cc:application base#;application index

import React from "react";
import Providers from "app/Providers";
import { MainRoutes } from "app/Routes";
import { AppDialogs } from "app/components/Dialogs";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { CookieDialog } from "app/components/Dialogs/CookieDialog";
import { MobileBottomNavigation } from "app/components/Mobile/BottomNavigation";

export function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Providers>
      <AppDialogs />
      <CookieDialog open data-testid="cookie-dialog" />
      <MainRoutes />
      {isMobile && <MobileBottomNavigation />}
    </Providers>
  );
}
