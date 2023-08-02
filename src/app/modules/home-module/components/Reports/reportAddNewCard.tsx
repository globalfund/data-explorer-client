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
              <b>New Report</b>{" "}
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
              Create a new report in your library
            </p>
          </p>
        </div>
      </div>
    </Grid>
  );
}
