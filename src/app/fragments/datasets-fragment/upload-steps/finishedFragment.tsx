import { Box } from "@material-ui/core";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import DatasetTable from "app/modules/dataset-detail-module/component/table/datasetTable";
import DatasetTableOverview from "app/modules/dataset-detail-module/component/table/datasetTableOverview";
import { dataSetsCss } from "app/modules/datasets-module/style";
import React from "react";
import { Link } from "react-router-dom";

export default function FinishedFragment() {
  return (
    <div css={dataSetsCss}>
      <PageTopSpacer />

      <div
        css={`
          color: #231d2c;
          font-family: "Inter";
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          width: 100%;
        `}
      >
        <p
          css={`
            font-weight: 500;
          `}
        >
          Uploaded datasets
        </p>
        <p
          css={`
            margin-top: -8px;
          `}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Box height={30} />

        <DatasetTable />
        <Box height={40} />
        <div
          css={`
            display: flex;
            justify-content: flex-end;
            width: 100%;
          `}
        >
          <Link to="/">
            <button
              css={`
                background: #231d2c;
                width: 100%;
                border-radius: 30px;
                padding: 12px 27px;
                height: 41px;
                font-weight: 500;
                font-size: 14px;
                border: none;
                outline: none;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 248px;
                cursor: pointer;
                color: #fff;

                text-transform: uppercase;
                :hover {
                  opacity: 0.8;
                }
              `}
            >
              Return to main page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
