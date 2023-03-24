import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as AddNewImage } from "../../assets/add-img.svg";
export default function ReportAddnewCard() {
  const history = useHistory();
  const goToDatasetUpload = () => {
    history.push("/report/create");
  };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        css={`
          background: #ffffff;
          width: 296px;
          height: 125px;
          padding-left: 0.8rem;
          padding-right: 0.8rem;

          padding-top: 0.2rem;
        `}
      >
        <h4
          css={`
            margin-top: 4px;
            margin-bottom: 1px;
          `}
        >
          Create new Report
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
            Create a new Report with charts from the library
          </p>
        </div>
      </div>
    </Grid>
  );
}
