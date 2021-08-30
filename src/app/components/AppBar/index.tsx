import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import { NavLink, useLocation } from "react-router-dom";

export function AppBar() {
  const location = useLocation();

  if (location.pathname === "/") {
    return <React.Fragment />;
  }

  return (
    <MUIAppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          variant="dense"
          css={`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          `}
        >
          <NavLink to="/" css="display: flex;">
            <img
              src="/gflogo.png"
              width={295}
              height={24}
              alt="TGF Data Explorer logo"
            />
          </NavLink>
          <NavLink
            to="/about"
            css={`
              color: #fff;
              font-size: 14px;
              letter-spacing: 0.5px;
              text-decoration: none;
            `}
          >
            About
          </NavLink>
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
