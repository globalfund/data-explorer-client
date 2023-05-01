import { Grid, IconButton, Box } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as AddNewImage } from "../home-module/assets/add-img.svg";

export default function ChartAddnewCard() {
  const history = useHistory();
  const goToDatasetUpload = () => {
    history.push("/chart/new/data");
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        css={`
          background: #ffffff;
          width: 296px;
          height: 125px;
          padding-left: 0.8rem;
        `}
      >
        <Box height={9} />

        <h4
          css={`
            margin: 0;
          `}
        >
          Create new chart
        </h4>
        <Box height={9} />

        <div
          css={`
            display: flex;
            justify-content: start;
            align-items: center;
            cursor: pointer;
            gap: 0.7rem;
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
              border: 1px solid #231d2c;
              height: 49px;
              width: 0px;
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
            Create a new chart in your library
          </p>
        </div>
      </div>
    </Grid>
  );
}
