import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Header } from "app/components/header";
import { Footer } from "app/components/footer";
import Container from "@mui/material/Container";
import { useUrlFilters } from "app/hooks/useUrlFilters";

export const Page: React.FC = () => {
  useUrlFilters();

  return (
    <React.Fragment>
      <Header />
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          minHeight: "calc(100vh - 91px - 256px)",
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
