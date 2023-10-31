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

export default function EmpowerBlock(props: { view?: "why-dx" }) {
  let mainText = "";
  let subText = "";

  switch (props.view) {
    case "why-dx":
      mainText = "Turn Data into Impact in Minutes \n \n with DataXplorer";
      subText =
        "DataXplorer simplifies and empowers visual data reporting for all.";
      break;
    default:
      mainText = "Empower people with meaningful data";
      subText = "AI-powered solution to communicate your data with more impact";
      break;
  }

  return (
    <Grid container css={empowercss}>
      <h1>{mainText}</h1>
      <p>
        <b>{subText}</b>
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
