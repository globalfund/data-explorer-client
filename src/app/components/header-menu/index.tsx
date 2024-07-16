import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import IconClose from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import {
  PAGES,
  HeaderMenuPage,
  HeaderMenuProps,
  isNavButtonActive,
} from "app/components/header-menu/data";
import IconButton from "@mui/material/IconButton";

const HeaderMenuButton = styled(Button)({
  width: "160px",
  borderRadius: 0,
  fontSize: "12px",
  fontWeight: "400",
  textAlign: "center",
  textTransform: "none",
  color: colors.primary.black,
  "&:hover": {
    fontWeight: "700",
    background: "transparent",
  },
});

export const HeaderMenu: React.FC<HeaderMenuProps> = (
  props: HeaderMenuProps
) => {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile = useMediaQuery("(max-width: 767px)");

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedPage, setSelectedPage] = React.useState<string | null>(null);
  const [selectedSubPage, setSelectedSubPage] = React.useState<string | null>(
    null
  );

  const handleClick =
    (isSubPage: boolean, page: HeaderMenuPage) =>
    (_: React.SyntheticEvent<Element, Event>) => {
      if (!isSubPage) {
        const container = document.getElementById("header-menu-tabs-container");
        setAnchorEl(container);
        setSelectedPage(page.id);
      } else {
        setSelectedSubPage(page.id);
      }
      if (page.link) {
        navigate(page.link);
        handleClose();
      }
    };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedPage(null);
    setSelectedSubPage(null);
  };

  const onScroll = () => {
    setAnchorEl(null);
  };

  const handleCloseMobileMenu = () => {
    props.setMobileMenuOpen(false);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (mobile) {
    return (
      <Drawer
        anchor="right"
        open={props.mobileMenuOpen}
        onClose={handleCloseMobileMenu}
      >
        <IconButton
          sx={{
            top: "10px",
            zIndex: 1000,
            right: "10px",
            position: "absolute",
          }}
          onClick={handleCloseMobileMenu}
        >
          <IconClose htmlColor="#000" />
        </IconButton>
        <Box width="100vw" padding="16px">
          {PAGES.map((page) => {
            if (page.subPages) {
              return (
                <Accordion
                  expanded
                  key={page.id}
                  onChange={handleClick(false, page)}
                >
                  <AccordionSummary
                    sx={{
                      marginBottom: "8px",
                    }}
                  >
                    <Typography fontSize="20px" fontWeight="700">
                      {page.label}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {page.subPages.map((subPage) => (
                        <Button
                          key={subPage.id}
                          onClick={handleClick(false, subPage)}
                          sx={{
                            width: "100%",
                            padding: "6px 16px",
                            textTransform: "none",
                            color: colors.primary.black,
                            justifyContent: "flex-start",
                            fontWeight:
                              subPage.link === location.pathname
                                ? "700"
                                : "400",
                          }}
                        >
                          {subPage.label}
                        </Button>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            }
            return (
              <Button
                key={page.id}
                onClick={handleClick(false, page)}
                sx={{
                  width: "100%",
                  fontSize: "20px",
                  padding: "6px 0",
                  fontWeight: "700",
                  textTransform: "none",
                  color: colors.primary.black,
                  justifyContent: "flex-start",
                }}
              >
                {page.label}
              </Button>
            );
          })}
        </Box>
      </Drawer>
    );
  }

  return (
    <Box
      id="header-menu-tabs-container"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {PAGES.map((page) => (
        <HeaderMenuButton
          id={page.id}
          key={page.id}
          disableRipple
          onClick={handleClick(false, page)}
          sx={
            isNavButtonActive(page.id, location.pathname)
              ? {
                  fontWeight: "700",
                  borderBottom: `2px solid ${colors.primary.black}`,
                }
              : {}
          }
          data-cy="header-menu-button"
        >
          {page.label}
        </HeaderMenuButton>
      ))}
      <Popover
        disableScrollLock
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            maxWidth: "100vw",
            left: "0 !important",
            top: "91px !important",
          },
        }}
      >
        <Box
          sx={{
            width: "100vw",
            height: "100%",
            display: "flex",
            paddingTop: "10px",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            background: colors.primary.white,
          }}
        >
          {PAGES.find((page) => page.id === selectedPage)?.subPages?.map(
            (subPage) => (
              <Box
                key={subPage.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  "&:last-of-type": {
                    "> button": {
                      borderRightStyle: "none",
                    },
                  },
                }}
              >
                <HeaderMenuButton
                  disableRipple
                  key={subPage.id}
                  onClick={handleClick(true, subPage)}
                  sx={{
                    padding: "0 60px",
                    width: "fit-content",
                    marginBottom: "20px",
                    borderRight: `1px solid ${colors.primary.black}`,
                    fontWeight:
                      subPage.link === location.pathname ? "700" : "400",
                    "@media (max-width: 920px)": {
                      padding: "0 30px",
                    },
                  }}
                  data-cy="header-menu-button"
                >
                  {subPage.label}
                </HeaderMenuButton>
                {selectedSubPage &&
                  subPage.subPages?.map((subSubPage) => (
                    <HeaderMenuButton
                      disableRipple
                      key={subSubPage.id}
                      onClick={handleClick(false, subSubPage)}
                      sx={{
                        fontSize: "10px",
                        padding: "0 60px",
                        width: "fit-content",
                      }}
                      data-cy="header-menu-button"
                    >
                      {subSubPage.label}
                    </HeaderMenuButton>
                  ))}
              </Box>
            )
          )}
        </Box>
      </Popover>
    </Box>
  );
};
