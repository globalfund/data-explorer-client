import React from "react";
import Grid from "@material-ui/core/Grid";
import { HomePrimaryButton } from "app/components/Styled/button";
import { ReactComponent as SmallEllipse } from "app/modules/home-module/assets/cases-sm-ellipse.svg";
import { ReactComponent as TopRightEllipse } from "app/modules/home-module/assets/top-right-ellipse.svg";
import { ReactComponent as BottomLeftEllipse } from "app/modules/home-module/assets/bottom-left-ellipse.svg";
import { ReactComponent as BottomRightEllipse } from "app/modules/home-module/assets/bottom-right-ellipse.svg";
import {
  empowercss,
  SmallEllipseCss,
  TopRightEllipseCss,
  BottomLeftEllipseCss,
  BottomRightEllipseCss,
} from "app/modules/home-module/sub-modules/cases/style";

export default function EmpowerBlock() {
  return (
    <Grid container css={empowercss}>
      <h1>
        DataXplorer turns data into impact
        <br />
        within just a few minutes
      </h1>
      <p>
        <b>
          DataXplorer is an AI-powered purpose-driven data exploration solution
          built with the
          <br />
          goal of making the visual representation of data easy and powerful for
          everyone.
        </b>
      </p>
      <div>
        <HomePrimaryButton color="#6061E5" type="button">
          CREATE REPORT
        </HomePrimaryButton>
        <HomePrimaryButton color="#E492BD" type="button">
          EXPLORE REPORTS
        </HomePrimaryButton>
      </div>
      <TopRightEllipse css={TopRightEllipseCss} />
      <SmallEllipse css={SmallEllipseCss} />
      <BottomRightEllipse css={BottomRightEllipseCss} />
      <BottomLeftEllipse css={BottomLeftEllipseCss} />
    </Grid>
  );
}
