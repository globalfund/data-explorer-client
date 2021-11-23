import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconChevronLeft from "@material-ui/icons/ChevronLeft";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { MobileAppbarSearch } from "app/components/Mobile/AppBarSearch";

const TextHeader = (label: string) => (
  <h2
    css={`
      font-size: 18px;
      font-weight: bold;
      font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
    `}
  >
    {label}
  </h2>
);

function MobileHeader() {
  const history = useHistory();

  return (
    <React.Fragment>
      <IconButton
        onClick={() => history.goBack()}
        css={`
          padding-left: 0;
        `}
      >
        <IconChevronLeft htmlColor="#fff" />
      </IconButton>
      <MobileAppbarSearch />
    </React.Fragment>
  );
}

export function AppBar() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");

  if (location.pathname === "/") {
    return <React.Fragment />;
  }

  function getMobilePageHeader() {
    switch (location.pathname) {
      case "/about":
        return TextHeader("About");
      case "/datasets":
        return TextHeader("Datasets");
      default:
        return <MobileHeader />;
    }
  }

  return (
    <MUIAppBar position="fixed" color="primary">
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
          {/* {isMobile && getMobilePageHeader()} */}
          {!isMobile && (
            <React.Fragment>
              <NavLink to="/" css="display: flex;">
                <img
                  src="/gflogo.png"
                  width={295}
                  height={24}
                  alt="TGF Data Explorer logo"
                />
              </NavLink>
              {/* <NavLink
                to="/about"
                css={`
                  color: #fff;
                  font-size: 14px;
                  letter-spacing: 0.5px;
                  text-decoration: none;
                `}
              >
                About
              </NavLink> */}
            </React.Fragment>
          )}
        </Toolbar>
      </Container>
    </MUIAppBar>
  );
}
