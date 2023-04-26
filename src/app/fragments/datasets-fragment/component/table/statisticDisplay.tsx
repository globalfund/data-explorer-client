import { CommonChart } from "app/modules/chart-module/components/common-chart";
import React from "react";
import {
  BarChartRepresentaion,
  ProgressBar,
} from "./StatisticalRepresentations";

export default function StatisticDisplay(props: { position: number }) {
  // console.log(props.position);
  if (props.position === 1) {
    return (
      <div
        css={`
          padding: 0 0.5rem 1.3rem 0.5rem;
        `}
      >
        <ProgressBar progress="33.7%" label="Value 1" />
        <ProgressBar progress="54.4%" label="Value 2" />
        <ProgressBar progress="19.9%" label="Value 2" />
      </div>
    );
  } else if (props.position === 2) {
    return <BarChartRepresentaion />;
  } else {
    return <></>;
  }
}
