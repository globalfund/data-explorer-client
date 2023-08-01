/* third-party */
import React from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import useTitle from "react-use/lib/useTitle";
import {
  Tab,
  Box,
  Grid,
  Tabs,
  Container,
  withStyles,
  IconButton,
  Popover,
} from "@material-ui/core";
/* project */
import {
  createChartFromReportAtom,
  homeDisplayAtom,
  persistedReportStateAtom,
  unSavedReportPreviewModeAtom,
} from "app/state/recoil/atoms";

import { ReactComponent as SortIcon } from "app/modules/home-module/assets/sort-fill.svg";
import { ReactComponent as GridIcon } from "app/modules/home-module/assets/grid-fill.svg";
import { ReactComponent as CloseIcon } from "app/modules/home-module/assets/close-icon.svg";
import { ReactComponent as SearchIcon } from "app/modules/home-module/assets/search-fill.svg";

import {
  featuredAssetsCss,
  iconButtonCss,
  rowFlexCss,
  searchInputCss,
  sortByItemCss,
} from "app/modules/home-module/style";
import DatasetsGrid from "app/modules/home-module/components/Datasets/datasetsGrid";
import ChartsGrid from "app/modules/home-module/components/Charts/chartsGrid";
import ReportsGrid from "app/modules/home-module/components/Reports/reportsGrid";

const StyledTab = withStyles(() => ({
  root: {
    "&.MuiButtonBase-root": {
      "&.MuiTab-root": {
        width: "fit-content",
        minWidth: "fit-content",
        padding: "0px ",
        textTransform: "none",
      },
    },
    "&.MuiTab-textColorPrimary": {
      "&.Mui-selected": {
        "& .MuiTab-wrapper": {
          fontFamily: "GothamNarrow-Bold",
        },
      },
    },
  },
}))(Tab);

const StyledTabs = withStyles({
  root: {
    "& .MuiTabs-scroller": {
      "& .MuiTabs-flexContainer": {
        gap: "45px",
      },
    },
  },
})(Tabs);

export default function ExploreAssetsModule() {
  useTitle("DX DataXplorer");
  // clear persisted state
  const clearPersistedReportState = useResetRecoilState(
    persistedReportStateAtom
  );
  const clearCreateChartFromReportState = useResetRecoilState(
    createChartFromReportAtom
  );

  const [_, setReportPreviewMode] = useRecoilState(
    unSavedReportPreviewModeAtom
  );
  React.useEffect(() => {
    clearPersistedReportState();
    clearCreateChartFromReportState();
    setReportPreviewMode(false);
  }, []);

  const [tableView, setTableView] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [openSearch, setOpenSearch] = React.useState(false);
  const [sortValue, setSortValue] = React.useState("createdDate");
  const [sortPopoverAnchorEl, setSortPopoverAnchorEl] =
    React.useState<HTMLButtonElement | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);
  const exploreViewRef = React.useRef<HTMLDivElement>(null);

  const [display, setDisplay] = useRecoilState(homeDisplayAtom);

  const sortOptions = [
    { label: "Last updated", value: "updatedDate" },
    { label: "Created date", value: "createdDate" },
    { label: "Name", value: "name" },
  ];

  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: "data" | "charts" | "reports"
  ) => {
    setDisplay(newValue);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const displayGrid = (searchStr: string, sortByStr: string) => {
    switch (display) {
      case "data":
        return (
          <DatasetsGrid
            sortBy={sortByStr}
            searchStr={searchStr}
            tableView={tableView}
          />
        );
      case "charts":
        return (
          <ChartsGrid
            sortBy={sortByStr}
            searchStr={searchStr}
            tableView={tableView}
          />
        );
      case "reports":
        return (
          <ReportsGrid
            sortBy={sortByStr}
            searchStr={searchStr}
            tableView={tableView}
            showMenuButton={false}
          />
        );
      default:
        break;
    }
  };

  const exploreReportClick = () => {
    setDisplay("reports");
    exploreViewRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseSortPopover = () => {
    setSortPopoverAnchorEl(null);
  };

  const openSortPopover = Boolean(sortPopoverAnchorEl);

  return (
    <React.Fragment>
      <Container
        maxWidth="lg"
        ref={exploreViewRef}
        css={`
          min-height: calc(100vh - 668px);
        `}
      >
        <Box height={82} />
        <Box css={featuredAssetsCss}>
          <Box height={20} />
          <Grid
            container
            alignContent="space-between"
            alignItems="center"
            css={`
              width: 100%;
            `}
          >
            <Grid item lg={6} md={6} sm={6}>
              <StyledTabs
                css={`
                  margin-left: 5px;
                `}
                TabIndicatorProps={{
                  style: {
                    bottom: "12px",
                    height: "2px",
                  },
                }}
                value={display}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                className="Home-MuiTabs-flexContainer"
              >
                <StyledTab label="Data" value="data" />
                <StyledTab label="Charts" value="charts" />
                <StyledTab label="Reports" value="reports" />
              </StyledTabs>
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
                      font-family: "GothamNarrow-Bold", "Helvetica Neue",
                        sans-serif;
                    `}
                  >
                    Sort by
                  </div>
                  {sortOptions.map((option) => (
                    <div
                      key={option.label}
                      css={sortByItemCss(sortValue === option.value)}
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
          <Box height={20} />
        </Box>
        <div>{displayGrid(searchValue, sortValue)}</div>
      </Container>
      <Box height={100} />
    </React.Fragment>
  );
}
