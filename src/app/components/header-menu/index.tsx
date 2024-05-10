import React from "react";
import { colors } from "app/theme";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PAGES, HeaderMenuPage } from "app/components/header-menu/data";

const HeaderMenuButton = styled(Button)({
  width: "160px",
  borderRadius: 0,
  fontWeight: 400,
  fontSize: "12px",
  textAlign: "center",
  textTransform: "none",
  "&:hover": {
    fontWeight: "700",
    background: "transparent",
  },
});

export const HeaderMenu: React.FC = () => {
  const navigate = useNavigate();

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
            selectedPage === page.id
              ? {
                  fontWeight: "700",
                  borderBottom: `2px solid ${colors.primary.black}`,
                }
              : {}
          }
        >
          {page.label}
        </HeaderMenuButton>
      ))}
      <Popover
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
                    "&:not(last-of-type)": {
                      borderRight: `1px solid ${colors.primary.black}`,
                    },
                  }}
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
