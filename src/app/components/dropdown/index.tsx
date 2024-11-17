import React from "react";
import { appColors } from "app/theme";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Menu, { MenuProps } from "@mui/material/Menu";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { DropdownProps } from "app/components/dropdown/data";
import { CategoryButton } from "app/components/search/styles";
import { ReactComponent as AddIcon } from "app/assets/vectors/ChartSettingsAddMedium.svg";
import Box from "@mui/material/Box";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
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
      filter: "invert(1)",
    },
  },
  "@media (max-width: 767px)": {
    height: "auto",
    minHeight: "32px",
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
    handleClose();
  };

  const dropdownSelectedIcon = React.useMemo(() => {
    const selected = props.dropdownItems.find(
      (item) => item.label === props.dropdownSelected
    );
    return selected ? selected.icon : null;
  }, [props.dropdownItems, props.dropdownSelected]);

  return (
    <React.Fragment>
      {props.secondary ? (
        <CategoryButton
          disableTouchRipple
          onClick={handleClick}
          theme={{ anchorEl: Boolean(anchorEl) }}
          style={{
            marginRight: 0,
            width: props.width ?? 200,
            maxHeight: props.height ?? 32,
            fontSize: props.compact ? "12px" : "14px",
            gap: "3px",
          }}
          data-cy="category-dropdown-button"
        >
          <Box
            sx={{
              svg: {
                display: "flex",
                flexShrink: 0,
                width: "13px",
                height: "14px",
              },
            }}
          >
            <AddIcon />
          </Box>
          <span style={{ letterSpacing: "0" }}>{props.dropdownSelected}</span>
          <ChevronRight
            fontSize={props.compact ? "small" : "medium"}
            sx={{ transform: `rotate(${anchorEl ? 90 : 0}deg)` }}
          />
        </CategoryButton>
      ) : (
        <CategoryButton
          disableTouchRipple
          onClick={handleClick}
          theme={{ anchorEl: Boolean(anchorEl) }}
          style={{
            marginRight: 0,
            width: props.width ?? 200,
            maxHeight: props.height ?? 32,
            fontSize: props.compact ? "12px" : "14px",
          }}
          data-cy="category-dropdown-button"
        >
          {dropdownSelectedIcon}
          <span style={{ letterSpacing: "0" }}>{props.dropdownSelected}</span>
          <ChevronRight
            fontSize={props.compact ? "small" : "medium"}
            sx={{ transform: `rotate(${anchorEl ? -90 : 90}deg)` }}
          />
        </CategoryButton>
      )}

      <StyledMenu
        keepMounted
        disableScrollLock
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        data-cy="category-dropdown-menu"
        anchorOrigin={{
          vertical: (props.height ?? 32) + 4,
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": {
            width: props.width,
            "@media (max-width: 767px)": {
              width: props.width ?? "180px",
            },
          },
        }}
      >
        {props.dropdownItems.map((item) => (
          <StyledMenuItem
            disableRipple
            key={item.label}
            disableTouchRipple
            data-cy={`category-dropdown-item`}
            onClick={handleItemClick(item.label)}
            style={props.compact ? { fontSize: "12px" } : {}}
            sx={
              props.dropdownSelected === item.label
                ? {
                    color: appColors.SEARCH.DROPDOWN_ITEM_ACTIVE_COLOR,
                    background:
                      appColors.SEARCH.DROPDOWN_ITEM_ACTIVE_BACKGROUND_COLOR,
                    "& svg": {
                      filter: "invert(1)",
                    },
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
