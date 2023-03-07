import { Grid } from "@material-ui/core";
import React from "react";
import { ReactComponent as AddNewImage } from "../addNewDataset/asset/add-img.svg";
export default function DatasetAddnewCard() {
  return (
    <Grid item xs={12} sm={6} md={6} lg={3}>
      <div
        css={`
          background: #ffffff;
          width: 296px;
          height: 125px;
          padding: 0rem 0.5rem;
          padding-top: 0.2rem;
          font-family: "Gotham Narrow";
        `}
      >
        <h4>Add new dataset</h4>
        <div
          css={`
            display: flex;
            justify-content: start;
            align-items: center;
          `}
        >
          <AddNewImage />
          <p
            css={`
              border: 1px solid #231d2c;
              width: 49px;
              height: 0px;
              transform: rotate(90deg);
            `}
          />
          <p
            css={`
              color: #495057;
              font-weight: 325;
              font-size: 12px;
              line-height: 15px;
            `}
          >
            Upload your data and start exploring your data now
          </p>
        </div>
      </div>
    </Grid>
  );
}
