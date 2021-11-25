// cc:application base#;application index

import React from "react";
import Providers from "app/Providers";
import { MainRoutes } from "app/Routes";
// import { CookieDialog } from "app/components/CookieDialog";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import { MobileBottomNavigation } from "app/components/Mobile/BottomNavigation";

export function App() {
  // const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Providers>
      <MainRoutes />
      {/* <CookieDialog /> */}
      {/* {isMobile && <MobileBottomNavigation />} */}
    </Providers>
  );
}
