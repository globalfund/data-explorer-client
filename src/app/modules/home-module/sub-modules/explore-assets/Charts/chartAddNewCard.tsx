import React from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { ReactComponent as AddNewImage } from "app/modules/home-module/assets/add-img.svg";

export default function ChartAddnewCard() {
  const history = useHistory();

  const action = () => {
    history.push("/chart/new/data");
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        onClick={action}
        css={`
          width: 296px;
          height: 161.59px;

          background: #f2f7fd;
          box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.1);
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: start;
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
              height: 50px;
              background: #231d2c;
            `}
          />
          <div
            css={`
              h4 {
                font-family: "Gotham Narrow", sans-serif;
                font-size: 18px;
                margin: 0;
              }
            `}
          >
            <h4>
              {" "}
              <b>New Chart</b>
            </h4>
            <p
              css={`
                margin: 0;
                color: #495057;
                font-size: 12px;
                font-weight: 325;
                line-height: 15px;
              `}
            >
              Create a new chart in your library
            </p>
          </div>
        </div>
      </div>
    </Grid>
  );
}
