import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { NavLink } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import IconSearch from "@mui/icons-material/Search";
import { ReactComponent as HeaderToolbarLogo } from "app/assets/vectors/HeaderToolbarLogo.svg";

export const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <NavLink to="/">
              <HeaderToolbarLogo />
            </NavLink>
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                "> div": {
                  width: "100%",
                  height: "50%",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Tooltip title="Search">
                  <IconButton
                    sx={{
                      padding: "4px",
                      background: colors.primary.black,
                      "> svg": {
                        color: colors.primary.white,
                      },
                      "&:hover": {
                        opacity: 0.8,
                        background: colors.primary.black,
                        "> svg": {
                          color: colors.primary.white,
                        },
                      },
                    }}
                  >
                    <IconSearch />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box></Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
