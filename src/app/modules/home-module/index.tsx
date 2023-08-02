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
import HomeFooter from "app/modules/home-module/components/Footer";
import ChartsGrid from "app/modules/home-module/components/Charts/chartsGrid";
import ReportsGrid from "app/modules/home-module/components/Reports/reportsGrid";
import DatasetDetailImage from "app/modules/home-module/assets/dataset-detail.png";
import DatasetsGrid from "app/modules/home-module/components/Datasets/datasetsGrid";
import { ReactComponent as SortIcon } from "app/modules/home-module/assets/sort-fill.svg";
import { ReactComponent as GridIcon } from "app/modules/home-module/assets/grid-fill.svg";
import { ReactComponent as CloseIcon } from "app/modules/home-module/assets/close-icon.svg";
import { ReactComponent as SearchIcon } from "app/modules/home-module/assets/search-fill.svg";
import { ReactComponent as TopRightEllipse } from "app/modules/home-module/assets/top-right-ellipse.svg";
import { ReactComponent as BottomLeftEllipse } from "app/modules/home-module/assets/bottom-left-ellipse.svg";
import { ReactComponent as BottomRightEllipse } from "app/modules/home-module/assets/bottom-right-ellipse.svg";
import {
  TopRightEllipseCss,
  bottomLeftEllipseCss,
  bottomRightEllipseCss,
  datsetDetailImgcss,
  featuredAssetsCss,
  iconButtonCss,
  rowFlexCss,
  searchInputCss,
  sortByItemCss,
  turnsDataCss,
} from "app/modules/home-module/style";

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

export default function HomeModule() {
  useTitle("DX DataXplorer");

  // clear persisted state
  const clearPersistedReportState = useResetRecoilState(
    persistedReportStateAtom
  );
  const clearCreateChartFromReportState = useResetRecoilState(
    createChartFromReportAtom
  );

  const setReportPreviewMode = useRecoilState(
    unSavedReportPreviewModeAtom
  )[1];

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
      <div
        css={`
          position: relative;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            #f2f7fd 100%
          );
        `}
      >
        <Container maxWidth="lg">
          <Grid
            container
            spacing={6}
            css={turnsDataCss}
            alignItems="center"
            alignContent="flex-start"
          >
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <div
                css={`
                  max-width: 450px;
                `}
              >
                <h1>Turns data into impact</h1>
                <Box height={34} />
                <p>
                  <b>
                    Dx drives better business outcomes and intelligent customer
                    experiences with insights everywhere,
                    <br /> for everyone.
                  </b>
                </p>
                <Box height={52} />
                <div
                  css={`
                    ${rowFlexCss} gap: 32px;
                    width: 100%;
                  `}
                >
                  <Link
                    to="report/new/initial"
                    css={`
                      background: #6061e5;
                    `}
                  >
                    CREATE REPORT
                  </Link>
                  <button
                    onClick={exploreReportClick}
                    css={`
                      background: #e492bd;
                    `}
                  >
                    EXPLORE REPORTS
                  </button>
                </div>
              </div>
            </Grid>
            <Grid
              item
              lg={7}
              md={12}
              sm={12}
              xs={12}
              css={`
                display: flex;
                justify-content: flex-end;
                @media screen and (max-width: 1257px) {
                  justify-content: center;
                }
              `}
            >
              <img
                src={DatasetDetailImage}
                alt="dataset-detail-img"
                css={datsetDetailImgcss}
              />
            </Grid>
          </Grid>
        </Container>
        <BottomLeftEllipse css={bottomLeftEllipseCss} />
        <BottomRightEllipse css={bottomRightEllipseCss} />
        <TopRightEllipse css={TopRightEllipseCss} />
      </div>
      <Container
        maxWidth="lg"
        ref={exploreViewRef}
        css={`
          min-height: calc(100vh - 668px);
        `}
      >
        <Box height={52} />
        <Box css={featuredAssetsCss}>
          <h3>Featured assets in DX:</h3>
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
      <HomeFooter />
    </React.Fragment>
  );
}
