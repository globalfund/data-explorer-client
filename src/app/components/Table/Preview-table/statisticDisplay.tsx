import { CommonChart } from "app/modules/chart-module/components/common-chart";
import React from "react";
import {
  BarChartRepresentaion,
  ChartRepresentationProps,
  ProgressBar,
  TotalValues,
} from "./StatisticalRepresentations";

interface Props {
  position: number;
  chartOptions: ChartRepresentationProps;
}

export default function StatisticDisplay(props: Props) {
  if (props.position === 1 || props.position === 5) {
    return (
      <div
        css={`
          padding: 0 0.5rem 1.3rem 0.5rem;
          display: flex;
          flex-direction: column;

          justify-content: center;
          align-items: center;
        `}
      >
        <ProgressBar progress="33.7%" label="Value 1" />
        <ProgressBar progress="54.4%" label="Value 2" />
        <ProgressBar progress="19.9%" label="Value 3" />
      </div>
    );
  } else if (props.position === 2 || props.position === 4) {
    return <BarChartRepresentaion {...props.chartOptions} />;
  } else if (props.position === 3) {
    return <TotalValues />;
  } else {
    return <TotalValues />;
  }
}
