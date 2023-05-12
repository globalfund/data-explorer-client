import React from "react";
import { useHistory } from "react-router-dom";
import { Grid, IconButton } from "@material-ui/core";
import { ReactComponent as AddNewImage } from "../../assets/add-img.svg";

export default function ReportAddnewCard() {
  const history = useHistory();

  const action = () => {
    history.push("/report/new/initial");
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
          Create new Report
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
            Create a new Report with charts from the library
          </p>
        </div>
      </div>
    </Grid>
  );
}
