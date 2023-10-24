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
} from "app/modules/home-module/sub-modules/partners/style";
import { Link } from "react-router-dom";

export default function EmpowerBlock(props: { alternativeText?: boolean }) {
  return (
    <Grid container css={empowercss}>
      <h1>
        {props.alternativeText ? (
          <>
            DataXplorer turns data into impact
            <br />
            within just a few minutes
          </>
        ) : (
          "Empower people with meaningful data"
        )}
      </h1>
      <p>
        <b>
          {props.alternativeText ? (
            <>
              DataXplorer is an AI-powered purpose-driven data exploration
              solution built with the
              <br />
              goal of making the visual representation of data easy and powerful
              for everyone.
            </>
          ) : (
            "AI-powered solution to communicate your data with more impact"
          )}
        </b>
      </p>
      <div>
        <Link to="/report/new/initial">
          <HomePrimaryButton color="#6061E5" type="button">
            CREATE REPORT
          </HomePrimaryButton>
        </Link>
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
