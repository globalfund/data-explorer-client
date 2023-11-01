import React from "react";
import Grid from "@material-ui/core/Grid";
import { ReactComponent as AIPoweredImg } from "app/modules/home-module/assets/whydx-ai-powered-illustration.svg";
import { ReactComponent as CharVizImg } from "app/modules/home-module/assets/whydx-chartviz-illustration.svg";
import { ReactComponent as OpenSourceImg } from "app/modules/home-module/assets/whydx-opensource-illustration.svg";
import { ReactComponent as ReportsImg } from "app/modules/home-module/assets/whydx-reports-illustration.svg";
import { ReactComponent as SearchImg } from "app/modules/home-module/assets/whydx-search-illustration.svg";

export default function KeyFeaturesBlock() {
  return (
    <div
      css={`
        position: relative;
        z-index: 1;
        h3 {
          font-size: 36px;
          line-height: 43px;
          text-align: center;
          color: #000000;
          margin-top: 0;
          margin-bottom: 83px;
        }
        h4 {
          font-size: 36px;
          line-height: 20px;
          font-family: "GothamNarrow-Bold", sans-serif;
          margin-bottom: 25px;
          margin-top: 0;
          color: #231d2c;
        }
        p {
          font-family: "GothamNarrow", sans-serif;
          font-weight: 350;
          line-height: 30px;
          letter-spacing: 0.5px;
          font-size: 20px;
          color: #231d2c;
        }
      `}
    >
      <h3>
        <b>Unlock the Power of Data with DataXplorer</b>
      </h3>
      <Grid
        container
        spacing={9}
        alignItems="center"
        css={`
          text-align: left;
        `}
      >
        <Grid item md={6}>
          <SearchImg />
        </Grid>
        <Grid item md={6}>
          <div>
            <h4>All-in-One Stack</h4>
            <p>
              DataXplorer consolidates all your data management needs into a
              single, integrated stack. Whether it's data integration,
              visualization, or report creation, you'll find it all here. No
              more juggling multiple tools or struggling to maintain
              compatibility. <br /> <br />
              Our open-source platform simplifies your workflow, making your
              mission more efficient, and saving you time and resources
            </p>
          </div>
        </Grid>
      </Grid>
      <div
        css={`
          height: 140px;
        `}
      />
      <Grid container spacing={9} alignItems="center">
        <Grid item md={6}>
          <div>
            <h4>Connect Data with Ease</h4>
            <p>
              DataXplorer simplifies the complex task of data integration,
              enabling you to seamlessly centralize your crucial datasets. Gone
              are the days of laborious manual data manipulation; we've
              streamlined the process for your convenience. <br /> <br />
              Spend less time on data wrangling and more on what matters most -
              making informed decisions.
            </p>
          </div>
        </Grid>
        <Grid item md={6}>
          <AIPoweredImg
            css={`
              margin-left: -30px;
            `}
          />
        </Grid>
      </Grid>
      <div
        css={`
          height: 138px;
        `}
      />
      <Grid container spacing={9} alignItems="center">
        <Grid item md={6}>
          <CharVizImg
            css={`
              margin-left: -30px;
            `}
          />
        </Grid>
        <Grid item md={6}>
          <div>
            <h4>Visualize Your Impact</h4>
            <p>
              Your data is a valuable resource, and DataXplorer empowers you to
              make the most of it. Our AI-driven agents are at your disposal,
              ready to generate the most pertinent charts for your specific
              dataset. With just a few clicks, you'll unlock insightful
              visualizations that vividly narrate your data's story, helping you
              uncover trends and patterns.
            </p>
          </div>
        </Grid>
      </Grid>
      <div
        css={`
          height: 151px;
        `}
      />
      <Grid container spacing={9} alignItems="center">
        <Grid item md={6}>
          <div>
            <h4>Interactive Reports </h4>
            <p>
              Transform your data-driven insights into engaging narratives that
              captivate and inform your stakeholders. DataXplorer allows you to
              effortlessly create interactive reports that captivate and inform
              your stakeholders. <br /> <br />
              Incorporate charts, text, images, and videos seamlessly. Your
              ability to convey your findings with impact is now within reach,
              enhancing your ability to drive positive change.
            </p>
          </div>
        </Grid>
        <Grid item md={6}>
          <OpenSourceImg />
        </Grid>
      </Grid>
      <div
        css={`
          height: 125px;
        `}
      />
      <Grid container spacing={9} alignItems="center">
        <Grid item md={6}>
          <ReportsImg
            css={`
              margin-left: -30px;
            `}
          />
        </Grid>
        <Grid item md={6}>
          <div>
            <h4>Join The Data Revolution</h4>
            <p>
              Become a pioneer in the realm of data-driven decision-making.
              Embrace the future with DataXplorer and experience the
              transformative power of streamlined data management. Sign up today
              and take the first step towards making a significant impact in the
              international aid development sector. <br /> <br />
              With DataXplorer, your journey to data-driven excellence begins
              now.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
