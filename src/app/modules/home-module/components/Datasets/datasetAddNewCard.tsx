import React from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as AddNewImage } from "app/modules/home-module/assets/add-img.svg";

export default function DatasetAddnewCard() {
  const history = useHistory();

  const goToDatasetUpload = () => {
    history.push("/dataset-upload");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        css={`
          background: #ffffff;
          width: 296px;
          height: 125px;
          padding-left: 0.8rem;
          padding-top: 0.2rem;
        `}
      >
        <h4
          css={`
            margin-top: 4px;
            margin-bottom: 1px;
          `}
        >
          Add new data
        </h4>
        <div
          css={`
            display: flex;
            justify-content: start;
            align-items: center;
            /* cursor: pointer; */
            gap: 0.8rem;
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