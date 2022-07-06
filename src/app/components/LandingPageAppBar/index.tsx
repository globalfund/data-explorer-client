import React from "react";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
/* project */
import {
  aboutLinkCss,
  dataThemesLinkCss,
  dlCss,
  linksCss,
  imgCss,
} from "app/components/LandingPageAppBar/style";

export function LandingAppBar() {
  const location = useLocation();

  const {
    isAuthenticated,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

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
                <Button css={dlCss} onClick={() => logout({returnTo: window.location.origin})}>
                  { user?.name?.match(/\b(\w)/g)?.join('') || 'Sign out'}
                </Button>
              ) : (
                <Button css={dlCss} onClick={loginWithRedirect}>
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
