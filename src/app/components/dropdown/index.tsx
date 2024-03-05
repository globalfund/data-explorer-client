import React from "react";
import { appColors } from "app/theme";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Menu, { MenuProps } from "@mui/material/Menu";
import { DropdownProps } from "app/components/dropdown/data";
import { CategoryButton } from "app/components/search/styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    // getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 40,
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    autoFocus={false}
    {...props}
  />
))({
  "& .MuiPaper-root": {
    width: 200,
    borderRadius: 8,
    background: appColors.SEARCH.DROPDOWN_BACKGROUND_COLOR,
    boxShadow: "0px 0px 10px 0px rgba(152, 161, 170, 0.60)",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 2,
      background: appColors.SEARCH.DROPDOWN_SCROLLBAR_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 2,
      background: appColors.SEARCH.DROPDOWN_SCROLLBAR_TRACK_BACKGROUND_COLOR,
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 2,
      background: appColors.SEARCH.DROPDOWN_SCROLLBAR_THUMB_BACKGROUND_COLOR,
    },
  },
  "& .MuiMenu-list": {
    padding: 8,
    maxHeight: 280,
  },
});

const StyledMenuItem = styled(MenuItem)(() => ({
  height: 36,
  width: "100%",
  fontSize: "14px",
  padding: "0 8px",
  borderRadius: "8px",
  color: appColors.SEARCH.DROPDOWN_ITEM_BACKGROUND_COLOR,
  "& svg": {
    marginRight: "8px",
    path: {
      fill: appColors.SEARCH.DROPDOWN_ITEM_BACKGROUND_COLOR,
    },
  },
  "&:hover": {
    color: appColors.SEARCH.DROPDOWN_ITEM_HOVER_COLOR,
    background: appColors.SEARCH.DROPDOWN_ITEM_HOVER_BACKGROUND_COLOR,
    "& svg": {
      path: {
        fill: appColors.SEARCH.DROPDOWN_ITEM_HOVER_COLOR,
      },
    },
  },
}));

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (value: string) => () => {
    props.handleDropdownChange(value);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <CategoryButton
        disableTouchRipple
        onClick={handleClick}
        theme={{ anchorEl: true }}
        style={{ maxHeight: "32px", marginRight: 0 }}
      >
        <span style={{ letterSpacing: "0" }}>
          <b>{props.dropdownSelected}</b>
        </span>
        <ArrowDropDownIcon
          sx={
            anchorEl
              ? {
                  transform: "rotate(180deg)",
                }
              : {}
          }
        />
      </CategoryButton>
      <StyledMenu
        keepMounted
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        {props.dropdownItems.map((item) => (
          <StyledMenuItem
            disableRipple
            key={item.label}
            disableTouchRipple
            onClick={handleItemClick(item.label)}
            sx={
              props.dropdownSelected === item.label
                ? {
                    color: appColors.SEARCH.DROPDOWN_ITEM_ACTIVE_COLOR,
                    background:
                      appColors.SEARCH.DROPDOWN_ITEM_ACTIVE_BACKGROUND_COLOR,
                  }
                : {}
            }
          >
            <span>{item.label}</span>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </React.Fragment>
  );
};
