/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import get from "lodash/get";
import findIndex from "lodash/findIndex";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import { useCMSData } from "app/hooks/useCMSData";
import { SearchIcon } from "app/assets/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import IconChevronRight from "app/assets/icons/IconChevronRight";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowDownward from "@material-ui/icons/ArrowDropDown";
import { SearchResults } from "app/components/Search/components/results";
import {
  SearchResultModel,
  SearchResultsTabModel,
} from "app/components/Search/components/results/data";
import {
  container,
  input,
  mobilecontainer,
  mobilebackbutton,
} from "app/components/Search/styles";
import { categories } from "app/components/Search/data";

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

const StyledMenu = withStyles({
  paper: {
    width: 200,
    borderRadius: 10,
    background: "#dfe3e6",
    boxShadow: "0px 0px 10px rgba(152, 161, 170, 0.6)",
    "&::-webkit-scrollbar": {
      width: 5,
      borderRadius: 2,
      background: "#231d2c",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: 2,
      background: "#dfe3e6",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: 2,
      background: "#231d2c",
    },
  },
  list: {
    padding: 0,
    maxHeight: 280,
  },
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
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
));

const StyledMenuItem = withStyles(() => ({
  root: {
    height: 40,
    width: "100%",
    color: "#262C34",
    fontSize: "14px",
    padding: "0 12px",
    "& svg": {
      marginRight: "14px",
    },
    "&:hover": {
      color: "#fff",
      background: "#231d2c",
    },
  },
}))(MenuItem);

export function SearchLayout(props: SearchLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const cmsData = useCMSData({ returnData: true });

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
    <div css={mobilecontainer(open)}>
      {!isMobile && props.category && props.setCategory && (
        <React.Fragment>
          <Button
            disableTouchRipple
            onClick={handleClick}
            css={`
              width: 200px;
              font-weight: 325;
              font-size: 14px;
              padding: 6px 16px;
              color: #000000;
              background: #cfd4da;
              text-transform: capitalize;
              max-width: calc(50vw - 32px);
              border-radius: 20px 0 0 20px;

              &:hover {
                color: #fff;
                background: #231d2c;

                svg {
                  > path {
                    fill: #fff;
                  }
                }
              }

              .MuiButton-label {
                justify-content: space-between;
              }

              svg {
                transition: all 0.2s ease-in-out;
                transform: rotate(${anchorEl ? "180" : "0"}deg);

                > path {
                  fill: #231d2c;
                }
              }
            `}
          >
            <span
              css={`
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              `}
            >
              {props.category}
            </span>
            <ArrowDownward />
          </Button>
          <StyledMenu
            keepMounted
            id="search-menu"
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
                css={`
                  font-weight: 500;
                  ${props.category === category.label &&
                  `
                    color: #fff;
                    background: #231d2c;
                  `}
                `}
              >
                {category.icon} <span>{category.label}</span>
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </React.Fragment>
      )}
      <div
        id="search-container"
        css={container(
          open,
          !isMobile && Boolean(props.category) && Boolean(props.setCategory)
        )}
      >
        {isMobile && open && (
          <span
            css={mobilebackbutton}
            onClick={() => {
              props.setValue("");
              if (props.onClose) {
                props.onClose();
              }
            }}
          >
            <IconChevronRight />
          </span>
        )}
        <input
          type="text"
          css={input}
          tabIndex={0}
          value={props.value}
          placeholder={get(
            cmsData,
            "componentsSearch.placeholder",
            "eg. Kenya"
          )}
          autoFocus={props.forceFocus}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            props.setValue(e.target.value)
          }
        />
        <SearchIcon />
        {open && (
          <ClickAwayListener
            onClickAway={(event: React.MouseEvent<Document, MouseEvent>) => {
              if (
                get(event.target, "tagName", "") !== "INPUT" &&
                !isMobile &&
                !props.forceFocus
              ) {
                props.setValue("");
              }
            }}
          >
            <div>
              <SearchResults loading={props.loading} results={data} />
            </div>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
}
