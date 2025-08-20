import React from "react";
import Box from "@mui/material/Box";
import { Header } from "app/components/header";
import { Footer } from "app/components/footer";
import Container from "@mui/material/Container";
import { Outlet, useLocation } from "react-router-dom";
import { useUrlFilters } from "app/hooks/useUrlFilters";
import { useRouteListener } from "app/hooks/useRouteListener";
import { useScrollToAnchor } from "app/hooks/useScrollToAnchor";
import { ReportBuilderPageHeader } from "app/pages/report-builder/builder/components/header";

const containerSx = {
  minHeight: "calc(100vh - 58px - 256px - 150px)",
  "@media (max-width: 1200px)": {
    padding: "0 16px",
  },
};

export const Page: React.FC = () => {
  useUrlFilters();
  useRouteListener();
  useScrollToAnchor();

  const location = useLocation();

  const inReportBuilder = React.useMemo(() => {
    return location.pathname.startsWith("/report-builder/");
  }, [location.pathname]);

  if (inReportBuilder) {
    return (
      <React.Fragment>
        <ReportBuilderPageHeader />
        <Box sx={containerSx}>
          <Box id="main">
            <Outlet />
          </Box>
        </Box>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg" disableGutters sx={containerSx}>
        <Box id="main">
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
};
