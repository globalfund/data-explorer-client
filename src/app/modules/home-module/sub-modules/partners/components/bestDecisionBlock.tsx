import { Grid } from "@material-ui/core";
import React from "react";
import RightArr from "app/modules/home-module/assets/right-arr-icon.svg";
import { bestDecisioncss } from "app/modules/home-module/sub-modules/partners/style";
import { ReactComponent as GoogleIcon } from "app/modules/onboarding-module/asset/google-img.svg";
import { ReactComponent as LinkedInIcon } from "app/modules/onboarding-module/asset/linkedIn-img.svg";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
export default function BestDecisionBlock() {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const handleLogin = () => {
    loginWithRedirect();
  };
  return (
    <Grid css={bestDecisioncss}>
      <h4>Best decisions are based on data</h4>

      <div
        css={`
          background: #231d2c;
          box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
          border-radius: 24px;
          display: flex;
          justify-content: space-between;
          padding: 30px;
          padding-top: 30px;
          padding-left: 52px;
          align-items: center;
          height: 231px;
          width: 100%;
          a {
            text-decoration: none;
          }
        `}
      >
        <div>
          <p
            css={`
              color: #ffffff;
              font-size: 40px;
              line-height: 48px;
              font-family: "Gotham Narrow Bold", sans-serif;
              margin: 0;
            `}
          >
            <b>Give DataXplorer a try, on us </b>
          </p>{" "}
          <p
            css={`
              font-weight: 325;
              font-size: 24px;
              color: #f4f4f4;
              font-family: "Gotham Narrow Light", sans-serif;
            `}
          >
            DataXplorer turns data into impact in minutes 
          </p>
        </div>
        <div
          css={`
            width: 35%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            button {
              margin-bottom: 20px;
            }
            margin-top: 20px;
          `}
        >
          {!isAuthenticated && (
            <div id="auth-buttons">
              <button onClick={handleLogin}>
                <GoogleIcon /> sign in for free
              </button>
              <button onClick={handleLogin}>
                <LinkedInIcon /> sign in for free
              </button>
            </div>
          )}
          <Link to="/contact">
            <button>
              <p>Contact us</p>
            </button>
          </Link>
        </div>
      </div>
    </Grid>
  );
}
