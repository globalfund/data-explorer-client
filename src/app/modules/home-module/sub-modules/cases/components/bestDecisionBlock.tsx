import { Grid } from "@material-ui/core";
import React from "react";
import RightArr from "app/modules/home-module/assets/right-arr-icon.svg";
import { bestDecisioncss } from "app/modules/home-module/sub-modules/cases/style";
export default function BestDecisionBlock() {
  return (
    <Grid css={bestDecisioncss}>
      <h4>Best decisions are based on data</h4>

      <div
        css={`
          background: #333333;
          box-shadow: 0px 4px 30px 4px rgba(206, 168, 188, 0.08);
          border-radius: 24px;
          display: flex;
          justify-content: space-between;
          padding: 44px;
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
            <b>LET US HELP YOU </b>
          </p>{" "}
          <p
            css={`
              font-weight: 325;
              font-size: 24px;
              color: #f4f4f4;
              font-family: "Gotham Narrow Light", sans-serif;
            `}
          >
            Unlock your potential through the power of DataXplorer.
          </p>
        </div>
        <button>
          <p>request a demo</p> <img src={RightArr} alt="right-arrow-icon" />
        </button>
      </div>
    </Grid>
  );
}
