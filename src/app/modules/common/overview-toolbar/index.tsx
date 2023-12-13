import React from "react";
import { Link } from "react-router-dom";
import { Grid, IconButton, Popover } from "@material-ui/core";
import { ReactComponent as SortIcon } from "app/modules/reports-overview-module/assets/sort-icon.svg";
import { ReactComponent as GridIcon } from "app/modules/reports-overview-module/assets/grid-icon.svg";
import { ReactComponent as ChartIcon } from "app/modules/reports-overview-module/assets/chart-icon.svg";
import { ReactComponent as TableIcon } from "app/modules/reports-overview-module/assets/table-icon.svg";
import { ReactComponent as CloseIcon } from "app/modules/reports-overview-module/assets/close-icon.svg";
import { ReactComponent as SearchIcon } from "app/modules/reports-overview-module/assets/search-icon.svg";
import {
  rowFlexCss,
  sortByItemCss,
  iconButtonCss,
  searchInputCss,
} from "app/modules/reports-overview-module/style";

interface Props {
  title: string;
  sortValue: string;
  tableView: boolean;
  buttonPath: string;
  searchValue: string;
  buttonTitle: string;
  sortOptions: { label: string; value: string }[];
  setSortValue: React.Dispatch<React.SetStateAction<string>>;
  setTableView: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function OverviewToolbar(props: Props) {
  const [sortPopoverAnchorEl, setSortPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);
  const [viewPopoverAnchorEl, setViewPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [openSearch, setOpenSearch] = React.useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setSearchValue(e.target.value);
  };

  const handleCloseSortPopover = () => {
    setSortPopoverAnchorEl(null);
  };

  const handleCloseViewPopover = () => {
    setViewPopoverAnchorEl(null);
  };

  const openSortPopover = Boolean(sortPopoverAnchorEl);
  const openViewPopover = Boolean(viewPopoverAnchorEl);

  return (
    <Grid
      container
      alignItems="center"
      css={`
        width: 100%;
      `}
    >
      <Grid item md={5} lg={3}>
        <h4
          css={`
            font-size: 24px;
            font-family: "Gotham Narrow", sans-serif;
            line-height: 24px;
            color: #252c34;
            font-weight: bold;
          `}
        >
          {" "}
          {props.title}
        </h4>
      </Grid>
      <Grid item lg={9} md={6} sm={6}>
        <div
          css={`
            ${rowFlexCss}
            justify-content: flex-end;
            gap: 8px;
          `}
        >
          <div
            css={`
              display: flex;
              align-items: center;
              gap: 8px;
            `}
          >
            <div css={searchInputCss(openSearch)}>
              <input
                type="text"
                ref={inputRef}
                value={props.searchValue}
                placeholder="eg. Kenya"
                onChange={handleSearch}
              />
              <IconButton
                onClick={() => {
                  props.setSearchValue("");
                  setOpenSearch(false);
                }}
                css={`
                  &:hover {
                    background: transparent;
                  }
                `}
              >
                <CloseIcon
                  css={`
                    margin-top: 1px;
                  `}
                />
              </IconButton>
            </div>
            <IconButton
              onClick={() => {
                setOpenSearch(true);
                inputRef.current?.focus();
              }}
              css={iconButtonCss(openSearch)}
            >
              <SearchIcon />
            </IconButton>
          </div>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setSortPopoverAnchorEl(
                sortPopoverAnchorEl ? null : event.currentTarget
              );
            }}
            css={iconButtonCss(openSortPopover)}
          >
            <SortIcon />
          </IconButton>
          <Popover
            open={openSortPopover}
            anchorEl={sortPopoverAnchorEl}
            onClose={handleCloseSortPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            css={`
              .MuiPaper-root {
                border-radius: 5px;
                width: 154px;
              }
            `}
          >
            {props.sortOptions.map((option, index) => (
              <div
                key={option.label}
                css={sortByItemCss(props.sortValue === option.value, index)}
                onClick={() => {
                  props.setSortValue(option.value);
                  handleCloseSortPopover();
                }}
              >
                {option.label}
              </div>
            ))}
          </Popover>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
              setViewPopoverAnchorEl(
                viewPopoverAnchorEl ? null : event.currentTarget
              );
            }}
            css={iconButtonCss(false)}
          >
            {props.tableView ? <TableIcon /> : <GridIcon />}
          </IconButton>
          <Popover
            open={openViewPopover}
            anchorEl={viewPopoverAnchorEl}
            onClose={handleCloseViewPopover}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            css={`
              .MuiPaper-root {
                border-radius: 8px;
              }
            `}
          >
            <div
              css={`
                width: 95px;
                height: 87px;
                background: #ffffff;
                color: #262c34;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: flex-start;
                font-family: "GothamNarrow-Light", "Helvetica Neue", sans-serif;

                div {
                  display: flex;
                  gap: 8px;
                  align-items: center;
                  padding-left: 8px;
                  width: 100%;
                  height: 100%;

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
                  }

                  &:hover {
                    background: #262c34;
                    button {
                      color: #fff;
                    }
                  }
                }
              `}
            >
              <div
                css={
                  !props.tableView
                    ? `
                background: #262c34;
                button {
                  color: #fff;
                }
              `
                    : ""
                }
              >
                <button onClick={() => props.setTableView(false)}>
                  <ChartIcon />
                  List
                </button>
              </div>
              <div
                css={
                  props.tableView
                    ? `
                background: #262c34;
                button {
                  color: #fff;
                }
              `
                    : ""
                }
              >
                <button onClick={() => props.setTableView(true)}>
                  <TableIcon />
                  Table
                </button>
              </div>
            </div>
          </Popover>
          <Link
            to={props.buttonPath}
            css={`
              outline: none;
              border: none;
              text-decoration: none;
              background: #262c34;
              width: 90px;
              height: 32px;
              white-space: nowrap;
              font-weight: bold;
              cursor: pointer;
              padding: 8px 22px;
              border-radius: 100px;
              justify-content: center;
              align-items: center;
              display: flex;
              color: #fff;
              font-size: 12px;
              font-family: "Gotham Narrow", sans-serif;
            `}
          >
            {props.buttonTitle}
          </Link>
        </div>
      </Grid>
    </Grid>
  );
}
