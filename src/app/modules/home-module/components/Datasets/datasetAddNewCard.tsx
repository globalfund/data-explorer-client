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
        onClick={action}
        css={`
          width: 296px;
          height: 161.59px;
          background: #f2f7fd;
          padding: 12px 16px;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          cursor: pointer;
        `}
      >
        <div
          css={`
            gap: 14px;
            display: flex;
            align-items: center;
            justify-content: start;
          `}
        >
          <IconButton
            css={`
              padding: 2px;
            `}
          >
            <AddNewImage />
          </IconButton>
          <hr
            css={`
              margin: 0;
              height: 49px;
              background: #231d2c;
            `}
          />
          <p>
            <p
              css={`
                margin: auto;
              `}
            >
              <b>New Data</b>{" "}
            </p>
            <p
              css={`
                margin: 0;
                color: #495057;
                font-size: 12px;
                font-weight: 325;
                line-height: 15px;
              `}
            >
              Upload data in your library
            </p>
          </p>
        </div>
      </div>
    </Grid>
  );
}
