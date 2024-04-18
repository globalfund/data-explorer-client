import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { NavLink, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { Search } from "app/components/search";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import IconClose from "@mui/icons-material/Close";
import IconSearch from "@mui/icons-material/Search";
import { HeaderMenu } from "app/components/header-menu";
import { ReactComponent as HeaderToolbarLogo } from "app/assets/vectors/HeaderToolbarLogo.svg";

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [searchOpen, setSearchOpen] = React.useState(false);

  const onSearchBtnClick = () => {
    setSearchOpen(!searchOpen);
  };

  React.useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, [pathname]);

  return (
    <Box sx={{ zIndex: 1000, flexGrow: 1, top: 0, position: "sticky" }}>
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
                {searchOpen && (
                  <Box
                    sx={{
                      width: "500px",
                      "#search-container": {
                        width: "100%",
                        padding: "0 10px",
                      },
                      "#search-category-dropdown": {
                        display: "none",
                      },
                      "#search-results-container": {
                        top: "35px",
                      },
                      "> div": {
                        width: "100%",
                      },
                    }}
                  >
                    <Search hocClose={() => setSearchOpen(false)} />
                  </Box>
                )}
                <Tooltip title={!searchOpen ? "Search" : "Close"}>
                  <IconButton
                    onClick={onSearchBtnClick}
                    sx={{
                      padding: 0,
                      marginLeft: "10px",
                      background: colors.primary.black,
                      "> svg": {
                        transform: "scale(0.7)",
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
                    {!searchOpen ? <IconSearch /> : <IconClose />}
                  </IconButton>
                </Tooltip>
              </Box>
              <HeaderMenu />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
