import React from "react";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import {
  aboutLinkCss,
  dataThemesLinkCss,
  dlCss,
  linksCss,
  imgCss,
} from "app/components/LandingPageAppBar/style";

export function LandingAppBar() {
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

              <NavLink to="/data-themes" css={dataThemesLinkCss}>
                Themes
              </NavLink>

              <NavLink to="/data-themes" css={dlCss}>
                DL
              </NavLink>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
