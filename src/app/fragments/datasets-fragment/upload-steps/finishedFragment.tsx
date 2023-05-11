import React from "react";
import find from "lodash/find";
import { Link } from "react-router-dom";
import { dataSetsCss } from "app/modules/datasets-module/style";
import { PageTopSpacer } from "app/modules/common/page-top-spacer";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { DatasetDataTable } from "app/fragments/datasets-fragment/component/data-table";

interface Props {
  data: any[];
  stats: any[];
  datasetId: string;
}

export default function FinishedFragment(props: Props) {
  const datasets = useStoreState(
    (state) => state.dataThemes.DatasetGetList.crudData as any[]
  );
  const setDataset = useStoreActions(
    (actions) => actions.charts.dataset.setValue
  );

  const description = find(
    datasets,
    (d: any) => d.id === props.datasetId
  )?.description;

  function handleCreateNewChart() {
    setDataset(props.datasetId);
  }

  return (
    <div css={dataSetsCss}>
      <PageTopSpacer />
      <div
        css={`
          width: 100%;
          color: #231d2c;
          font-size: 14px;
          font-weight: 500;
          font-style: normal;
          font-family: "GothamNarrow-Book";
        `}
      >
        <div
          css={`
            color: #231d2c;
            font-size: 14px;
            line-height: 19px;
            margin-bottom: 17px;
          `}
        >
          {description}
        </div>
        <div
          css={`
            width: 100%;
            display: flex;
            margin-bottom: 12px;
            justify-content: flex-end;
          `}
        >
          <Link to="/chart/new/data">
            <button
              css={`
                color: #fff;
                width: 100%;
                width: 200px;
                height: 41px;
                font-size: 14px;
                font-weight: 700;
                padding: 12px 27px;
                background: #231d2c;
                border-radius: 30px;
                text-transform: uppercase;
                font-family: "GothamNarrow-Bold";
                outline: none;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                :hover {
                  opacity: 0.8;
                }
              `}
              onClick={handleCreateNewChart}
            >
              create new chart
            </button>
          </Link>
        </div>
        <DatasetDataTable data={props.data} stats={props.stats} />
      </div>
    </div>
  );
}
