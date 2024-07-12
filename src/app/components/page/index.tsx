import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Header } from "app/components/header";
import { Footer } from "app/components/footer";
import Container from "@mui/material/Container";
import { useUrlFilters } from "app/hooks/useUrlFilters";
import { useScrollToAnchor } from "app/hooks/useScrollToAnchor";

export const Page: React.FC = () => {
  useUrlFilters();
  useScrollToAnchor();

  return (
    <React.Fragment>
      <Header />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          minHeight: "calc(100vh - 91px - 256px)",
          "@media (max-width: 1200px)": {
            padding: "0 16px",
          },
        }}
      >
        <Box id="main">
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
};
