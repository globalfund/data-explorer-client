import { Grid } from "@material-ui/core";
import React from "react";
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
          font-family: "GothamNarrow-Book", sans-serif;
          font-weight: 325;
          font-size: 20px;
          line-height: 20px;
          color: #231d2c;
        }
      `}
    >
      <h3>
        <b>Key Features</b>
      </h3>
      <Grid container spacing={9} alignItems="center">
        <Grid item md={6}>
          <AIPoweredImg
            css={`
              margin-left: -30px;
            `}
          />
        </Grid>
        <Grid item md={6}>
          <div>
            <h4>AI-Powered</h4>
            <p>
              DataXplorer comes with built-in machine learning functionality to
              power your data communication.
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
            <h4>Search</h4>
            <p>
              Full autocomplete and predictive integrated search tools provide
              meaningful results and get you to your data faster.
            </p>
          </div>
        </Grid>
        <Grid item md={6}>
          <SearchImg />
        </Grid>
      </Grid>
      <div
        css={`
          height: 140px;
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
            <h4>Chart Visualizations</h4>
            <p>
              Wide range of visual models to communicate, experience and explore
              your data with more impact.
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
            <h4>Open Source</h4>
            <p>
              Inspired by and built from a global leading open source data
              platform, DataXplorer is open to the community for contributions.
            </p>
          </div>
        </Grid>
        <Grid item md={6}>
          <OpenSourceImg />
        </Grid>
      </Grid>
      <div
        css={`
          height: 140px;
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
            <h4>Reports</h4>
            <p>
              Build fully customizable reports to find and present insights in
              your data with impact.
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
