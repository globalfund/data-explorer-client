import React from "react";
import get from "lodash/get";
import Grid from "@material-ui/core/Grid";
import { useAuth0 } from "@auth0/auth0-react";
import Popover from "@material-ui/core/Popover";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import MenuItem from "@material-ui/core/MenuItem";
import { useCMSData } from "app/hooks/useCMSData";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconChevronLeft from "@material-ui/icons/ChevronLeft";
import { MobileAppbarSearch } from "app/components/Mobile/AppBarSearch";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { NavLink, useLocation, useHistory, Link } from "react-router-dom";
import {
  headercss,
  loginBtn,
  logocss,
  navLinkcss,
} from "app/components/AppBar/style";

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

export const StyledMenu = withStyles({
  paper: {
    minWidth: 220,
    borderRadius: "0 0 10px 10px",
    boxShadow: "0px 0px 10px rgba(152, 161, 170, 0.6)",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 10,
      background: "#231d2c",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background: "#dfe3e6",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background: "#231d2c",
    },
  },
  list: {
    padding: 0,
    maxHeight: 500,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
));

export const StyledMenuItem = withStyles(() => ({
  root: {
    padding: 0,
    width: "100%",
    borderBottom: "1px solid #DFE3E6",
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: "#231d2c",
      padding: "10px 12px",
      textDecoration: "none",
    },
  },
}))(MenuItem);

export function AppBar() {
  const location = useLocation();
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navLocation = location.pathname.split("/").join("");

  function handleClick(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function getMobilePageHeader() {
    switch (location.pathname) {
      case "/about":
        return TextHeader(get(cmsData, "componentsAppBar.about", ""));
      case "/datasets":
        return (
          <React.Fragment>
            {TextHeader("Explore")}
            <MobileAppbarSearch />
          </React.Fragment>
        );
      default:
        return <MobileHeader />;
    }
  }

  React.useEffect(() => {
    if (anchorEl) {
      handleClose();
    }
    if (openSearch) {
      setOpenSearch(false);
    }
  }, [location.pathname]);

  if (location.pathname === "/" && isMobile) {
    return <React.Fragment />;
  }

  return (
    <MUIAppBar
      elevation={0}
      position="fixed"
      color={location.pathname !== "/" ? "secondary" : "transparent"}
      css={`
        display: flex;
        background-color: #f2f7fd;
      `}
    >
      <Toolbar
        disableGutters
        variant="dense"
        css={`
          gap: 32px;
          width: 100%;
          height: 48px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          @media (min-width: 768px) {
            #search-container {
              padding: 3px 20px;
              align-items: center;
            }

            #search-results-container {
              top: 40px;
              box-shadow: 0px 0px 10px rgba(152, 161, 170, 0.6);
            }
          }
        `}
      >
        {isMobile && getMobilePageHeader()}
        {!isMobile && (
          <Container maxWidth="lg">
            <Grid
              container
              css={headercss}
              alignContent="space-between"
              alignItems="center"
            >
              <Grid
                item
                lg={3}
                md={2}
                sm={2}
                css={`
                  gap: 180px;
                  display: flex;
                  align-items: center;
                `}
              >
                <NavLink to="/" css={logocss}>
                  <img
                    src="/logo.svg"
                    alt={get(cmsData, "componentsAppBar.logoAlt", "")}
                  />
                </NavLink>
              </Grid>
              <Grid
                item
                lg={9}
                md={10}
                sm={10}
                css={`
                  gap: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: flex-end;
                `}
              >
                <div css={navLinkcss("why-dx", navLocation)}>
                  <NavLink to="/why-dataXplorer">
                    <b>Why DataXplorer?</b>
                  </NavLink>
                </div>
                <div css={navLinkcss("explore", navLocation)}>
                  <NavLink to="/explore">
                    <b>Explore </b>
                  </NavLink>
                </div>
                <div css={navLinkcss("about", navLocation)}>
                  <Link to="/about">
                    <b>About</b>
                  </Link>
                </div>
                <div css={navLinkcss("partners", navLocation)}>
                  <Link to="/partners">
                    <b>Partners </b>
                  </Link>
                </div>
                <div css={navLinkcss("contact", navLocation)}>
                  <Link to="/contact">
                    <b>Contact </b>
                  </Link>
                </div>
                <ActionMenu />
              </Grid>
            </Grid>
          </Container>
        )}
      </Toolbar>
    </MUIAppBar>
  );
}

const ActionMenu = () => {
  const history = useHistory();
  const { user, isAuthenticated } = useAuth0();

  const [actionPopoverAnchorEl, setActionPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const openActionPopover = Boolean(actionPopoverAnchorEl);

  const handleCloseActionPopover = () => {
    setActionPopoverAnchorEl(null);
  };

  return (
    <div>
      <div
        css={`
          gap: 1px;
          display: flex;
          position: relative;

          button {
            outline: none;
            border: none;
            background: #dadaf8;
            color: #231d2c;
            font-size: 11.424px;
            line-height: normal;
            padding: 0px;
            font-family: "Inter", sans-serif;

            :nth-child(1) {
              width: 146px;
              height: 34px;
              border-radius: ${isAuthenticated ? "24px 0px 0px 24px" : "24px"};
              &:hover {
                opacity: 1;
              }
            }
            :nth-child(2) {
              width: 41px;
              height: 34px;
              border-radius: 0px 24px 24px 0px;
              background: ${openActionPopover ? "#b5b5db" : "#dadaf8"};
              &:hover {
                background: #b5b5db;
              }
            }
            svg {
              ${openActionPopover ? "transform: rotate(180deg)" : ""}
            }
          }
        `}
      >
        <Link
          to={isAuthenticated ? "/report/new/initial" : "/onboarding/login"}
        >
          <button>{isAuthenticated ? "Create report" : "Login"}</button>
        </Link>
        {isAuthenticated && (
          <button
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setActionPopoverAnchorEl(
                actionPopoverAnchorEl ? null : event.currentTarget
              );
            }}
          >
            <KeyboardArrowDownIcon />
          </button>
        )}
        {isAuthenticated && (
          <button
            onClick={() => history.push("/profile")}
            css={`
              min-width: 33px;
              height: 33px;
              display: flex;
              margin-left: 20px;
              border-radius: 50%;
              align-items: center;
              background: #b5b5db;
              justify-content: center;
            `}
          >
            {user?.given_name?.slice(0, 1)}
            {user?.family_name?.slice(0, 1)}
          </button>
        )}
      </div>
      <Popover
        open={openActionPopover}
        anchorEl={actionPopoverAnchorEl}
        onClose={handleCloseActionPopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        css={`
          .MuiPaper-root {
            border-radius: 8px;
            margin-top: 4px;
          }
        `}
      >
        <div
          css={`
            width: 188px;
            height: 76px;
            background: #ffffff;
            color: #262c34;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            font-family: "GothamNarrow-Light", "Helvetica Neue", sans-serif;

            a {
              display: flex;
              gap: 8px;
              align-items: center;
              padding-left: 8px;
              width: 100%;
              height: 100%;
              text-decoration: none;

              button {
                padding: 0px;
                width: 100%;
                border: none;
                outline: none;
                background: transparent;
                cursor: pointer;
                display: flex;
                gap: 8px;
                align-items: center;
                text-transform: uppercase;
                font-weight: 500;
                font-family: "Inter", sans-serif;
              }

              &:hover,
              &:active {
                cursor: pointer;
                background: #6061e5;

                button {
                  color: #fff;
                }
              }
            }
          `}
        >
          <Link to="/dataset-upload" onClick={handleCloseActionPopover}>
            <button>Connect Data</button>
          </Link>

          <Link to="/chart/new/data" onClick={handleCloseActionPopover}>
            <button>Create Chart</button>
          </Link>
        </div>
      </Popover>
    </div>
  );
};
