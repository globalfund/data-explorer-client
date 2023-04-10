import { Box } from "@material-ui/core";
import { useChartsRawData } from "app/hooks/useChartsRawData";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import DatasetTable from "app/modules/dataset-detail-module/component/table/datasetTable";
import DatasetTableOverview from "app/modules/dataset-detail-module/component/table/datasetTableOverview";
import { dataSetsCss } from "app/modules/datasets-module/style";
import React from "react";
import { Link } from "react-router-dom";
import { DatasetDataTable } from "../component/data-table";

interface Props {
  datasetId: string;
}
export default function FinishedFragment(props: Props) {
  const { loadDataset, sampleData } = useChartsRawData({
    visualOptions: () => {},
    setVisualOptions: () => {},
    setChartFromAPI: () => {},
    chartFromAPI: null,
  });

  React.useEffect(() => {
    loadDataset(`data-themes/sample-data/${props.datasetId}`);
  }, [props.datasetId]);

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
        <h1
          css={`
            color: #231d2c;
            font-weight: 500;
            font-size: 48px;
            margin-top: 13px;
          `}
        >
          Finished
        </h1>

        <Box height={22} />

        <DatasetDataTable data={sampleData} />

        <div
          css={`
            display: flex;
            justify-content: flex-end;
            width: 100%;
            margin-top: 0;
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
