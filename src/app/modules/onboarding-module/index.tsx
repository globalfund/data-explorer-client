import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SplitBar from "./component/splibar";
import { useAuth0 } from "@auth0/auth0-react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Route, Switch, useHistory } from "react-router-dom";
import AuthCard from "app/modules/onboarding-module/component/card";
import OnboardingRightDeco from "app/modules/onboarding-module/asset/onboardingRight-img.svg";

export default function Onboarding() {
  const history = useHistory();
  const { isAuthenticated } = useAuth0();
  const mobile = useMediaQuery("(max-width: 768px)");

  if (isAuthenticated) {
    history.replace("/");
  }

  return (
    <Grid
      container
      spacing={6}
      css={`
        margin-top: 0px;
        position: relative;
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
            width: 60%;
            margin: auto;
          `}
        >
          <Box height={50} />
          <h2
            css={`
              color: #6061e5;
              font-size: 24px;
              font-weight: 700;
              font-style: normal;
              font-family: "GothamNarrow-Bold";
            `}
          >
            {history.location.pathname.includes("login")
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
              <AuthCard />
            </Route>
            <Route path="/onboarding/login">
              <AuthCard isLogin />
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
            background-size: cover;
            background-repeat: no-repeat;
            background-image: url(${OnboardingRightDeco});
          `}
        />
      )}
    </Grid>
  );
}
