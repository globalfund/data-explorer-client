import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { NavLink, useLocation } from "react-router-dom";
/* MS SSO */
import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import { loginRequest } from "../../../authConfig";
/* project */
import {
  aboutLinkCss,
  dataThemesLinkCss,
  dlCss,
  linksCss,
  imgCss,
} from "app/components/LandingPageAppBar/style";

function handleLogin(instance: any) {
  // MS SSO login popup
  instance.loginRedirect(loginRequest).catch((e: any) => console.error(e));
}

function handleLogout(instance: any) {
  // MS SSO login popup
  instance.logoutRedirect().catch((e: any) => console.error(e));
}

export function LandingAppBar() {
  const location = useLocation();
  // MS SSO
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  return (
    <MUIAppBar position="fixed" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters variant="dense">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sm={9} xs={6}>
              <NavLink to="/" css="display: flex;">
                <img src="/gflogo.png" css={imgCss} />
              </NavLink>
            </Grid>

            <Grid item sm={3} xs={6} css={linksCss}>
              <NavLink to="/about" css={aboutLinkCss}>
                About
              </NavLink>

              {location.pathname !== "/data-themes" && (
                <NavLink to="/data-themes" css={dataThemesLinkCss}>
                  Themes
                </NavLink>
              )}
              { isAuthenticated ? (
                <Button css={dlCss} onClick={() => handleLogout(instance)}>
                  Sign out!
                </Button>
              ) : (
                <Button css={dlCss} onClick={() => handleLogin(instance)}>
                  Sign in!
                </Button>
              ) }
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
