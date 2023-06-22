import { Grid } from "@material-ui/core";
import React from "react";

export default function SimpleStepsBlock() {
  return (
    <div
      css={`
        position: relative;
        z-index: 2;
        background-color: #231d2c;
        box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
        border-radius: 24px;
        padding: 22px 44px 30px 60px;
      `}
    >
      <p
        css={`
          color: #ffffff;
          font-weight: 400;
          font-size: 24px;
          line-height: 24px;
          font-family: "Gotham Narrow";
          text-align: center;
        `}
      >
        <b>3 SIMPLE STEPS TO GET YOU GOING</b>
      </p>
      <Grid container spacing={9}>
        <Grid item md={4}>
          <div
            css={`
              background: #ffffff;
              border-radius: 33px;
              height: 151px;
              text-align: center;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              p {
                font-family: "Gotham Narrow", sans-serif;
              }
              p:nth-child(1) {
                font-size: 18px;
                margin-bottom: 7px;
                margin-top: -20px;
              }
              p:nth-child(2) {
                font-size: 36px;
                line-height: 20px;
                margin-top: 13px;
                margin-bottom: 17px;
              }
              p:nth-child(3) {
                font-size: 24px;
                line-height: 20px;
                margin-top: 5px;
                margin-bottom: -6px;
              }
            `}
          >
            <p>STEP 1</p>
            <p>
              <b>CONNECT</b>
            </p>
            <p>
              <b>YOUR DATA</b>
            </p>
          </div>
        </Grid>
        <Grid item md={4}>
          <div
            css={`
              background: #ffffff;
              border-radius: 33px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              p {
                font-family: "Gotham Narrow", sans-serif;
                margin: 0;
              }
              p:nth-child(1) {
                font-size: 18px;
                margin-bottom: 7px;
                margin-top: -20px;
              }
              p:nth-child(2) {
                font-size: 36px;
                line-height: 20px;
                margin-top: 13px;
                margin-bottom: 17px;
              }
              p:nth-child(3) {
                font-size: 24px;
                line-height: 20px;
                margin-top: 5px;
                margin-bottom: -6px;
              }
              height: 151px;
            `}
          >
            <p>STEP 2</p>
            <p>
              <b>CONVERT</b>
            </p>
            <p>
              <b>TO INFORMATION</b>
            </p>
          </div>
        </Grid>
        <Grid item md={4}>
          <div
            css={`
              background: #ffffff;
              border-radius: 33px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;

              p {
                font-family: "Gotham Narrow", sans-serif;
              }
              p:nth-child(1) {
                font-size: 18px;
                margin-bottom: 7px;
                margin-top: -20px;
              }
              p:nth-child(2) {
                font-size: 36px;
                line-height: 20px;
                margin-top: 13px;
                margin-bottom: 17px;
              }
              p:nth-child(3) {
                font-size: 24px;
                line-height: 20px;
                margin-top: 5px;
                margin-bottom: -6px;
              }
              height: 151px;
            `}
          >
            <p>STEP 3</p>
            <p>
              <b>COMMUNICATE</b>
            </p>
            <p>
              <b>YOUR REPORTS</b>
            </p>
          </div>
        </Grid>
      </Grid>
      <button
        type="button"
        css={`
          background: #e492bd;
          border-radius: 30px;
          outline: none;
          border: none;
          padding: 12px 27px;
          color: #ffffff;
          font-weight: 700;
          font-size: 14px;
          font-family: "Inter", sans-serif;
          display: flex;
          justify-content: center;
          width: 493px;
          height: 41px;
          margin: auto;
          margin-top: 29px;
        `}
      >
        TRY IT NOW
      </button>
    </div>
  );
}
