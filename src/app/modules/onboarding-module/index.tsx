import React from "react";
import { Link, Route, Switch, useLocation } from "react-router-dom";
import OnboardingRightDeco from "./asset/onboardingRight-img.svg";
import { Box, Container, Grid, Hidden, useMediaQuery } from "@material-ui/core";
import SplitBar from "./component/splibar";
import LoginCard from "./component/loginCard";

import { ReactComponent as Logo } from "../home-module/assets/logo.svg";
import SignupCard from "./component/signupCard";
export default function Onboarding() {
  const mobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();
  return (
    <Grid
      container
      spacing={6}
      css={`
        position: relative;
        margin-top: 0px;

        overflow-y: hidden;
      `}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={5}
        css={`
          @media (max-width: 1024px) {
            padding-bottom: 7rem;
          }
        `}
      >
        <div
          css={`
            margin-top: 2rem;
            margin-left: -2rem;
          `}
        >
          <Link to="/">
            <Logo width={304.62} height={32} />
          </Link>
        </div>

        <div
          css={`
            width: 60%;
            margin: auto;
          `}
        >
          <Box height={50} />
          <h2
            css={`
              color: #6061e5;
              font-family: "GothamNarrow-Bold";
              font-style: normal;
              font-weight: 700;
              font-size: 24px;
            `}
          >
            {location.pathname.includes("login")
              ? "Welcome back!"
              : "Create your free account."}
          </h2>
          <Box height={10} />

          <div
            css={`
              width: 100%;
            `}
          >
            <SplitBar leftLabel="Log In" rightLabel="Sign Up" />
          </div>

          <Switch>
            <Route path="/onboarding/signup">
              <SignupCard />
            </Route>
            <Route path="/onboarding/login">
              <LoginCard />
            </Route>
          </Switch>
        </div>
      </Grid>
      {!mobile && (
        <Grid
          item
          xs={false}
          sm={false}
          md={4}
          lg={7}
          css={`
            right: 0;

            height: 100vh;
            background-image: url(${OnboardingRightDeco});
            background-repeat: no-repeat;
            background-size: cover;
          `}
        ></Grid>
      )}
    </Grid>
  );
}
