// cc:application base#;application index

import React from "react";
import Providers from "app/Providers";
import { MainRoutes } from "app/Routes";
import { initDB } from "react-indexed-db";
import { DBConfig } from "app/utils/DBConfig";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { MobileBottomNavigation } from "app/components/Mobile/BottomNavigation";

initDB(DBConfig);

export function App() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <Providers>
      <MainRoutes />
      {isMobile && <MobileBottomNavigation />}
    </Providers>
  );
}
