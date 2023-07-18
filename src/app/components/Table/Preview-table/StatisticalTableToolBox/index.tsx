import React from "react";
import CloseIcon from "@material-ui/icons/Close";

import { statisticalTableToolBoxStyle } from "./style";
import { IconButton } from "@material-ui/core";
import ClockIcon from "app/assets/icons/Clock";

export interface ColumnDetailsProps {
  columnName: string;
  rows: number;
  emptyFields: number;
  uniqueValues: number;
  correlation: {
    name: string;
    rate: number;
  }[];
}
interface Props {
  placeUnderSubHeader: boolean;
  position: number;
  columnName: string;
  rows: number;
  emptyFields: number;
  uniqueValues: number;
  handleClose: () => void;
  correlation: {
    name: string;
    rate: number;
  }[];
}

export default function StatisticalTableToolBox(props: Props) {
  return (
    <div
      css={statisticalTableToolBoxStyle.container(props.placeUnderSubHeader)}
    >
      <div
        css={`
          ${statisticalTableToolBoxStyle.row} padding: 4px 31px;
        `}
      >
        <div>
          <div
            css={`
              ${statisticalTableToolBoxStyle.row} gap: 3px;
            `}
          >
            <p css={statisticalTableToolBoxStyle.clockStyle}>
              <ClockIcon />
            </p>
            <p
              css={`
                color: rgba(0, 0, 0, 0.87);
                font-size: 14px;
              `}
            >
              <b>{props.columnName}</b>
            </p>
          </div>
        </div>
        <div>
          <IconButton onClick={props.handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <div
        css={`
          ${statisticalTableToolBoxStyle.topGrid}
        `}
      >
        <div
          css={`
            border-right: 1px solid #dfe3e6;
          `}
        >
          <p>Rows</p>
          <h4>
            <b>{props.rows}</b>
          </h4>
        </div>
        <div
          css={`
            border-right: 1px solid #dfe3e6;
          `}
        >
          <p>Empty fields</p>
          <h4>{props.emptyFields}</h4>
        </div>

        <div>
          <p>Unique values</p>
          <h4>{props.uniqueValues}</h4>
        </div>
      </div>
      <div
        css={`
          padding: 3% 8%;
          height: 239px;
          border-bottom: 1px solid #dfe3e6;
        `}
      >
        <h4>Distribution</h4>
        {/* <StatisticDisplay
          position={props.position}
          chartOptions={chartOption}
        /> */}
      </div>
      <div
        css={`
          padding: 3% 24px;
        `}
      >
        <h4
          css={`
            margin: 0;
          `}
        >
          Correlations
        </h4>
        {props.correlation.map((item, index) => (
          <div
            key={`${item.name + index}`}
            css={`
              ${statisticalTableToolBoxStyle.row}
              border-bottom: 1px solid #dfe3e6;
              padding-bottom: 7px;
            `}
          >
            <div
              css={`
                width: 70%;
              `}
            >
              <p
                css={`
                  margin: 0;
                  font-size: 12px;
                `}
              >
                {item.name}
              </p>
              <div
                css={`
                  width: 100%;
                  height: 3px;
                  border-radius: 50px;
                `}
              >
                <div
                  css={`
                    background: #d9d9d9;
                    border-radius: 50px;
                    height: 100%;
                    width: ${item.rate}%;
                  `}
                ></div>
              </div>
            </div>
            <div>
              <p
                css={`
                  font-size: 12px;
                  text-align: right;
                  color: #262c34;
                `}
              >
                {item.rate > 0 ? "+" : "-"} {item.rate}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
