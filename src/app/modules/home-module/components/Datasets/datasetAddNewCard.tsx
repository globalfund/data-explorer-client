import React from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as AddNewImage } from "app/modules/home-module/assets/add-img.svg";

export default function DatasetAddnewCard() {
  const history = useHistory();

  const action = () => {
    history.push("/dataset-upload");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        css={`
          width: 296px;
          height: 125px;
          background: #fff;
          padding: 12px 16px;
        `}
      >
        <h4
          css={`
            font-weight: 700;
            margin: 0 0 10px 0;
            font-family: "GothamNarrow-Bold";
          `}
        >
          Add new data
        </h4>
        <div
          css={`
            gap: 14px;
            display: flex;
            align-items: center;
            justify-content: start;
          `}
        >
          <IconButton
            onClick={action}
            css={`
              padding: 2px;
            `}
          >
            <AddNewImage />
          </IconButton>
          <hr
            css={`
              margin: 0;
              height: 50px;
              background: #231d2c;
            `}
          />
          <p
            css={`
              margin: 0;
              color: #495057;
              font-size: 12px;
              font-weight: 325;
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
