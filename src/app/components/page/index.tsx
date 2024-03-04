import React from "react";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { Header } from "app/components/header";
import { Footer } from "app/components/footer";
import Container from "@mui/material/Container";

export const Page: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="lg" disableGutters>
        <Box id="main">
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </React.Fragment>
  );
};
