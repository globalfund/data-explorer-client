import { Grid } from "@material-ui/core";
import { HomePrimaryButton } from "app/components/Styled/button";
import {
  BottomLeftEllipseCss,
  BottomRightEllipseCss,
  SmallEllipseCss,
  TopRightEllipseCss,
  empowercss,
} from "app/modules/home-module/sub-modules/cases/style";
import React from "react";
import { ReactComponent as TopRightEllipse } from "app/modules/home-module/assets/top-right-ellipse.svg";
import { ReactComponent as BottomRightEllipse } from "app/modules/home-module/assets/bottom-right-ellipse.svg";
import { ReactComponent as BottomLeftEllipse } from "app/modules/home-module/assets/bottom-left-ellipse.svg";
import { ReactComponent as SmallEllipse } from "app/modules/home-module/assets/cases-sm-ellipse.svg";

export default function EmpowerBlock() {
  return (
    <Grid container css={empowercss}>
      <h1>Empower people with meaningful data</h1>

      <p>
        <b>AI-powered solution to communicate your data with more impact</b>
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
