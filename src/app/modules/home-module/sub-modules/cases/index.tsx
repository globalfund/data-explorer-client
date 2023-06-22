import React from "react";
import Box from "@material-ui/core/Box";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from "react-swipeable-views";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import HomeFooter from "app/modules/home-module/components/Footer";
import DXBlock from "app/modules/home-module/sub-modules/cases/components/useDXBlock";
import QuoteBlock from "app/modules/home-module/sub-modules/cases/components/quoteBlock";
import EmpowerBlock from "app/modules/home-module/sub-modules/cases/components/empowerBlock";
import OurPartnersBlock from "app/modules/home-module/sub-modules/cases/components/ourPartnersBlock";
import BestDecisionBlock from "app/modules/home-module/sub-modules/cases/components/bestDecisionBlock";
import {
  AboutTabCard,
  BudgetsTabCard,
  GrantsTabCard,
  PerformanceTabCard,
} from "app/modules/home-module/sub-modules/cases/components/tabCard";

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

export default function CasesModule() {
  const [displayTab, setDisplayTab] = React.useState<number>(0);

  const handleChange = (
    event: React.ChangeEvent<{}> | null,
    newValue: number
  ) => {
    setDisplayTab(newValue);
  };

  const cards = [
    <AboutTabCard />,
    <GrantsTabCard />,
    <BudgetsTabCard />,
    <PerformanceTabCard />,
  ];

  return (
    <>
      <EmpowerBlock />
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
          <Grid
            container
            justifyContent="center"
            css={`
              width: 100%;
              margin-top: 78px;
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
            <SwipeableViews
              index={displayTab}
              onChangeIndex={(index) => handleChange(null, index)}
              style={{ margin: "55px 0 110px 0" }}
            >
              {cards.map((card, index) => (
                <div key={index}>{card}</div>
              ))}
            </SwipeableViews>
          </Grid>
          <QuoteBlock />
        </Grid>
        <Box height={150} />
        <BestDecisionBlock />
        <Box height={150} />
      </Container>
      <HomeFooter />
    </>
  );
}
