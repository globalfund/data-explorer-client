import React from "react";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import HomeFooter from "app/modules/home-module/components/Footer";
import DXBlock from "app/modules/home-module/sub-modules/partners/components/useDXBlock";
import QuoteBlock from "app/modules/home-module/sub-modules/partners/components/quoteBlock";
import EmpowerBlock from "app/modules/home-module/sub-modules/partners/components/empowerBlock";
import OurPartnersBlock from "app/modules/home-module/sub-modules/partners/components/ourPartnersBlock";
import BestDecisionBlock from "app/modules/home-module/sub-modules/partners/components/bestDecisionBlock";
import {
  AboutTabCard,
  BudgetsTabCard,
  GrantsTabCard,
  PerformanceTabCard,
} from "app/modules/home-module/sub-modules/partners/components/tabCard";

export const StyledTab = withStyles(() => ({
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
      "& .MuiTab-wrapper": {
        fontSize: "24px",
        fontWeight: 700,
        fontFamily: "Inter, sans-serif",
        "@media (max-width: 768px)": {
          fontSize: "16px",
        },
      },
      "&.Mui-selected": {
        "& .MuiTab-wrapper": {
          fontSize: "24px",
          fontWeight: 700,
          fontFamily: "Inter, sans-serif",
          "@media (max-width: 768px)": {
            fontSize: "16px",
          },
        },
      },
    },
  },
}))(Tab);

export const StyledTabs = withStyles({
  root: {
    "& .MuiTabs-scroller": {
      "& .MuiTabs-flexContainer": {
        gap: "113px",
        "@media (max-width: 768px)": {
          gap: "40px",
        },
      },
    },
  },
})(Tabs);

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Pagination = (props: {
  index: number;
  onChangeIndex: (index: number) => void;
  dots: number;
}) => (
  <div
    css={`
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 95%;
      left: 0%;
      width: 100%;
      padding-bottom: 40px;
      gap: 8px;
    `}
  >
    {new Array(props.dots).fill(0).map((_, i) => (
      <div
        key={i}
        css={`
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${props.index === i ? "#DADAF8" : "#fff"};
          cursor: pointer;
        `}
        onClick={() => props.onChangeIndex(i)}
      />
    ))}
  </div>
);
export default function PartnersModule() {
  const [displayTab, setDisplayTab] = React.useState<number>(0);
  const handleChange = (
    event: React.ChangeEvent<{}> | null,
    newValue: number
  ) => {
    setDisplayTab(newValue);
  };
  const [autoPlay, setAutoPlay] = React.useState<boolean>(true);

  const cards = [
    <AboutTabCard />,
    <GrantsTabCard />,
    <BudgetsTabCard />,
    <PerformanceTabCard />,
  ];

  return (
    <>
      <EmpowerBlock view="partners" />
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          css={`
            width: 100%;
          `}
        >
          <OurPartnersBlock />
          <DXBlock />
          <div
            onMouseEnter={() => setAutoPlay(false)}
            onMouseLeave={() => setAutoPlay(true)}
            css={`
              width: 100%;
              margin-top: 78px;
              position: relative;
              height: 639px;
            `}
          >
            <div
              css={`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              `}
            >
              <StyledTabs
                css={`
                  margin-left: 5px;
                `}
                TabIndicatorProps={{
                  style: {
                    bottom: "0px",
                    height: "4px",
                  },
                }}
                value={displayTab}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                className="Home-MuiTabs-flexContainer"
              >
                <StyledTab label="About" value={0} />
                <StyledTab label="Grants" value={1} />
                <StyledTab label="Budgets" value={2} />
                <StyledTab label="Performance" value={3} />
              </StyledTabs>
            </div>
            <div>
              <AutoPlaySwipeableViews
                index={displayTab}
                onChangeIndex={(index) => autoPlay && handleChange(null, index)}
                style={{ margin: "55px 0 110px 0" }}
                animateTransitions={true}
                interval={3000}
              >
                {cards.map((card, index) => (
                  <div key={index}>{card}</div>
                ))}
              </AutoPlaySwipeableViews>
            </div>

            <Pagination
              dots={4}
              index={displayTab}
              onChangeIndex={(index) => handleChange(null, index)}
            />
          </div>
          <div
            css={`
              height: 75px;
            `}
          />
          <QuoteBlock />
        </Grid>
        <Box height={150} />
        <BestDecisionBlock />
      </Container>
      <div css="width: 100%;height: 128px" />
      <HomeFooter />
    </>
  );
}
