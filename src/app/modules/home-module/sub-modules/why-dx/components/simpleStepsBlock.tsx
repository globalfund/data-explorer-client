import { Grid } from "@material-ui/core";
import { ReactComponent as ConnectSVG } from "app/modules/home-module/assets/connect-data.svg";
import { ReactComponent as ConvertSVG } from "app/modules/home-module/assets/convert.svg";
import { ReactComponent as CommunicateSVG } from "app/modules/home-module/assets/communicate.svg";
import React from "react";
import { simpleStepsCss } from "../style";

export default function SimpleStepsBlock() {
  return (
    <div css={simpleStepsCss}>
      <h2>
        <b>3 SIMPLE STEPS TO GET YOU GOING</b>
      </h2>
      <Grid container spacing={10}>
        <Grid item md={4}>
          <ConnectSVG />
          <div>
            <p>STEP 1</p>
            <p>
              <b>CoNNECT</b>
            </p>
            <p>
              <b>DATA</b>
            </p>
          </div>
        </Grid>
        <Grid item md={4}>
          <ConvertSVG />
          <div>
            <p>STEP 2</p>
            <p>
              <b>CoNVERT</b>
            </p>
            <p>
              <b>TO INFORMATION</b>{" "}
            </p>
          </div>
        </Grid>
        <Grid item md={4}>
          <CommunicateSVG />
          <div>
            <p>STEP 3</p>
            <p>
              <b>CoMMUNICATE</b>
            </p>
            <p>
              <b>YOUR REPORTS</b>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
