import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  PAGES,
  HeaderMenuPage,
  isNavButtonActive,
} from "app/components/header-menu/data";

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

export const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedPage, setSelectedPage] = React.useState<string | null>(null);
  const [selectedSubPage, setSelectedSubPage] = React.useState<string | null>(
    null
  );

  const handleClick =
    (isSubPage: boolean, page: HeaderMenuPage) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
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

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
