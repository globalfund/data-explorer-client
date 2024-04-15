import React from "react";
import { appColors } from "app/theme";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Menu, { MenuProps } from "@mui/material/Menu";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { DropdownProps } from "app/components/dropdown/data";
import { CategoryButton } from "app/components/search/styles";

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
    borderRadius: 4,
    background: appColors.SEARCH.DROPDOWN_BACKGROUND_COLOR,
    border: `1px solid ${appColors.SEARCH.DROPDOWN_BUTTON_BORDER_COLOR}`,
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
    padding: 4,
    maxHeight: 280,
  },
});

const StyledMenuItem = styled(MenuItem)(() => ({
  width: "100%",
  fontSize: "14px",
  padding: "2px 4px",
  borderRadius: "4px",
  color: appColors.SEARCH.DROPDOWN_ITEM_BACKGROUND_COLOR,
  "& svg": {
    marginRight: "8px",
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

  const dropdownSelectedIcon = React.useMemo(() => {
    const selected = props.dropdownItems.find(
      (item) => item.label === props.dropdownSelected
    );
    return selected ? selected.icon : null;
  }, [props.dropdownItems, props.dropdownSelected]);

  return (
    <React.Fragment>
      <CategoryButton
        disableTouchRipple
        onClick={handleClick}
        theme={{ anchorEl: Boolean(anchorEl) }}
        style={{ maxHeight: "32px", marginRight: 0 }}
      >
        {dropdownSelectedIcon}
        <span style={{ letterSpacing: "0" }}>{props.dropdownSelected}</span>
        <ChevronRight sx={{ transform: `rotate(${anchorEl ? -90 : 90}deg)` }} />
      </CategoryButton>
      <StyledMenu
        keepMounted
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        sx={{
          "& .MuiPaper-root": {
            width: props.width,
          },
        }}
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
            {item.icon}
            <span>{item.label}</span>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </React.Fragment>
  );
};
