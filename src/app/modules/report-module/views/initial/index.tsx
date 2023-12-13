import React from "react";
import Grid from "@material-ui/core/Grid";
import {
  templates,
  TemplateItem,
  ReportInitialViewProps,
  ReportTemplateModel,
} from "app/modules/report-module/views/initial/data";

import { ReactComponent as CloseIcon } from "app/modules/report-module/asset/closeIcon.svg";
import { ReactComponent as SearchIcon } from "app/modules/report-module/asset/search-fill.svg";
import { ReactComponent as SortIcon } from "app/modules/report-module/asset/sort-fill.svg";
import { ReactComponent as GridIcon } from "app/modules/report-module/asset/grid-fill.svg";

import { IconButton, Popover } from "@material-ui/core";
import { persistedReportStateAtom } from "app/state/recoil/atoms";
import { useResetRecoilState } from "recoil";
import ReportsGrid from "app/modules/reports-overview-module/components/reportsGrid";
import {
  iconButtonCss,
  rowFlexCss,
  searchInputCss,
  sortByItemCss,
} from "app/modules/reports-overview-module/style";

export function ReportInitialView(props: ReportInitialViewProps) {
  const [tableView, setTableView] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [sortValue, setSortValue] = React.useState("createdDate");
  const [sortPopoverAnchorEl, setSortPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const openSortPopover = Boolean(sortPopoverAnchorEl);

  const sortOptions = [
    { label: "Last updated", value: "updatedDate" },
    { label: "Created date", value: "createdDate" },
    { label: "Name", value: "name" },
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleTemplateSelected = (option: ReportTemplateModel) => {
    props.setButtonActive(option.value);
  };
  const clearPersistedReportState = useResetRecoilState(
    persistedReportStateAtom
  );

  const handleCloseSortPopover = () => {
    setSortPopoverAnchorEl(null);
  };

  React.useEffect(() => {
    clearPersistedReportState();
    props.resetReport();
  }, []);

  return (
    <>
      <div
        css={`
          height: 26px;
        `}
      />
      <Grid container spacing={10}>
        {templates.map((option) => (
          <Grid key={option.value} item xs={12} sm={6} md={4}>
            <TemplateItem
              name={option.name}
              value={option.value}
              available={option.available}
              description={option.description}
              templateImg={option.templateImg}
              handleClick={() => handleTemplateSelected(option)}
            />
          </Grid>
        ))}
      </Grid>
      <div
        css={`
          height: 114px;
        `}
      />
      <hr
        css={`
          border: 0.1px solid #adb5bd;
        `}
      />
      <div
        css={`
          height: 81px;
        `}
      />
      <Grid
        container
        alignContent="space-between"
        alignItems="center"
        css={`
          width: 100%;
          margin-bottom: 44px;
        `}
      >
        <Grid item lg={6} md={6} sm={6}>
          <h4
            css={`
              font-size: 18px;
              line-height: 22px;
              color: #000000;
              font-family: "Gotham Narrow", sans-serif;
            `}
          >
            Or explore and duplicate one of the ready reports
          </h4>
        </Grid>
        <Grid item lg={6} md={6} sm={6}>
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
                  value={searchValue}
                  placeholder="eg. Kenya"
                  onChange={handleSearch}
                />
                <IconButton
                  onClick={() => {
                    setSearchValue("");
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
                }
              `}
            >
              <div
                css={`
                  color: #fff;
                  font-size: 12px;
                  padding: 8px 22px;
                  background: #231d2c;
                  font-family: "GothamNarrow-Bold", "Helvetica Neue", sans-serif;
                `}
              >
                Sort by
              </div>
              {sortOptions.map((option, index: number) => (
                <div
                  key={option.label}
                  css={sortByItemCss(sortValue === option.value, index)}
                  onClick={() => {
                    setSortValue(option.value);
                    handleCloseSortPopover();
                  }}
                >
                  {option.label}
                </div>
              ))}
            </Popover>
            <IconButton
              onClick={() => {
                setTableView(!tableView);
              }}
              css={iconButtonCss(tableView)}
            >
              <GridIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <ReportsGrid
        tableView={tableView}
        searchValue={searchValue}
        sortValue={sortValue}
      />
    </>
  );
}
