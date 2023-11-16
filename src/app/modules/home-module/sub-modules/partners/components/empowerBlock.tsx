import React from "react";
import Grid from "@material-ui/core/Grid";
import { HomePrimaryButton } from "app/components/Styled/button";
import { ReactComponent as SmallEllipse } from "app/modules/home-module/assets/cases-sm-ellipse.svg";
import { ReactComponent as TopRightEllipse } from "app/modules/home-module/assets/top-right-ellipse.svg";
import { ReactComponent as BottomLeftEllipse } from "app/modules/home-module/assets/bottom-left-ellipse.svg";
import { ReactComponent as BottomRightEllipse } from "app/modules/home-module/assets/bottom-right-ellipse.svg";
import { ReactComponent as GoogleIcon } from "app/modules/onboarding-module/asset/google-img.svg";
import { ReactComponent as LinkedInIcon } from "app/modules/onboarding-module/asset/linkedIn-img.svg";
import {
  empowercss,
  SmallEllipseCss,
  TopRightEllipseCss,
  BottomLeftEllipseCss,
  BottomRightEllipseCss,
} from "app/modules/home-module/sub-modules/partners/style";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function EmpowerBlock(props: {
  view?: "why-dx" | "contact" | "about" | "partners";
}) {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const handleLogin = () => {
    loginWithRedirect();
  };

  let mainText = "";
  let subText = "";

  switch (props.view) {
    case "why-dx":
      mainText = `Turn Data into Impact in Minutes with\nDataXplorer`;
      subText =
        "DataXplorer simplifies and empowers visual data reporting for all.";
      break;
    case "contact":
      mainText = "Discover the True Potential of Data";
      subText =
        "DataXplorer simplifies and empowers visual data reporting for all.";
      break;
    case "about":
      mainText = `DataXplorer Equips You with\nInsightful Data`;
      subText =
        "DataXplorer simplifies and empowers visual data reporting for all.";
      break;
    case "partners":
      mainText = `Global Health and International Development\nOrganizations are using DataXplorer`;
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
      {isAuthenticated && (
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
      )}
      {!isAuthenticated && (
        <div
          id="auth-buttons"
          css={`
            gap: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;

            > button {
              gap: 10px;
              color: #fff;
              display: flex;
              padding: 9px 18px;
              background: #a1a2ff;
              align-items: center;
              justify-content: center;
              text-transform: uppercase;

              > svg {
                transform: scale(0.8);
              }
            }
          `}
        >
          <button onClick={handleLogin}>
            <GoogleIcon /> sign in for free
          </button>
          <button onClick={handleLogin}>
            <LinkedInIcon /> sign in for free
          </button>
        </div>
      )}
      <TopRightEllipse css={TopRightEllipseCss} />
      <SmallEllipse css={SmallEllipseCss} />
      <BottomRightEllipse css={BottomRightEllipseCss} />
      <BottomLeftEllipse css={BottomLeftEllipseCss} />
    </Grid>
  );
}
