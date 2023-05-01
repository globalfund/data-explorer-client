import { Box, Container, Grid } from "@material-ui/core";

import React from "react";

import BigNumber from "../components/bigNumber";
import HeaderBlock from "../components/headerBlock";
import Subheader from "../components/subheader";

export default function ReportsOverview() {
  return (
    <>
      <Subheader previewMode={true} />
      <Box height={18} />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {[...Array(5).keys()].map((name) => (
            <Grid item xs={12} md={6} lg>
              <BigNumber />
            </Grid>
          ))}
        </Grid>
        <Box height={30} />

        <hr
          css={`
            border: 1.26087px solid #e4e4e4;
          `}
        />
        <Box height={55} />

        <Grid
          container
          spacing={10}
          justifyContent="center"
          css={`
            margin-bottom: 1rem;
          `}
        >
          <Grid
            lg={6}
            xl={6}
            md={6}
            sm={12}
            xs={12}
            item
            css={`
              width: 542.81px;
              height: 457.69px;
            `}
          >
            <div
              css={`
                background: #ffffff;
                width: 100%;
                height: 100%;
                padding: 0.4rem 2rem;
              `}
            >
              <h4
                css={`
                  font-size: 17.6522px;
                  color: #231d2c;
                `}
              >
                Global reported natural disasters by type, 1970 to 2019
              </h4>
              <div></div>
            </div>
          </Grid>

          <Grid
            lg={6}
            xl={6}
            md={6}
            sm={12}
            xs={12}
            item
            css={`
              width: 542.81px;
              height: 457.69px;
            `}
          >
            <div
              css={`
                background: #ffffff;
                /* width: 542.81px; */
                /* 
                height: 457.69px; */
                line-height: 18px;
                font-size: 14.5739px;
                padding: 1rem 2rem;
              `}
            >
              <h4>
                Large areas of severe or extreme drought affected every
                continent except North America in 2017. Many coastal countries
                in Africa suffered drought, including the drought driving Cape
                Town water restrictions. An especially severe drought took hold
                in southwestern India.
              </h4>
              <p>
                The graph shows the monthly percentage of global land area,
                excluding ice sheets and deserts, experiencing moderate (beige),
                severe (tan), and extreme (brown) drought conditions since 1950.
                Global-scale drought conditions temporarily improved in early
                2017 compared to recent years. Global drought area reached its
                highest level in several years starting in late 2015 and
                remained high throughout 2016, but rapidly declined by early
                2017. Still, the area affected by drought in 2017
              </p>
              <p>
                {" "}
                was above the 1901–2017 average. Extreme drought conditions
                affected at least 3 percent of the global land area in every
                month of 2017, an extent that had only been observed in just a
                few prior years: 1984, 1985, and 2016. Global area affected by
                moderate and severe drought in 2017 was closer to the long-term
                average.
              </p>
            </div>
          </Grid>
        </Grid>

        <Box height={24} />

        <Grid container>
          <Grid
            lg={12}
            md={12}
            sm={12}
            xl={12}
            xs={12}
            css={`
              width: 1161.26px;
              height: 457.19px;
            `}
          >
            <div
              css={`
                width: 100%;
                height: 100%;
                background: #ffffff;
                padding: 4px 8px;
              `}
            >
              <h4>Climate Shift Index</h4>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
