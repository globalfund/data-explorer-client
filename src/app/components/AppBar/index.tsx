import React from "react";
import get from "lodash/get";
import { appColors } from "app/theme";
import { Search } from "app/components/Search";
import Toolbar from "@material-ui/core/Toolbar";
import MUIAppBar from "@material-ui/core/AppBar";
import CloseIcon from "@material-ui/icons/Close";
import MenuItem from "@material-ui/core/MenuItem";
import { useCMSData } from "app/hooks/useCMSData";
import GitHubIcon from "@material-ui/icons/GitHub";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconChevronLeft from "@material-ui/icons/ChevronLeft";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { useDatasetMenuItems } from "app/hooks/useDatasetMenuItems";
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
        <IconChevronLeft
          htmlColor={appColors.APPBAR.MOBILE_HEADER_CHEVRON_ICON_COLOR}
        />
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
      background: appColors.APPBAR.DATASETS_MENU_SCROLLBAR_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 10,
      background:
        appColors.APPBAR.DATASETS_MENU_SCROLLBAR_TRACK_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 10,
      background:
        appColors.APPBAR.DATASETS_MENU_SCROLLBAR_THUMB_BACKGROUND_COLOR,
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
    borderBottom: `1px solid ${appColors.APPBAR.DATASETS_MENU_ITEM_BORDER_BOTTOM_COLOR}`,
    "& a": {
      width: "100%",
      fontSize: "14px",
      color: appColors.APPBAR.DATASETS_MENU_ITEM_COLOR,
      padding: "10px 12px",
      textDecoration: "none",
    },
  },
}))(MenuItem);

export function AppBar() {
  const location = useLocation();
  const datasetMenuItems = useDatasetMenuItems();
  const cmsData = useCMSData({ returnData: true });
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

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
      position="fixed"
      color="primary"
      css={`
        display: flex;
        flex-direction: row;
      `}
    >
      <Container
        maxWidth="lg"
        css={`
          @media (max-width: 1300px) {
            padding-right: 42px;
          }
        `}
      >
        <Toolbar
          disableGutters
          variant="dense"
          css={`
            gap: 32px;
            width: 100%;
            height: 45px;
            display: flex;
            min-height: 45px;
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
            <div
              css={`
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <div
                css={`
                  height: 100%;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                `}
              >
                <NavLink to="/" css="display: flex;margin-right: 52px;">
                  <img
                    src="/gflogo.png"
                    width={295}
                    height={24}
                    alt={get(cmsData, "componentsAppBar.logoAlt", "")}
                  />
                </NavLink>
                {(location.pathname === "/" || !openSearch) && (
                  <React.Fragment>
                    <div
                      id="appbar-datasets"
                      onClick={handleClick}
                      css={`
                        height: 100%;
                        display: flex;
                        color: ${anchorEl
                          ? appColors.APPBAR.LINK_ACTIVE_COLOR
                          : appColors.APPBAR.LINK_COLOR};
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: bold;
                        margin-right: 32px;
                        align-items: center;
                        letter-spacing: 0.5px;
                        text-decoration: none;

                        &:hover {
                          color: ${appColors.APPBAR.LINK_ACTIVE_COLOR};
                        }
                      `}
                    >
                      Datasets
                    </div>
                    <StyledMenu
                      keepMounted
                      disableScrollLock
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      open={Boolean(anchorEl)}
                      id="appbar-datasets-menu"
                    >
                      {datasetMenuItems.map(
                        (item: React.ReactChild, itemIndex: number) => (
                          <StyledMenuItem
                            disableRipple
                            key={itemIndex}
                            disableTouchRipple
                          >
                            {item}
                          </StyledMenuItem>
                        )
                      )}
                    </StyledMenu>
                    <NavLink
                      to="/about"
                      css={`
                        color: ${appColors.APPBAR.LINK_COLOR};
                        font-size: 14px;
                        font-weight: bold;
                        letter-spacing: 0.5px;
                        text-decoration: none;

                        &:hover {
                          color: ${appColors.APPBAR.LINK_ACTIVE_COLOR};
                        }

                        &.active {
                          color: ${appColors.APPBAR.LINK_ACTIVE_COLOR};
                        }
                      `}
                    >
                      {get(cmsData, "componentsAppBar.about", "")}
                    </NavLink>
                  </React.Fragment>
                )}
              </div>
              {location.pathname !== "/" && (
                <React.Fragment>
                  {openSearch && (
                    <Search hocClose={() => setOpenSearch(false)} />
                  )}
                  <IconButton
                    onClick={() => setOpenSearch(!openSearch)}
                    css={`
                      width: 45px;
                      height: 45px;
                      margin-right: -12px;
                    `}
                  >
                    {openSearch ? (
                      <CloseIcon
                        htmlColor={appColors.APPBAR.SEARCH_CLOSE_ICON_COLOR}
                      />
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24">
                        <circle
                          cx="12"
                          cy="12"
                          r="12"
                          fill={appColors.APPBAR.SEARCH_ICON_BACKGROUND_COLOR}
                        />
                        <path
                          fill={appColors.APPBAR.SEARCH_ICON_COLOR}
                          d="M14.472 13.4131H13.9143L13.7167 13.2226C14.4084 12.4178 14.8249 11.3731 14.8249 10.2367C14.8249 7.70256 12.7708 5.64844 10.2367 5.64844C7.70256 5.64844 5.64844 7.70256 5.64844 10.2367C5.64844 12.7708 7.70256 14.8249 10.2367 14.8249C11.3731 14.8249 12.4178 14.4084 13.2226 13.7167L13.4131 13.9143V14.472L16.9426 17.9943L17.9943 16.9426L14.472 13.4131ZM10.2367 13.4131C8.47903 13.4131 7.0602 11.9943 7.0602 10.2367C7.0602 8.47903 8.47903 7.0602 10.2367 7.0602C11.9943 7.0602 13.4131 8.47903 13.4131 10.2367C13.4131 11.9943 11.9943 13.4131 10.2367 13.4131Z"
                        />
                      </svg>
                    )}
                  </IconButton>
                </React.Fragment>
              )}
            </div>
          )}
        </Toolbar>
      </Container>
      <IconButton
        target="_blank"
        id="github-linkbtn"
        href="https://github.com/globalfund/data-explorer-client"
        css={`
          right: 0;
          width: 45px;
          height: 45px;
          position: absolute;

          path {
            fill: ${appColors.COMMON.WHITE};
          }
        `}
      >
        <GitHubIcon />
      </IconButton>
    </MUIAppBar>
  );
}
