/* third-party */
import React from "react";
import { useRecoilState } from "recoil";
import useTitle from "react-use/lib/useTitle";
import Container from "@material-ui/core/Container";
/* project */
import { Search } from "app/components/Search";
import { homeDisplayAtom } from "app/state/recoil/atoms";
import ToggleButtons from "app/components/ToggleButton/toggleButtonGroup";
import ChartsGrid from "app/modules/home-module/components/Charts/chartsGrid";
import ReportsGrid from "app/modules/home-module/components/Reports/reportsGrid";
import DatasetsGrid from "app/modules/home-module/components/Datasets/datasetsGrid";
import DatasetDetailImage from "app/modules/home-module/assets/dataset-detail.png";
import { ReactComponent as BottomLeftEllipse } from "app/modules/home-module/assets/bottom-left-ellipse.svg";
import { ReactComponent as BottomRightEllipse } from "app/modules/home-module/assets/bottom-right-ellipse.svg";
import { ReactComponent as TopRightEllipse } from "app/modules/home-module/assets/top-right-ellipse.svg";
import { ReactComponent as CloseIcon } from "app/modules/home-module/assets/close-icon.svg";

import { ReactComponent as SearchIcon } from "app/modules/home-module/assets/search-fill.svg";
import { ReactComponent as SortIcon } from "app/modules/home-module/assets/sort-fill.svg";
import { ReactComponent as GridIcon } from "app/modules/home-module/assets/grid-fill.svg";

import {
  Box,
  Grid,
  IconButton,
  Tab,
  Tabs,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import {
  TopRightEllipseCss,
  bottomLeftEllipseCss,
  bottomRightEllipseCss,
  datsetDetailImgcss,
  featuredAssetsCss,
  iconButtonCss,
  rowFlexCss,
  searchInputCss,
  turnsDataCss,
} from "./style";
import HomeFooter from "./components/Footer";

const StyledTab = withStyles((theme) => ({
  root: {
    "&.MuiButtonBase-root": {
      "&.MuiTab-root": {
        width: "fit-content",
        minWidth: "fit-content",
        padding: "0px ",
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

  const [display, setDisplay] = useRecoilState(homeDisplayAtom);
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: "data" | "charts" | "reports"
  ) => {
    setDisplay(newValue);
  };
  const [openSearch, setOpenSearch] = React.useState(false);
  const displayGrid = () => {
    switch (display) {
      case "data":
        return <DatasetsGrid />;
      case "charts":
        return <ChartsGrid />;
      case "reports":
        return <ReportsGrid />;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <div
        css={`
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0) 0%,
            #f2f7fd 100%
          );
        `}
      >
        <Container maxWidth="lg" css={``}>
          <Grid
            container
            spacing={6}
            css={turnsDataCss}
            alignItems="center"
            alignContent="flex-start"
          >
            <Grid item lg={5} md={12} sm={12} xs={12}>
              <div>
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
                  <button>CREATE REPORT</button>
                  <button>EXPLORE REPORTS</button>
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
              <BottomLeftEllipse css={bottomLeftEllipseCss} />
              <BottomRightEllipse css={bottomRightEllipseCss} />
              <TopRightEllipse css={TopRightEllipseCss} />
            </Grid>
          </Grid>
        </Container>
      </div>
      <Container maxWidth="lg">
        <Box height={52} />
        <Box css={featuredAssetsCss}>
          <h3>Explore featured assets in DX:</h3>
          <Box height={22} />

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
                <StyledTab label="Data" value={"data"} />
                <StyledTab label="Charts" value={"charts"} />
                <StyledTab label="Reports" value={"reports"} />
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
                    <input type="text" placeholder="eg. Kenya" />
                    <IconButton
                      onClick={() => setOpenSearch(false)}
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
                    onClick={() => setOpenSearch(!openSearch)}
                    css={iconButtonCss(openSearch)}
                  >
                    <SearchIcon />
                  </IconButton>
                </div>
                <IconButton css={iconButtonCss()}>
                  <SortIcon />
                </IconButton>
                <IconButton css={iconButtonCss()}>
                  <GridIcon />
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <Box height={22} />
        </Box>
        <div>{displayGrid()}</div>
      </Container>

      <Box height={100} />
      <HomeFooter />
    </React.Fragment>
  );
}
