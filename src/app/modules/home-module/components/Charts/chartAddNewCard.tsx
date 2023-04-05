import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as AddNewImage } from "app/modules/home-module/assets/add-img.svg";

export default function ChartAddnewCard() {
  const history = useHistory();

  const goToDatasetUpload = () => {
    history.push("/chart/new/data");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        css={`
          width: 296px;
          height: 125px;
          background: #fff;
          padding-left: 0.8rem;
        `}
        onClick={goToDatasetUpload}
      >
        <h4
          css={`
            margin: 0;
            padding-top: 6px;
          `}
        >
          Create new chart
        </h4>
        <div
          css={`
            gap: 0.7rem;
            display: flex;
            cursor: pointer;
            align-items: center;
            justify-content: start;
          `}
        >
          <IconButton
            onClick={goToDatasetUpload}
            css={`
              padding: 2px;
            `}
          >
            <AddNewImage />
          </IconButton>
          <p
            css={`
              width: 0px;
              height: 49px;
              border: 1px solid #231d2c;
            `}
          />
          <p
            css={`
              color: #495057;
              font-size: 12px;
              line-height: 15px;
            `}
          >
            Create a new chart in your library
          </p>
        </div>
      </div>
    </Grid>
  );
}
