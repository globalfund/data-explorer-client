import React from "react";
import { ReactComponent as ClockIcon } from "../../../../fragments/datasets-fragment/assets/clock-icon.svg";
import { ReactComponent as CloseIcon } from "../../../../fragments/datasets-fragment/assets/close-icon.svg";

import { statisticalTableToolBoxStyle } from "./style";
import { IconButton } from "@material-ui/core";
import StatisticDisplay from "app/components/Table/Preview-table/statisticDisplay";
import { ChartRepresentationProps } from "app/components/Table/Preview-table/StatisticalRepresentations";
import { barChartdata } from "app/components/Table/Preview-table/data";

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
  const domRef = React.useRef<HTMLDivElement>(null);
  const [renderedChartMappedData, setRenderedChartMappedData] =
    React.useState<{ bars: string; size: string }[]>(barChartdata);

  const [visualOptions, setVisualOptions] = React.useState({
    barWidth: 15.84,
    background: "transparent",
    color: "#000000",
    splitLineY: false,
    width: "219px",
    height: 137,
    marginBottom: 20,
    marginTop: 20,
    showXAxis: true,
    realTimeSort: false,
    xAxisLineColor: "#ADB5BD",
    xAxisLabelColor: "#262C34",
    barRadius: [2, 2, 0, 0],
    focus: "self",
    xAxisLabelInterval: (index: number) => {
      return index === 0 || index === renderedChartMappedData.length - 1;
    },
  });

  // const chartOption: ChartRepresentationProps = {
  //   containerId: "toolbox-chart-render-container",

  //   domRef,
  //   visualOptions,
  //   renderedChartMappedData,
  //   setRenderedChartMappedData,
  // };

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
        {props.correlation.map((item) => (
          <div
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
