import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { NavLink, useLocation } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { HeaderMenu } from "app/components/header-menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { HeaderSearch } from "app/components/header-search";
import { SkipToMainButton } from "app/components/skip-to-main-btn";
import HeaderToolbarLogo from "app/assets/vectors/HeaderToolbarLogo.svg?react";

export const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = React.useState(false);
  const isTabletOrMobile = useMediaQuery("(max-width: 1024px)");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const location = useLocation();

  const isAuthPage = React.useMemo(() => {
    return location.pathname === "/sign-in" || location.pathname === "/sign-up";
  }, [location.pathname]);

  return (
    <Box sx={{ zIndex: 1000, flexGrow: 1, top: 0, position: "sticky" }}>
      <SkipToMainButton />
      <AppBar position="static" sx={{ background: "#FFFFFF" }}>
        <Container maxWidth="lg" disableGutters sx={{ background: "#FFFFFF" }}>
          <Toolbar
            sx={{
              height: "62px",
              minHeight: "62px !important",
              background: "#FFFFFF",
              "@media (max-width: 1279px)": {
                width: "100%",
                padding: "0 16px",
              },
              "@media (max-width: 767px)": {
                padding: "0 16px",
                position: "relative",
              },
            }}
          >
            {(!isTabletOrMobile || !searchOpen) && (
              <NavLink
                to="/"
                aria-label="App logo link"
                style={{ display: "flex" }}
              >
                <HeaderToolbarLogo />
              </NavLink>
            )}
            {isAuthPage ? null : (
              <HeaderMenu
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            )}
            <HeaderSearch
              searchOpen={searchOpen}
              setSearchOpen={setSearchOpen}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
