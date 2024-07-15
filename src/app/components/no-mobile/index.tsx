import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { ReactComponent as HeaderToolbarLogo } from "app/assets/vectors/HeaderToolbarLogo.svg";

export const NoMobile: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <HeaderToolbarLogo />
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="lg" disableGutters>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="calc(100vh - 90px - 90px)"
        >
          <Box fontSize="18px">Mobile version is not supported yet.</Box>
        </Box>
      </Container>
    </React.Fragment>
  );
};
