/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import Box from "@mui/material/Box";
import { appColors } from "app/theme";
import findIndex from "lodash/findIndex";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { useCMSData } from "app/hooks/useCMSData";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Menu, { MenuProps } from "@mui/material/Menu";
import { categories } from "app/components/search/data";
import useMediaQuery from "@mui/material/useMediaQuery";
import IconChevronRight from "@mui/icons-material/ChevronRight";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { SearchResults } from "app/components/search/components/results";
import {
  SearchResultModel,
  SearchResultsTabModel,
} from "app/components/search/components/results/data";
import {
  Input,
  Container,
  CategoryButton,
  MobileContainer,
  MobileBackButton,
} from "app/components/search/styles";

interface SearchLayoutProps {
  value: string;
  loading: boolean;
  category?: string;
  forceFocus?: boolean;
  onClose?: () => void;
  results: SearchResultsTabModel[];
  setValue: (value: string) => void;
  setCategory?: (value: string) => void;
  setStoredValue: (value: string) => void;
}

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    // getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 60,
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

export function SearchLayout(props: SearchLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const cmsData = useCMSData({ returnData: true });

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [data, setData] = React.useState<SearchResultModel[]>([]);
  const [open, setOpen] = React.useState(
    props.value.length > 0 ||
      (props.forceFocus !== undefined && props.forceFocus)
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (value: string) => () => {
    if (props.setCategory) {
      props.setCategory(value);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      props.setStoredValue("");
      props.setValue("");
      setOpen(false);
      handleClose();
      if (props.onClose) {
        props.onClose();
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!props.forceFocus) {
      const newOpen = props.value.length > 0;
      if (newOpen !== open) {
        setOpen(newOpen);
      }
    }
  }, [props.value]);

  React.useEffect(() => {
    setOpen(
      props.value.length > 0 ||
        (props.forceFocus !== undefined && props.forceFocus)
    );
  }, [props.forceFocus]);

  React.useEffect(() => {
    let allData: SearchResultModel[] = [];
    props.results.forEach((tab: SearchResultsTabModel) => {
      allData = [...allData, ...tab.results];
    });
    if (!isMobile && props.category && props.category !== categories[0].label) {
      const fIndex = findIndex(categories, { label: props.category }) - 1;
      if (props.results[fIndex]) {
        setData(props.results[fIndex].results);
      }
    } else {
      setData(allData);
    }
  }, [props.results, props.category, isMobile]);

  return (
    <MobileContainer>
      {!isMobile && props.category && props.setCategory && (
        <React.Fragment>
          <CategoryButton
            id="search-category-dropdown"
            disableTouchRipple
            onClick={handleClick}
            theme={{
              anchorEl: Boolean(anchorEl),
            }}
          >
            <span>{props.category}</span>
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
            id="search-menu"
            disableScrollLock
            anchorEl={anchorEl}
            onClose={handleClose}
            open={Boolean(anchorEl)}
          >
            {categories.map((category) => (
              <StyledMenuItem
                disableRipple
                disableTouchRipple
                key={category.label}
                onClick={handleItemClick(category.label)}
                sx={
                  props.category === category.label
                    ? {
                        color: appColors.SEARCH.DROPDOWN_ITEM_ACTIVE_COLOR,
                        background:
                          appColors.SEARCH
                            .DROPDOWN_ITEM_ACTIVE_BACKGROUND_COLOR,
                        svg: {
                          path: {
                            fill: appColors.SEARCH.DROPDOWN_ITEM_ACTIVE_COLOR,
                          },
                        },
                      }
                    : {}
                }
              >
                {category.icon} <span>{category.label}</span>
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </React.Fragment>
      )}
      <Container
        id="search-container"
        theme={{
          focused: open,
          withCatMenu:
            !isMobile && Boolean(props.category) && Boolean(props.setCategory),
        }}
      >
        {isMobile && open && (
          <MobileBackButton
            onClick={() => {
              props.setValue("");
              if (props.onClose) {
                props.onClose();
              }
            }}
          >
            <IconChevronRight />
          </MobileBackButton>
        )}
        <Input
          type="text"
          tabIndex={0}
          ref={inputRef}
          value={props.value}
          placeholder={get(
            cmsData,
            "componentsSearch.placeholder",
            "What are you looking for?"
          )}
          autoFocus={props.forceFocus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setValue(e.target.value)
          }
        />
        {props.value.length > 0 && (
          <IconButton
            onClick={() => {
              props.setValue("");
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }}
            sx={{
              padding: 0,
              marginRight: "16px",
              "&:hover": {
                background: "transparent",
              },
              svg: {
                path: {
                  fill: appColors.SEARCH.INPUT_COLOR,
                },
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        )}
        <SearchIcon htmlColor={appColors.COMMON.BLACK} />
      </Container>
      {open && (
        <ClickAwayListener
          onClickAway={(event) => {
            if (
              // @ts-ignore
              get(event.target, "tagName", "") !== "INPUT" &&
              !isMobile &&
              !props.forceFocus
            ) {
              props.setValue("");
            }
          }}
        >
          <Box>
            <SearchResults loading={props.loading} results={data} />
          </Box>
        </ClickAwayListener>
      )}
    </MobileContainer>
  );
}
