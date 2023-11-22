import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { socialAuth } from "app/utils/socialAuth";
import { ReactComponent as RightArr } from "app/modules/home-module/assets/right-arr-icon.svg";
import { ReactComponent as GoogleIcon } from "app/modules/onboarding-module/asset/google-img.svg";
import { ReactComponent as LinkedInIcon } from "app/modules/onboarding-module/asset/linkedIn-img.svg";

export default function TryUsBlock() {
  const { isAuthenticated } = useAuth0();

  return (
    <>
      <p
        css={`
          text-align: center;
          font-family: "Gotham Narrow", sans-serif;
          font-size: 48px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          margin-bottom: 34px;
          margin-top: 0;
          color: #231d2c;
        `}
      >
        Best decisions are based on data
      </p>
      <div
        css={`
          background: #231d2c;
          box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
          border-radius: 24px;
          display: flex;
          justify-content: space-between;
          padding: 58px 111px 45px 61px;
          align-items: center;
          height: 215px;
          width: 100%;
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
            <b>Try DataXplorer for free </b>
          </p>{" "}
          <p
            css={`
              font-weight: 325;
              font-size: 24px;
              color: #f4f4f4;
              font-family: "Gotham Narrow Light", sans-serif;
            `}
          >
            DataXplorer turns data into impact 
          </p>
        </div>
        {isAuthenticated && (
          <div
            css={`
              display: flex;
              flex-direction: column;
              gap: 42px;
              align-items: center;
              button,
              a {
                outline: none;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 14px;
                font-family: "Inter", sans-serif;
                border-radius: 30px;
                text-transform: uppercase;
                cursor: pointer;
                :hover {
                  opacity: 0.9;
                }
              }
              button:nth-child(1),
              a:nth-child(1) {
                background: #e492bd;
                border-radius: 30px;
                width: 198.53px;
                height: 41px;
                padding: 12px 27px;
                gap: 10px;
                color: #ffffff;
                text-decoration: none;
                svg {
                  path {
                    fill: #ffffff;
                  }
                }
              }
              button:nth-child(2),
              a:nth-child(2) {
                background: #ffffff;
                color: #231d2c;
                text-decoration: none;
                width: 206.53px;
                height: 41px;
                padding: 12px 27px;
                gap: 10px;
              }
            `}
          >
            <Link to="/report/new/initial">
              <p>CREATE REPORT</p> <RightArr />
            </Link>
            <Link to="/contact">
              <p>Contact sales</p> <RightArr />
            </Link>
          </div>
        )}
        {!isAuthenticated && (
          <div
            css={`
              display: flex;
              flex-direction: column;
              gap: 42px;
              align-items: center;
              button,
              a {
                padding: 9px 18px;
                height: 41px;
                border-radius: 30px;
                outline: none;
                border: none;
                color: #231d2c;
                font-family: "Inter", sans-serif;
                font-weight: 700;
                font-size: 14px;
                text-transform: uppercase;
                text-decoration: none;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;

                > svg {
                  transform: scale(0.8);
                }
                :hover {
                  opacity: 0.8;
                  cursor: pointer;
                }
              }
            `}
          >
            <button onClick={() => socialAuth("google-oauth2")}>
              <GoogleIcon /> sign in for free
            </button>
            <button onClick={() => socialAuth("linkedin")}>
              <LinkedInIcon /> sign in for free
            </button>
          </div>
        )}
      </div>
    </>
  );
}
